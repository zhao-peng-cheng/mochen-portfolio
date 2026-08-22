import { useEffect, useMemo, useState } from 'react'

/**
 * 上升的肥皂泡 —— 参考真实肥皂泡表面做成「五彩斑斓的薄边 + 强高光 + 慢速转动」效果。
 *
 * 视觉构成：
 *   - conic-gradient 4 条鲜明彩色带（紫 / 粉 / 黄 / 青），分布在最外 22% 边缘
 *   - mask-image 把中心 62% 区域挖透明 → 虹彩只在外缘显出，且形成两条彩色环带
 *   - 内部 radial-gradient 给一颗强烈的高光（左上 28%/22%）+ 右下反射弧
 *   - 极慢的 conic 旋转动画（22-40s/圈），虹彩随时间流转 → 参考图里虹彩"动"的感觉
 *   - 当 [data-bubble] 的 section 进入视口显示，离开淡出
 *
 * z-index 0，pointer-events: none，不挡交互。
 */

// 4 组「真实肥皂泡」色调组合（更鲜明、更接近参考图）
const BUBBLE_PRESETS = [
  // A：粉/紫为主，黄/青点缀
  { rim: ['#ffb0e0', '#e09cff', '#8ed4ff', '#bdf3ff', '#ffea8b', '#ff9ec7'], glow: 'rgba(225,170,255,0.35)' },
  // B：黄/青为主，粉/紫转场
  { rim: ['#fff0a0', '#c8f5ff', '#a0d8ff', '#d4a8ff', '#ffb0d0', '#ffe48b'], glow: 'rgba(255,225,150,0.32)' },
  // C：青/紫为主，粉/黄点亮
  { rim: ['#a0f0ff', '#9ed4ff', '#c8b0ff', '#ffb0e0', '#ffd86b', '#a3e8ff'], glow: 'rgba(180,225,255,0.35)' },
]

type Bubble = {
  i: number
  size: number
  left: number
  riseDur: number
  spinDur: number
  delay: number
  drift: number
  rim: string[]
  glow: string
  opacity: number
  hueOffset: number
}

export default function RisingBubbles() {
  const [active, setActive] = useState(false)

  const bubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: 10 }, (_, i) => {
      // 更大尺寸：参考图就是大水珠，不是小气泡
      const size = 60 + Math.random() * 120 // 60 – 180 px
      const left = Math.random() * 100
      const riseDur = 18 + Math.random() * 16 // 18 – 34 s 缓缓上升
      const spinDur = 28 + Math.random() * 20 // 28 – 48 s 缓慢转动
      const delay = -Math.random() * riseDur // 错峰，让任意时刻都有泡泡
      const drift = (Math.random() * 110) - 55 // 左右轻微漂移 ±55 px
      const preset = BUBBLE_PRESETS[Math.floor(Math.random() * BUBBLE_PRESETS.length)]
      // 不同透明度：让一些很通透，一些稍实
      const opacity = 0.38 + Math.random() * 0.30 // 0.38 – 0.68
      // 每颗随机起始角度，让虹彩分布不同
      const hueOffset = Math.floor(Math.random() * 360)

      return {
        i,
        size,
        left,
        riseDur,
        spinDur,
        delay,
        drift,
        rim: preset.rim,
        glow: preset.glow,
        opacity,
        hueOffset,
      }
    })
  }, [])

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-bubble]'),
    )
    if (sections.length === 0) return

    const visible = new Set<HTMLElement>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target as HTMLElement)
          else visible.delete(entry.target as HTMLElement)
        }
        setActive(visible.size > 0)
      },
      { threshold: 0.05 },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className={`rising-bubbles${active ? ' rising-bubbles--active' : ''}`}
      aria-hidden="true"
    >
      {bubbles.map((b) => {
        // conic-gradient 把彩色分布在 4 个色带上（每色 12% + 4% 微过场）
        // 60° → 75°: 紫  |  130° → 145°: 粉  |  210° → 225°: 黄  |  280° → 295°: 青
        // 这样"看上去"像参考图那种 2 条醒目色环 + 2 条辅色环
        const c = `conic-gradient(from ${b.hueOffset}deg,
          ${b.rim[0]} 0deg 8deg,
          ${b.rim[1]} 8deg 38deg,
          #ffffff 38deg 48deg,
          ${b.rim[2]} 48deg 72deg,
          ${b.rim[3]} 72deg 78deg,
          #ffffff 78deg 80deg,
          ${b.rim[4]} 80deg 130deg,
          ${b.rim[0]} 130deg 145deg,
          #ffffff 145deg 152deg,
          ${b.rim[2]} 152deg 192deg,
          ${b.rim[5]} 192deg 230deg,
          #ffffff 230deg 240deg,
          ${b.rim[1]} 240deg 260deg,
          ${b.rim[4]} 260deg 295deg,
          ${b.rim[3]} 295deg 305deg,
          #ffffff 305deg 310deg,
          ${b.rim[5]} 310deg 340deg,
          ${b.rim[0]} 340deg 360deg)`

        // 内层光影 —— 强烈高光在左上 28%/22%（参考图大水珠特征）
        const innerGlow = `
          radial-gradient(circle at 28% 22%,
            rgba(255,255,255,0.95) 0%,
            rgba(255,255,255,0.70) 6%,
            rgba(255,255,255,0.18) 18%,
            transparent 32%),
          radial-gradient(circle at 72% 78%,
            rgba(255,200,230,0.45) 0%,
            rgba(180,210,255,0.22) 22%,
            transparent 48%)
        `

        const backgroundImage = `${innerGlow}, ${c}`

        // mask：中心 62% 透明 → 整个泡呈"薄膜"形态
        // 78% 处开始有 0.4 透明度（轻过场）→ 90% 完全黑（彩色显出）→ 100% 黑
        // 这样挖空的边缘不是硬切，而是柔和过渡，像真实水膜
        const maskImage =
          'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.6) 80%, black 92%, black 100%)'

        // Webkit-mask 的复合层（Chromium 仍需要 -webkit 前缀）
        const webkitMask = `
          -webkit-radial-gradient(circle, transparent 60%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.6) 80%, black 92%, black 100%)
        ` as string

        return (
          <span
            key={b.i}
            className="rb"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              backgroundImage,
              WebkitMaskImage: webkitMask,
              maskImage,
              WebkitMaskComposite: 'source-in' as any,
              maskComposite: 'intersect' as any,
              boxShadow: `0 0 ${b.size * 0.6}px ${b.glow}, inset 0 0 ${b.size * 0.18}px rgba(255,255,255,0.18)`,
              animationDuration: `${b.riseDur}s, ${b.spinDur}s`,
              animationDelay: `${b.delay}s, ${-b.delay * 0.6}s`,
              ['--rb-drift' as string]: `${b.drift}px`,
              ['--rb-target-opacity' as string]: `${b.opacity}`,
            }}
          />
        )
      })}
    </div>
  )
}
