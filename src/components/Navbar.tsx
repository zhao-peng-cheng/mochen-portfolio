import { useEffect, useRef, useState } from 'react'
import { nav, profile } from '../data/content'
import Marquee from './Marquee'

/** 固定导航栏——在首屏透明，滚动后变为毛玻璃。 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 把导航栏真实高度同步到 --nav-h，供下方跑马灯 sticky 精准贴合
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const update = () =>
      document.documentElement.style.setProperty('--nav-h', `${el.offsetHeight}px`)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const t = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Shanghai',
      }).format(d)
      setTime(`${t} 广东 深圳`)
    }
    tick()
    const id = setInterval(tick, 30 * 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header ref={navRef} className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a
          href="#hero"
          className="nav__brand"
          data-hover
          onClick={() => {
            // 弹窗打开时点击 brand 同理：先关弹窗，再交给原生 href 跳到 #hero
            window.dispatchEvent(new Event('workbuddy:close-project-modal'))
          }}
        >
          <span className="nav__avatar">{profile.avatarChar}</span>
          {profile.wordmark}
        </a>

        <nav className="nav__links">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-hover
              onClick={() => {
                // 弹窗打开时点击任何导航链接（首页/简介/作品/联系），
                // 先派发全局事件让 Projects 关闭弹窗，
                // 再交给 <a href> 原生行为滚到目标 section
                window.dispatchEvent(new Event('workbuddy:close-project-modal'))
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="nav__cta">
          <span className="nav__time">{time}</span>
        </div>
      </div>
      <Marquee />
    </header>
  )
}
