/**
 * 全局浮动球体背景——仅添加动效装饰层，不改变网站背景色。
 * 球体使用蓝紫色调渐变 + 柔光模糊，以 fixed 定位铺满视口，
 * z-index 极低，pointer-events: none，不影响交互。
 */
export default function SphereBackground() {
  return (
    <div className="sphere-bg" aria-hidden="true">
      <div className="sphere sphere--1" />
      <div className="sphere sphere--2" />
      <div className="sphere sphere--3" />
      <div className="sphere sphere--4" />
    </div>
  )
}
