import { useEffect, useRef } from 'react'

/**
 * 全局粒子动效背景——Canvas 渲染，仅添加动效层，不改变网站背景色。
 * 纯颗粒/星尘风格，无连线，粒子随页面滚动而移动。
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const canvas: HTMLCanvasElement = canvasEl
    const ctxRaw = canvasEl.getContext('2d')
    if (!ctxRaw) return
    const ctx: CanvasRenderingContext2D = ctxRaw

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    // ---- 粒子配置 ----
    const BASE_COUNT = 260 // 视口高度基准粒子数（增加密度）
    const COLORS = [
      'rgba(84, 87, 230, 0.80)',   // iris 蓝紫
      'rgba(120, 130, 245, 0.72)', // 亮蓝紫
      'rgba(160, 150, 240, 0.68)', // 淡紫
      'rgba(100, 120, 220, 0.65)', // 深蓝紫
      'rgba(200, 190, 255, 0.75)', // 浅薰衣草
      'rgba(70, 90, 210, 0.60)',   // 深蓝
    ]

    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      glow: boolean
      phase: number
      phaseSpeed: number
    }

    let particles: Particle[] = []
    let particleCount = BASE_COUNT

    function createParticle(): Particle {
      const r = Math.random()
      let radius: number
      let glow = false
      if (r < 0.50) {
        // 微小粒子——星尘基底
        radius = Math.random() * 1.2 + 0.6
      } else if (r < 0.78) {
        // 小粒子
        radius = Math.random() * 1.6 + 1.2
      } else if (r < 0.93) {
        // 中粒子（带轻微光晕）
        radius = Math.random() * 2.2 + 1.8
        glow = true
      } else {
        // 大粒子（明显光晕，视觉焦点）
        radius = Math.random() * 3.5 + 3
        glow = true
      }
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        glow,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.008 + Math.random() * 0.025,
      }
    }

    function initParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle())
      }
    }

    function resize() {
      width = window.innerWidth
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight
      )
      height = docHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const vh = window.innerHeight
      const ratio = Math.max(1, height / vh)
      particleCount = Math.round(BASE_COUNT * ratio)
      initParticles()
    }

    // ---- 鼠标交互（需考虑滚动偏移） ----
    let mouseX = -9999
    let mouseY = -9999
    const MOUSE_RADIUS = 140

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY + window.scrollY
    }
    function onMouseLeave() {
      mouseX = -9999
      mouseY = -9999
    }

    // ---- 动画循环 ----
    let animId = 0

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // 视口裁剪范围
      const viewTop = window.scrollY - 50
      const viewBottom = window.scrollY + window.innerHeight + 50

      // 更新粒子位置
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.phase += p.phaseSpeed

        // 边界循环
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // 鼠标排斥力
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.7
          p.x += (dx / dist) * force
          p.y += (dy / dist) * force
        }
      }

      // 绘制粒子（纯颗粒，无连线）
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (p.y < viewTop || p.y > viewBottom) continue

        const flicker = 0.78 + Math.sin(p.phase) * 0.22
        const r = p.radius * flicker

        if (p.glow) {
          // 带光晕的粒子——柔边圆斑
          const glowR = r * 4.5
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
          gradient.addColorStop(0, p.color)
          gradient.addColorStop(0.3, p.color.replace(/[\d.]+\)$/, '0.22)'))
          gradient.addColorStop(1, 'rgba(84, 87, 230, 0)')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
          ctx.fill()
        }

        // 粒子核心——硬边圆点，保证颗粒感
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const resizeTimer = setTimeout(resize, 500)
    const resizeTimer2 = setTimeout(resize, 1500)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseout', onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(resizeTimer)
      clearTimeout(resizeTimer2)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-bg"
      aria-hidden="true"
    />
  )
}
