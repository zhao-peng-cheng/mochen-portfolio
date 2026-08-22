import Reveal from './Reveal'
import { capabilities } from '../data/content'

/** 个人优势——3×2 的能力卡片网格。 */
export default function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <Reveal>
          <div className="section-head section-head--center">
            <div>
              <span className="eyebrow">03 — 能力</span>
              <h2>掌握技能</h2>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="cap__grid">
            {capabilities.map((c) => (
              <div className="cap" key={c.no} data-hover>
                <div className="cap__icon-wrap">
                  <img src={c.icon} alt={c.title} className="cap__icon" />
                </div>
                <div className="cap__no">{c.no}</div>
                <h3 className="cap__title">{c.title}</h3>
                <p className="cap__desc">{c.desc}</p>
                <div className="cap__tags">
                  {c.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
