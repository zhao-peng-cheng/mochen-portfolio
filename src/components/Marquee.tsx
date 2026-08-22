import { marqueeWords } from '../data/content'

const GROUP_REPEATS = 5

/**
 * Infinite skill marquee.
 *  - Each `.marquee__group` is one full copy of the word list (5 items).
 *  - We render `GROUP_REPEATS` (5) groups on the track. Combined with a
 *    keyframe translation of -1/GROUP_REPEATS = -20%, the track moves
 *    exactly one group width per cycle, producing a seamless loop.
 *  - The total track width (≈ 5 × group_w) is comfortably wider than 2 × the
 *    visible .marquee container, so the right edge is never empty even on
 *    very wide viewports.
 */
export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {Array.from({ length: GROUP_REPEATS }, (_, g) => (
          <div className="marquee__group" key={g} aria-hidden={g > 0}>
            {marqueeWords.map((w, i) => (
              <a
                className="marquee__item"
                key={`${g}-${i}`}
                href={w.href}
                onClick={() => {
                  // 若作品详情弹窗已打开，先派发事件关闭 modal，
                  // 然后让 <a href> 原生行为继续执行锚点跳转
                  window.dispatchEvent(new Event('workbuddy:close-project-modal'))
                }}
              >
                {w.label}
                <span className="star">✦</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
