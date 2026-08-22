import { useEffect, useState } from 'react'

/**
 * 全局气泡背景层——当[data-bubble] 的 section 进入视口时显示。
 * 取代/叠加于 SphereBackground，提供更丰富的浅紫气泡氛围。
 * z-index 0，pointer-events:none，不影响交互。
 */
export default function BubbleBackground() {
  const [active, setActive] = useState(false)

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
      { threshold: 0.08 },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className={`bubble-bg${active ? ' bubble-bg--active' : ''}`}
      aria-hidden="true"
    />
  )
}
