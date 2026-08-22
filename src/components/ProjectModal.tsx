import { useEffect, useState, useCallback, useRef } from 'react'
import type { Project, ProjectDetailImage, ProjectSection } from '../data/content'

/** 项目详情全页——杂志式长页布局，分区展示案例图片与理念。 */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null)
  const [videoLightbox, setVideoLightbox] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const [videoAspect, setVideoAspect] = useState<string>('9 / 16')
  const inlineVideoRef = useRef<HTMLVideoElement>(null)
  const lightboxVideoRef = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (project) {
      setVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      setVisible(false)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const closeVideoLightbox = useCallback(() => {
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause()
    }
    setVideoLightbox(false)
  }, [])

  const openVideoLightbox = useCallback(() => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.pause()
    }
    setVideoLightbox(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (videoLightbox) closeVideoLightbox()
        else if (lightbox) closeLightbox()
        else onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, lightbox, closeLightbox, videoLightbox, closeVideoLightbox])

  // 视频宽高比已知后，重新计算 wrapper 尺寸：撑满父容器宽，高度按视频比例算出，
  // 但受限于视口高度 80%，确保"全屏覆盖"且不撑破滚动。
  useEffect(() => {
    function fit() {
      const wrap = videoWrapRef.current
      if (!wrap) return
      const [w, h] = videoAspect.split('/').map(s => parseFloat(s))
      if (!w || !h) return
      const ar = h / w
      const parent = wrap.parentElement
      const parentW = parent ? parent.clientWidth : window.innerWidth
      const maxW = Math.min(parentW - 32, 1400)
      const maxH = window.innerHeight * 0.8
      let width = maxW
      let height = width * ar
      if (height > maxH) {
        height = maxH
        width = height / ar
      }
      wrap.style.width = `${Math.round(width)}px`
      wrap.style.height = `${Math.round(height)}px`
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [videoAspect])

  if (!project) return null
  const isFlowMode = project.id === '10'
  const isGalleryMode = project.id === '11'
  const detailImages = project.detailImages || []
  const casePairs: { before?: ProjectDetailImage; after?: ProjectDetailImage }[] = []
  const caseTriples: { src?: ProjectDetailImage; product?: ProjectDetailImage; result?: ProjectDetailImage }[] = []

  if (isFlowMode) {
    // 三图流模式：原图 + 珠宝 → 成图
    for (let i = 0; i < detailImages.length - 2; i += 3) {
      caseTriples.push({ src: detailImages[i], product: detailImages[i + 1], result: detailImages[i + 2] })
    }
  } else if (!isGalleryMode) {
    // 修复案例区配对：仅对非 gallery 模式的项目拆对（gallery 模式走专属 GALLERY 块，不拆对）
    for (let i = 0; i < detailImages.length - 1; i += 2) {
      casePairs.push({ before: detailImages[i], after: detailImages[i + 1] })
    }
  }

  const workflowImage = detailImages.length > 0 ? detailImages[detailImages.length - 1] : null
  const hasCasePairs = (project.group === 'workflow') && !isGalleryMode && (casePairs.length > 0 || caseTriples.length > 0)
  const caseSectionTitle = project.id === '01' ? '修复成品' : '设计成品'
  const caseSectionEn = project.id === '01' ? 'RESTORATION CASES' : 'GENERATION CASES'

  const openLightbox = (img: { src: string; caption: string }) => setLightbox(img)

  const ClickableImg = ({ img }: { img: { src: string; caption: string } }) => (
    <img
      src={img.src}
      alt={img.caption}
      loading="lazy"
      decoding="async"
      onClick={() => openLightbox(img)}
      style={{ cursor: 'zoom-in' }}
    />
  )

  return (
    <>
      <div
        className={`pmodal ${visible ? 'is-open' : ''}`}
        onClick={onClose}
      >
        {/* 顶部工具栏：absolute 定位，固定在右上角 */}
        <div className="pmodal__toolbar" onClick={(e) => e.stopPropagation()}>
          <a href="#work" className="pmodal__back-btn" onClick={(e) => { e.preventDefault(); onClose(); }} data-hover>
            返回作品集
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        <div
          className="pmodal__page"
          onClick={(e) => e.stopPropagation()}
        >

          {/* 标题区 */}
          <header className="pmodal__hero">
            <span className="pmodal__cat">{project.category}</span>
            <h1 className="pmodal__title">{project.title}</h1>
            <p className="pmodal__sub">
              {project.tags.join(' · ')}
            </p>
          </header>

          {/* 项目信息三栏 */}
          <div className="pmodal__info">
            <div className="pmodal__info-item">
              <span className="pmodal__info-label">类别</span>
              <span className="pmodal__info-value">{project.category}</span>
            </div>
            <div className="pmodal__info-item">
              <span className="pmodal__info-label">产品</span>
              <span className="pmodal__info-value">{project.client}</span>
            </div>
            <div className="pmodal__info-item">
              <span className="pmodal__info-label">年份</span>
              <span className="pmodal__info-value">{project.year}</span>
            </div>
          </div>

          {/* 视频区 */}
          {project.detailVideo && (
            <section className="pmodal__section">
              <div className="pmodal__section-head">
                <span className="pmodal__section-en">FILM</span>
                <h2 className="pmodal__section-title">
                  {project.category?.includes('TVC') ? 'TVC视频' : '信息流视频'}
                </h2>
              </div>
              <div
                ref={videoWrapRef}
                className="pmodal__video-wrap"
                style={{ aspectRatio: videoAspect }}
              >
                {videoLoading && (
                  <div className="pmodal__video-loader">
                    <span className="pmodal__video-spinner" />
                  </div>
                )}
                <video
                  ref={inlineVideoRef}
                  src={project.detailVideo}
                  poster={project.videoPoster}
                  controls
                  playsInline
                  preload="metadata"
                  className="pmodal__video"
                  onWaiting={() => setVideoLoading(true)}
                  onPlaying={() => setVideoLoading(false)}
                  onCanPlay={() => setVideoLoading(false)}
                  onLoadedData={() => setVideoLoading(false)}
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget
                    if (v.videoWidth && v.videoHeight) {
                      // 让播放器框与视频实际宽高比保持一致，避免上下/左右留黑
                      setVideoAspect(`${v.videoWidth} / ${v.videoHeight}`)
                    }
                  }}
                />
                <button
                  className="pmodal__video-expand"
                  onClick={openVideoLightbox}
                  data-hover
                  aria-label="放大播放"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </div>
            </section>
          )}

          {/* 多分区版式（如电商） — 按 sections 渲染 */}
          {project.sections && project.sections.length > 0 && (
            <div className="pmodal__sections">
              {project.sections.map((sec, si) => (
                <section
                  className={`pmodal__section${sec.compact ? ' pmodal__section--compact' : ''}`}
                  key={si}
                >
                  <div className="pmodal__section-head pmodal__section-head--custom">
                    <span className="pmodal__section-en">{sec.en}</span>
                    <h2 className="pmodal__section-title">{sec.title}</h2>
                    {sec.sub && <p className="pmodal__section-sub">{sec.sub}</p>}
                  </div>
                  <div className={`pmodal__section-grid pmodal__section-grid--${sec.images.length}`}>
                    {sec.images.map((img, ii) => (
                      <figure className="pmodal__fig" key={ii}>
                        {img.label && <div className="pmodal__fig-label">{img.label}</div>}
                        <ClickableImg img={img} />
                        <figcaption>{img.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* 画廊模式的工作流区 — 提前到 GALLERY 之前（id'11 视角转换等场景） */}
          {!project.sections && isGalleryMode && workflowImage && (
            <section className="pmodal__section">
              <div className="pmodal__section-head">
                <span className="pmodal__section-en">WORKFLOW</span>
                <h2 className="pmodal__section-title">技术工作流</h2>
              </div>
              <figure className="pmodal__fig pmodal__fig--full">
                <ClickableImg img={workflowImage} />
                <figcaption>{workflowImage.caption}</figcaption>
              </figure>
            </section>
          )}

          {/* 普通画廊 — 非 gallery mode 项目走多列 grid；gallery mode 走 case-pair 容器（垂直单图堆叠，视觉与「修复案例」一致） */}
          {!project.sections && !hasCasePairs && detailImages.length > 0 && (() => {
            const galleryImages = isGalleryMode && workflowImage
              ? detailImages.filter((img) => img !== workflowImage)
              : detailImages
            if (galleryImages.length === 0) return null
            if (isGalleryMode) {
              return (
                <section className="pmodal__section">
                  <div className="pmodal__section-head pmodal__section-head--custom">
                    <span className="pmodal__section-en">GALLERY</span>
                    <h2 className="pmodal__section-title">视角转换展示</h2>
                    <p className="pmodal__section-sub">
                      本作品的多角度视角转换效果 — 共 {galleryImages.length} 组
                    </p>
                  </div>
                  <div className="pmodal__cases">
                    {galleryImages.map((img, ii) => (
                      <div className="pmodal__case-pair pmodal__case-pair--single" key={ii}>
                        <figure className="pmodal__fig">
                          <ClickableImg img={img} />
                          <figcaption>{img.caption}</figcaption>
                        </figure>
                      </div>
                    ))}
                  </div>
                </section>
              )
            }
            return (
              <section className="pmodal__section">
                <div className="pmodal__section-head pmodal__section-head--custom">
                  <span className="pmodal__section-en">GALLERY</span>
                  <h2 className="pmodal__section-title">作品图集</h2>
                  <p className="pmodal__section-sub">本作品的完整视觉呈现 — 共 {galleryImages.length} 张</p>
                </div>
                <div className={`pmodal__section-grid pmodal__section-grid--${galleryImages.length}`}>
                  {galleryImages.map((img, ii) => (
                    <figure className="pmodal__fig" key={ii}>
                      {img.label && <div className="pmodal__fig-label">{img.label}</div>}
                      <ClickableImg img={img} />
                      <figcaption>{img.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )
          })()}

          {/* 工作流区 — 全宽展示（hasCasePairs 项目放案例之前） */}
          {!project.sections && hasCasePairs && workflowImage && (
            <section className="pmodal__section">
              <div className="pmodal__section-head">
                <span className="pmodal__section-en">WORKFLOW</span>
                <h2 className="pmodal__section-title">技术工作流</h2>
              </div>
              <figure className="pmodal__fig pmodal__fig--full">
                <ClickableImg img={workflowImage} />
                <figcaption>{workflowImage.caption}</figcaption>
              </figure>
            </section>
          )}

          {/* 单分区版式：修复案例区 — 前后对比 */}
          {!project.sections && hasCasePairs && !isFlowMode && (
            <section className="pmodal__section">
              <div className="pmodal__section-head">
                <span className="pmodal__section-en">{caseSectionEn}</span>
                <h2 className="pmodal__section-title">{caseSectionTitle}</h2>
              </div>
              <div className="pmodal__cases">
                {casePairs.map((pair, i) => (
                  <div className="pmodal__case-pair" key={i}>
                    <figure className="pmodal__fig">
                      <ClickableImg img={pair.before!} />
                      <figcaption>{pair.before?.caption}</figcaption>
                    </figure>
                    <figure className="pmodal__fig">
                      <ClickableImg img={pair.after!} />
                      <figcaption>{pair.after?.caption}</figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 三图流模式 — 原图 + 珠宝 → 成图 */}
          {!project.sections && hasCasePairs && isFlowMode && (
            <section className="pmodal__section">
              <div className="pmodal__section-head">
                <span className="pmodal__section-en">{caseSectionEn}</span>
                <h2 className="pmodal__section-title">{caseSectionTitle}</h2>
              </div>
              <div className="pmodal__flows">
                {caseTriples.map((triple, i) => (
                  <div className="pmodal__flow-row" key={i}>
                    <figure className="pmodal__fig pmodal__fig--flow">
                      <ClickableImg img={triple.src!} />
                      <figcaption>{triple.src?.caption}</figcaption>
                    </figure>
                    <span className="pmodal__flow-op">+</span>
                    <figure className="pmodal__fig pmodal__fig--flow pmodal__fig--product">
                      <ClickableImg img={triple.product!} />
                      <figcaption>{triple.product?.caption}</figcaption>
                    </figure>
                    <span className="pmodal__flow-op pmodal__flow-op--arrow">→</span>
                    <figure className="pmodal__fig pmodal__fig--flow">
                      <ClickableImg img={triple.result!} />
                      <figcaption>{triple.result?.caption}</figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 设计理念区 */}
          {project.detailDesc && (
            <section className="pmodal__section pmodal__section--text pmodal__section--concept">
              <div className="pmodal__section-head pmodal__section-head--custom">
                <span className="pmodal__section-en">CONCEPT</span>
                <h2 className="pmodal__section-title">设计理念</h2>
                {project.detailSub && (
                  <p className="pmodal__section-sub">{project.detailSub}</p>
                )}
              </div>
              <p className="pmodal__text">{project.detailDesc}</p>
            </section>
          )}

          {/* 底部返回 */}
          <div className="pmodal__footer">
            <button className="pmodal__back" onClick={onClose} data-hover>
              ← 返回作品集
            </button>
          </div>
        </div>
      </div>

      {/* 图片灯箱 */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox} data-hover>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} />
            <p className="lightbox__caption">{lightbox.caption}</p>
          </div>
        </div>
      )}

      {/* 视频灯箱 */}
      {videoLightbox && project.detailVideo && (
        <div className="lightbox lightbox--video" onClick={closeVideoLightbox}>
          <button className="lightbox__close" onClick={closeVideoLightbox} data-hover>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="lightbox__inner lightbox__inner--video" onClick={(e) => e.stopPropagation()}>
            <video
              ref={lightboxVideoRef}
              src={project.detailVideo}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="lightbox__video"
            />
          </div>
        </div>
      )}
    </>
  )
}
