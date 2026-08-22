import { useState } from 'react'
import Reveal from './Reveal'
import { profile } from '../data/content'

/** 联系页——居中布局、白色联系卡片网格、粉色强调色。 */
export default function Contact() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)

  const handleAction = (method: (typeof profile.contactMethods)[0], index: number) => {
    if (method.actionType === 'mailto') {
      window.location.href = `mailto:${method.account}?subject=合作咨询 from 作品集网站`
    } else if (method.actionType === 'qqmail') {
      // QQ 邮箱网页写信页：收件人自动填入 account（新标签页打开）
      const url = `https://mail.qq.com/cgi-bin/qm_share?t=mail_compose&to=${encodeURIComponent(method.account)}`
      window.open(url, '_blank', 'noopener,noreferrer')
    } else if (method.actionType === 'copy') {
      navigator.clipboard?.writeText(method.account).then(() => {
        setCopiedKey(`${index}`)
        setTimeout(() => setCopiedKey(null), 2000)
      })
    } else if (method.actionType === 'qrcode') {
      setShowQR(true)
    }
  }

  return (
    <footer className="contact" id="contact" data-bubble>
      <div className="contact__inner">
        <Reveal>
          <span className="contact__label">CONTACT</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="contact__title">期待合作</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="contact__desc">
            欢迎品牌识别、视觉设计、AI 创作等方向的项目咨询。
            <br />
            点击下方卡片即可快速联系，我会在 24 小时内回复。
          </p>
        </Reveal>

        <Reveal delay={0.13}>
          <a
            className="contact__resume-btn"
            href="/resume.pdf"
            download
            data-hover
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            下载简历 PDF
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="contact__cards">
            {profile.contactMethods.map((m, i) => (
              <div
                className="contact__card"
                key={m.platform}
                data-hover
                onClick={() => handleAction(m, i)}
              >
                <div className="contact__card-icon">
                  <img src={m.icon} alt={m.platform} />
                </div>
                <div className="contact__card-info">
                  <span className="contact__card-platform">{m.platform}</span>
                  <span className="contact__card-account">{m.account}</span>
                </div>
                <button className="contact__card-btn">
                  {copiedKey === `${i}` ? '已复制' : m.action}
                </button>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="contact__hint">
            点击账号即可复制，欢迎随时联系
            <span className="contact__cursor">|</span>
          </p>
        </Reveal>
      </div>

      <div className="contact__foot">
        <div className="contact__foot-inner">
          <span className="brand">© 2026 {profile.name}</span>
          <span>由 React + Vite 驱动</span>
          <span>{profile.location}</span>
        </div>
      </div>

      {/* 微信二维码弹窗 */}
      {showQR && (
        <div className="qr-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <img src="/wechat-qrcode.jpg" alt="微信二维码" />
            <p className="qr-modal__hint">扫一扫，添加微信</p>
            <button className="qr-modal__close" onClick={() => setShowQR(false)}>
              关闭
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}
