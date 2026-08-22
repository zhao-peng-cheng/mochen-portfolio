import Reveal from './Reveal'
import { resumeGroups } from '../data/content'

/** 简历：按分组展示工作经历、教育背景与荣誉认证。 */
export default function Resume() {
  return (
    <section className="section" id="resume">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <span className="eyebrow">03 — 简历</span>
              <h2>
                一路
                <br />
                走来。
              </h2>
            </div>
            <span className="head-meta">经历 / 履历</span>
          </div>
        </Reveal>

        <div className="resume">
          {resumeGroups.map((group, gi) => (
            <div className="resume__group" key={group.category}>
              <Reveal>
                <div className="resume__group-label">
                  <span className="resume__dot" />
                  {group.category}
                </div>
              </Reveal>

              <div className="resume__items">
                {group.items.map((item, ii) => (
                  <Reveal key={`${gi}-${ii}`} delay={0.05 * ii}>
                    <div className="resume__item" data-hover>
                      <div className="resume__year">{item.year}</div>
                      <div className="resume__content">
                        <h3 className="resume__title">{item.title}</h3>
                        <span className="resume__org">{item.org}</span>
                        <p className="resume__desc">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
