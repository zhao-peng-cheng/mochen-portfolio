import Reveal from './Reveal'
import { profile, capabilities } from '../data/content'

export default function About() {
  return (
    <section className="section" id="about" data-bubble>
      <div className="container">
        {/* 大标题区 */}
        <Reveal>
          <div className="about__hero">
            <h2 className="about__hero-title">个人简介</h2>
            <span className="about__hero-sub">About Me</span>
          </div>
        </Reveal>

        {/* 双卡片并排 */}
        <div className="about__cards">
          {/* ── 左卡片 — 肖像 ── */}
          <Reveal>
            <div className="about__card about__card--visual">
              <div className="about__portrait">
                <img
                  src="/about-portrait.jpg"
                  alt={`${profile.name} 肖像`}
                  loading="lazy"
                />
              </div>
              <div className="about__card-id">
                <span className="about__card-icon">✦</span>
                <h3 className="about__card-name">{profile.name}</h3>
                <span className="about__card-role">{profile.roleLine}</span>
              </div>
            </div>
          </Reveal>

          {/* ── 右侧：基本信息 + 简介卡片 ── */}
          <div className="about__right-col">
            {/* 基本信息 — 位于文字卡片上方 */}
            <Reveal delay={0.1}>
              <div className="about__basic-info">
                <h4 className="about__basic-info-title">基本信息</h4>
                <div className="about__basic-info-grid">
                  {profile.basicInfo.map((it) => (
                    <div className="about__basic-info-item" key={it.label}>
                      <span className="about__basic-info-dot" />
                      <span className="about__basic-info-text">{it.label}：{it.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* 文字卡片 — 横向扩展，高度不变 */}
            <Reveal delay={0.15}>
              <div className="about__card about__card--bio">
                {profile.tagline && (
                  <h3 className="about__card-headline">{profile.tagline}</h3>
                )}
                <div className="about__card-body">
                  {profile.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 能力卡片网格 */}
        <Reveal>
          <div className="about__cap-head">
            <h3>掌握技能</h3>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="cap__grid">
            {capabilities.map((c) => (
              <div className="cap" key={c.no} data-hover>
                <div className="cap__no">{c.no}</div>
                <h4 className="cap__title">{c.title}</h4>
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
