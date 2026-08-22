import { motion } from 'framer-motion'
import { profile } from '../data/content'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const titleWords = ['AIGC', '个人作品集']

/** 漂浮的花瓣粒子——呼应参考图中的飘落花瓣。 */
const petals = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 6 + Math.random() * 12,
  duration: 16 + Math.random() * 14,
  delay: Math.random() * 18,
  dx: (Math.random() - 0.5) * 160,
}))

/** 全屏首屏：柔和天空渐变、漂浮花瓣、四角分布的元信息与巨型姓名。 */
export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        {/* 柔和的晨曦天空渐变——明亮、通透、以天空为主。 */}
        <div className="hero__sky" />
        <div className="hero__sun" />

        {/* 将名为 hero-bg.mp4 的文件放入 /public 即可启用真实视频背景。 */}
        <video className="hero__video" autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.jpg">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* 漂浮花瓣。 */}
        <div className="petals" aria-hidden="true">
          {petals.map((p) => (
            <span
              className="petal"
              key={p.id}
              style={
                {
                  left: `${p.left}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  '--dx': `${p.dx}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="hero__veil" />
      </div>

      <div className="hero__content">
        {/* 下段——姓名与操作栏。 */}
        <div className="hero__lower">
          <h1 className="hero__title">
            {titleWords.map((w, i) => (
              <span className="word" key={w}>
                <motion.span
                  initial={{ y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.05, ease, delay: 0.3 + i * 0.1 }}
                >
                  {w}
                  {i === titleWords.length - 1 && <span className="accent-dot">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="hero__bottom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
          >
            <div className="hero__roles">
              {profile.roles.map((r, i) => (
                <span
                  key={r}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}
                >
                  <span className="role">{r}</span>
                  {i < profile.roles.length - 1 && <span className="sep" />}
                </span>
              ))}
            </div>

            <div className="hero__cta">
              <a href="#contact" className="btn btn--solid" data-hover>
                联系我
                <span className="arrow">↗</span>
              </a>
              <a href="#about" className="btn btn--ghost" data-hover>
                了解我
              </a>
              <a href="#work" className="btn btn--ghost" data-hover>
                查看作品
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        向下滚动
        <span className="track" />
      </motion.div>
    </section>
  )
}
