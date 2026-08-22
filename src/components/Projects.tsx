import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import ProjectModal from './ProjectModal'
import { projects, projectGroups, type ProjectGroup, type Project } from '../data/content'

/** 精选作品——居中标题 + 筛选标签 + 编号分类，点击卡片弹出详情。 */
export default function Projects() {
  const [filter, setFilter] = useState<ProjectGroup | 'all'>('all')
  const [active, setActive] = useState<Project | null>(null)

  // 监听导航栏「作品」点击：若弹窗打开则先关闭，再交给默认行为滚到 #works
  useEffect(() => {
    const onCloseModal = () => setActive(null)
    window.addEventListener('workbuddy:close-project-modal', onCloseModal)
    return () => window.removeEventListener('workbuddy:close-project-modal', onCloseModal)
  }, [])

  const visibleGroups =
    filter === 'all'
      ? projectGroups
      : projectGroups.filter((g) => g.key === filter)

  const renderCard = (p: (typeof projects)[0], i: number) => (
    <Reveal key={p.id} delay={(i % 3) * 0.06}>
      <article
        className="card"
        data-hover
        onClick={() => setActive(p)}
        style={{ cursor: 'pointer' }}
      >
        <div className="card__media">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            decoding="async"
            style={{ backgroundColor: p.accent }}
          />
          <span className="card__overlay">
            <span>查看详情</span>
            <span className="card__arrow">↗</span>
          </span>
        </div>

        <div className="card__info">
          <span className="tag-label">{p.category}</span>
          <h3>{p.title}</h3>
          <p className="blurb">{p.blurb}</p>
        </div>
      </article>
    </Reveal>
  )

  return (
    <section className="section" id="work" data-bubble>
      <div className="container">
        {/* 居中标题区 */}
        <Reveal>
          <div className="work__hero">
            <span className="work__hero-no">02</span>
            <h2 className="work__hero-title">精选作品</h2>
          </div>
        </Reveal>

        {/* 筛选标签栏 */}
        <Reveal delay={0.08}>
          <div className="work__filters">
            <button
              className={`work__filter ${filter === 'all' ? 'is-active' : ''}`}
              onClick={() => setFilter('all')}
              data-hover
            >
              全部
            </button>
            {projectGroups.map((g) => (
              <button
                key={g.key}
                className={`work__filter ${filter === g.key ? 'is-active' : ''}`}
                onClick={() => setFilter(g.key)}
                data-hover
              >
                {g.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 分类内容区 */}
        {visibleGroups.map((g) => {
          const groupProjects = projects.filter((p) => p.group === g.key)
          return (
            <div className="work__group" key={g.key} id={`group-${g.key}`}>
              <Reveal>
                <div className="work__group-head">
                  <span className="work__group-no">{g.no}</span>
                  <span className="work__group-name">{g.label}</span>
                  <span className="work__group-en">{g.en}</span>
                  <span className="work__group-count">
                    {groupProjects.length} 个项目
                  </span>
                </div>
              </Reveal>

              {groupProjects.length > 0 ? (
                <div className="work__grid">
                  {groupProjects.map((p, i) => renderCard(p, i))}
                </div>
              ) : (
                <Reveal>
                  <div className="work__empty">
                    <span>即将上线，敬请期待</span>
                  </div>
                </Reveal>
              )}
            </div>
          )
        })}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
