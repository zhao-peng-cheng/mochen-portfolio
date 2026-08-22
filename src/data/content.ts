// ─────────────────────────────────────────────────────────────
//  站点内容 —— 所有文案在此集中编辑。
// ─────────────────────────────────────────────────────────────

export const profile = {
  wordmark: '赵鹏程',
  avatarChar: '赵',
  name: '赵鹏程',
  roleLine: '视觉 / AI / 品牌设计师',
  roles: ['视觉设计师', 'AI 设计师', '品牌设计师'],
  tagline: '',
  indexLabel: '作品集 — 2026 索引',
  location: '广东 深圳 · 远程协作',
  email: 'hello@mochen.studio',
  phone: '+86 138 0000 0000',
  availability: '接受精选项目合作 — 2026 第四季度',
  socials: [
    { label: 'Instagram', handle: '@mochen.studio', url: '#' },
    { label: 'Behance', handle: '/mochen', url: '#' },
    { label: 'Dribbble', handle: '/mochen', url: '#' },
    { label: '领英', handle: '/in/mochen', url: '#' },
  ],
  contactMethods: [
    { icon: '/icon-email.png', platform: 'QQ 邮箱', account: '1137104690@qq.com', action: '发邮件', actionType: 'qqmail' },
    { icon: '/icon-wechat.png', platform: '微信', account: 'Zpc_101012510', action: '展开二维码', actionType: 'qrcode' },
    { icon: '/icon-phone.png', platform: '联系电话', account: '18981682145', action: '复制', actionType: 'copy' },
    { icon: '/icon-location.png', platform: '所在地', account: '广东 . 深圳', action: '复制', actionType: 'copy' },
  ],
  bio: [
    '我是赵鹏程，一个习惯用视觉语言，为商业赋予感性表达的人。',
    '在电商这片高速流转的场域里，我擅长捕捉转瞬即逝的情绪，把它们沉淀为能直接驱动点击与转化的画面。从精细的电商视觉、TVC广告，到更完整的原创漫剧与IP世界观构建，我持续穿梭于不同媒介之间，不只为了完成一次设计，更希望为每个品牌留下一个值得被记住的瞬间。',
    '我相信，好的电商作品不止于美观，更在于精准地讲述打动人心的故事。这份作品集，便是我用镜头与创意，写给商业的一封封情书。',
  ],
  basicInfo: [
    { label: '姓名', value: '赵鹏程' },
    { label: '性别', value: '男' },
    { label: '年龄', value: '26' },
    { label: '学历', value: '本科' },
  ],
  stats: [
    { value: '8+', label: '深耕年限' },
    { value: '120', label: '交付项目' },
    { value: '40+', label: '合作品牌' },
    { value: '12', label: '所获奖项' },
  ],
}

export const nav = [
  { label: '首页', href: '#hero' },
  { label: '简介', href: '#about' },
  { label: '作品', href: '#work' },
  { label: '联系', href: '#contact' },
]

export type ProjectGroup = 'workflow' | 'graphic' | 'ip' | 'ecommerce' | 'tvc' | 'feed'

export type ProjectDetailImage = {
  src: string
  caption: string
  /** 图片上方标签（如 "01 / IP基础档案"），可选；未填则不显示 */
  label?: string
}

export type ProjectSection = {
  en: string
  title: string
  sub?: string
  images: ProjectDetailImage[]
  /** 紧凑模式：单图时限制最大宽度并居中，避免大图占满整栏 */
  compact?: boolean
}

export type Project = {
  id: string
  title: string
  category: string
  year: string
  client: string
  tags: string[]
  accent: string
  image: string
  size: 'wide' | 'tall' | 'std'
  blurb: string
  group: ProjectGroup
  detailImages?: ProjectDetailImage[]
  detailDesc?: string
  detailVideo?: string
  /** 视频封面图（独立于列表封面）。不填则默认使用 image。 */
  videoPoster?: string
  /** 详情页主海报（独立于列表封面）。用于详情页内 IP POSTER / 主视觉区域。 */
  detailPoster?: string
  /** 多分区版式（如电商详情）。若提供则覆盖 detailImages 渲染。 */
  sections?: ProjectSection[]
  /** 设计理念的副描述（一句话英文说明，渲染于 concept 标题下方）。可选。 */
  detailSub?: string
}

export const projectGroups: { key: ProjectGroup; no: string; label: string; en: string; desc: string }[] = [
  { key: 'workflow', no: '01', label: '工作流', en: 'Workflow', desc: 'AI 驱动的设计工作流与自动化流程' },
  { key: 'graphic', no: '02', label: '平面设计', en: 'Graphic Design', desc: '品牌识别、编辑设计与视觉系统' },
  { key: 'ip', no: '03', label: 'IP形象设计', en: 'IP Character Design', desc: '原创 IP 形象与世界观构建' },
  { key: 'ecommerce', no: '04', label: '电商设计', en: 'E-commerce Design', desc: '包装、视觉营销与消费体验设计' },
  { key: 'tvc', no: '05', label: 'TVC广告', en: 'TVC Commercial', desc: '电视广告与品牌宣传片创作' },
  { key: 'feed', no: '06', label: '电商信息流', en: 'E-commerce Feed', desc: '信息流广告与社交媒体视觉内容' },
]

export const projects: Project[] = [
  {
    id: '01',
    title: '旧图翻新',
    category: 'AI · 图像修复',
    year: '2025',
    client: '个人项目',
    tags: ['ComfyUI', 'AI 修复', '老照片', 'Stable Diffusion'],
    accent: '#D4C5E8',
    image: '/works/restored-portrait.png',
    size: 'wide',
    blurb: '基于 ComfyUI 搭建的 AI 老照片修复工作流——从降噪、上色到超分辨率，让褪色的记忆重新清晰。',
    group: 'workflow',
    detailDesc: '利用 ComfyUI 搭建的完整老照片修复工作流，集成降噪、智能上色、超分辨率放大与人脸修复模块。以下为三组修复案例的前后对比，以及完整的工作流节点图。',
    detailImages: [
      { src: '/works/original-portrait.jpg', caption: '原图① — 褪色的复古人像老照片' },
      { src: '/works/restored-portrait.png', caption: '成图① — AI 修复后的彩色人像' },
      { src: '/works/original-group-photo.png', caption: '原图② — 黑白时代合影' },
      { src: '/works/restored-group-photo.png', caption: '成图② — AI 上色修复后合影' },
      { src: '/works/original-street-scene.png', caption: '原图③ — 民国时期街景' },
      { src: '/works/restored-street-scene.png', caption: '成图③ — AI 修复后街景' },
      { src: '/works/workflow-old-photo-restoration.png', caption: 'ComfyUI 完整工作流节点图' },
    ],
  },
  {
    id: '09',
    title: '室内设计',
    category: 'AI · 室内设计',
    year: '2026.05',
    client: '个人项目',
    tags: ['ComfyUI', 'AI 室内设计', '图生图', 'Stable Diffusion'],
    accent: '#C8DCE8',
    image: '/works/interior-result-1.png',
    size: 'wide',
    blurb: '基于 ComfyUI 搭建的室内装潢 AI 生成工作流——从原始空间照片到风格化室内设计效果图，一键实现专业级装潢方案。',
    group: 'workflow',
    detailDesc: '利用 ComfyUI 搭建的室内装潢 AI 生成工作流，通过图生图方式将原始室内空间照片转化为不同风格的装潢效果图。工作流集成了 ControlNet 空间结构控制、风格提示词调度与超分辨率放大模块。以下为三组生成案例的前后对比，以及完整的工作流节点图。',
    detailImages: [
      { src: '/works/interior-original-1.jpg', caption: '原图① — 原始室内空间照片' },
      { src: '/works/interior-result-1.png', caption: '成图① — AI 生成的装潢效果图' },
      { src: '/works/interior-original-2.jpg', caption: '原图② — 原始室内空间照片' },
      { src: '/works/interior-result-2.png', caption: '成图② — AI 生成的装潢效果图' },
      { src: '/works/interior-original-3.jpg', caption: '原图③ — 原始室内空间照片' },
      { src: '/works/interior-result-3.png', caption: '成图③ — AI 生成的装潢效果图' },
      { src: '/works/interior-workflow.png', caption: 'ComfyUI 完整工作流节点图' },
    ],
  },
  {
    id: '10',
    title: '人像摄影',
    category: 'AI · 人像摄影',
    year: '2026.05',
    client: '个人项目',
    tags: ['ComfyUI', 'AI 人像', '珠宝电商', 'Stable Diffusion'],
    accent: '#E8D4C8',
    image: '/works/portrait-result-1.jpg',
    size: 'wide',
    blurb: '基于 ComfyUI 搭建的 人像摄影工作流——将珠宝产品与人物原图融合，一键生成专业级电商人像大片。',
    group: 'workflow',
    detailDesc: '利用 ComfyUI 搭建的 人像摄影工作流，通过将珠宝项链产品图与人物原图智能融合，生成佩戴珠宝效果的专业级电商人像大片。工作流集成了产品分割、人物融合、光影协调与超分辨率放大模块。以下为三组生成案例的前后对比、珠宝产品参考图，以及完整的工作流节点图。',
    detailImages: [
      { src: '/works/portrait-original-1.jpg', caption: '原图① — 人物原图' },
      { src: '/works/portrait-necklace-1.jpg', caption: '珠宝参考① — 项链产品图' },
      { src: '/works/portrait-result-1.jpg', caption: '成图① — AI 生成的珠宝人像大片' },
      { src: '/works/portrait-original-2.jpg', caption: '原图② — 人物原图' },
      { src: '/works/portrait-necklace-2.png', caption: '珠宝参考② — 项链产品图' },
      { src: '/works/portrait-result-2.jpg', caption: '成图② — AI 生成的珠宝人像大片' },
      { src: '/works/portrait-original-3.jpg', caption: '原图③ — 人物原图' },
      { src: '/works/portrait-necklace-3.jpg', caption: '珠宝参考③ — 项链产品图' },
      { src: '/works/portrait-result-3.jpg', caption: '成图③ — AI 生成的珠宝人像大片' },
      { src: '/works/portrait-workflow.png', caption: 'ComfyUI 完整工作流节点图' },
    ],
  },
  {
    id: '11',
    title: '视角转换',
    category: 'AI · 视角转换',
    year: '2026.05',
    client: '个人项目',
    tags: ['ComfyUI', 'AI 视角', '图生图', 'Stable Diffusion'],
    accent: '#C8E8DC',
    image: '/works/perspective-cover.png',
    size: 'wide',
    blurb: '基于 ComfyUI 搭建的 视角转换工作流——将单一视角图像转换为多角度视图，实现空间视角的自由切换。',
    group: 'workflow',
    detailDesc: '利用 ComfyUI 搭建的 视角转换工作流，通过图生图方式将原始图像转换为不同视角的全新画面。工作流集成了 ControlNet 结构控制、视角提示词调度与超分辨率放大模块，实现从单一视角到多角度视图的自由切换。以下为三组视角转换案例及完整的工作流节点图。',
    detailImages: [
      { src: '/works/perspective-group-1.jpg', caption: '组图① — 视角转换效果展示' },
      { src: '/works/perspective-group-2.jpg', caption: '组图② — 视角转换效果展示' },
      { src: '/works/perspective-group-3.jpg', caption: '组图③ — 视角转换效果展示' },
      { src: '/works/perspective-workflow.png', caption: 'ComfyUI 完整工作流节点图' },
    ],
  },
  {
    id: '12',
    title: '人物艺术写真',
    category: '平面设计',
    year: '2026',
    client: '个人项目',
    tags: ['平面设计', '视觉设计', '品牌视觉', '排版设计'],
    accent: '#D4C5E8',
    image: '/works/graphic-3.png',
    size: 'wide',
    blurb: '涵盖品牌视觉、海报排版与视觉传达的平面设计作品合集——以克制的色彩与精准的版式，构建清晰而有力的视觉语言。',
    group: 'graphic',
    detailDesc: '本合集收录了近期平面设计作品，涵盖品牌视觉系统、海报设计、排版设计等方向。每件作品都追求视觉语言的精准表达，在色彩、字体与构图之间寻找平衡，以克制的设计传递有力的信息。',
    detailImages: [
      { src: '/works/graphic-3.png', caption: '作品① — 平面设计' },
      { src: '/works/graphic-4.png', caption: '作品② — 平面设计' },
      { src: '/works/graphic-6.png', caption: '作品③ — 平面设计' },
      { src: '/works/graphic-7.png', caption: '作品④ — 平面设计' },
      { src: '/works/graphic-8.png', caption: '作品⑤ — 平面设计' },
      { src: '/works/graphic-9.png', caption: '作品⑥ — 平面设计' },
      { src: '/works/graphic-10.png', caption: '作品⑦ — 平面设计' },
      { src: '/works/graphic-11.png', caption: '作品⑧ — 平面设计' },
    ],
  },
  {
    id: '13',
    title: '图像风格转绘',
    category: '平面设计 · 风格转绘',
    year: '2026-05',
    client: '个人项目',
    tags: ['平面设计', '风格转绘', '图像艺术', '艺术处理'],
    accent: '#E8D4C8',
    image: '/works/style-transfer-result-1.png',
    size: 'wide',
    blurb: '基于 AI 图像风格转绘技术，将普通照片转化为艺术绘画风格——在写实与写意之间，探索图像表达的更多可能性。',
    group: 'graphic',
    detailDesc: '本系列作品采用图像风格转绘技术，将真实照片转化为艺术绘画风格。通过对色彩、笔触与构图的重新诠释，让普通照片拥有艺术品般的质感与表现力。以下为四组转绘案例的原图与成图对比。',
    detailImages: [
      { src: '/works/style-transfer-original-1.jpg', caption: '原图① — 原始照片' },
      { src: '/works/style-transfer-result-1.png', caption: '成图① — 风格转绘效果' },
      { src: '/works/style-transfer-original-2.png', caption: '原图② — 原始照片' },
      { src: '/works/style-transfer-result-2.png', caption: '成图② — 风格转绘效果' },
      { src: '/works/style-transfer-original-3.png', caption: '原图③ — 原始照片' },
      { src: '/works/style-transfer-result-3.png', caption: '成图③ — 风格转绘效果' },
      { src: '/works/style-transfer-original-4.png', caption: '原图④ — 原始照片' },
      { src: '/works/style-transfer-result-4.png', caption: '成图④ — 风格转绘效果' },
    ],
  },
  {
    id: '25',
    title: '云朵泡泡',
    category: 'IP形象设计',
    year: '2026-07',
    client: '个人 IP',
    tags: ['IP形象设计', '角色设计', '世界观构建', '治愈系'],
    accent: '#A8C4E6',
    image: '/works/ip-poster.jpg',
    size: 'wide',
    blurb: '云朵泡泡（Cloudy Bobo）原创 IP 全案设计——以「温暖陪伴，治愈每一天」为内核，从角色设定、色彩体系、动作表情、服装换装，到云端大陆世界观与衍生周边，构建完整的治愈系 IP 视觉体系。',
    group: 'ip',
    detailSub: 'Concept — 温暖陪伴 · 治愈每一天 / 目标人群：Z 世代与年轻女性 / 调性：低饱和治愈 + 童真童话 + 萌系',
    detailPoster: '/works/ip-detail-poster.jpg',
    detailDesc: '云朵泡泡（Cloudy Bobo）原创 IP 全案设计。围绕「温暖陪伴，治愈每一天」的核心主张，从基础档案（生日 / 性格 / 角色定位 / 三视图）出发，构建完整的 IP 视觉系统：标准色卡（云雾蓝 / 星雾蓝 / 云朵白 / 雾霭蓝主色 + 7 辅助色 + 6 情绪色）、IP 设计关键词（造型 / 风格 / 色彩 / 情感 / 场景）、人物三视图（比例 / 头部 / 服饰 / 动态 / 色彩 / 材质）、动作延伸（标志性 Pose + 可延展动作）、表情包延伸（基础 + 动作 + 情绪 + 场景四大系列）、服装延伸（现有穿着 + 日常 / 礼服 / 战斗 / 睡衣 / 季节限定五套可替换皮肤 + 配饰细节）、细节展示（材质结构 / 服饰纹理 / 饰品工艺）、衍生周边（软周边 / 硬周边 / 联名盲盒 / 联名文具），再到完整的云端大陆世界观（时代设定 / 核心冲突 / 核心使命 / 故事主线 / 主要角色 / 世界观场景），最终以一张统一 IP 海报收束所有视觉资产。',
    sections: [
      {
        en: 'IP POSTER',
        title: 'IP形象海报',
        sub: 'Cloudy Bobo · 温暖陪伴，治愈每一天 — 统一的视觉符号与人物简介',
        compact: true,
        images: [
          { src: '/works/ip-detail-poster.jpg', caption: 'IP 主海报 — Cloudy Bobo · 温暖陪伴，治愈每一天' },
        ],
      },
      {
        en: 'IP CHARACTER DESIGN',
        title: 'IP形象设计',
        sub: '基础档案 / 世界观 / 人物三视图 / 标准色卡 / 细节展示 / 设计关键词 / 表情包 / 动作 / 服装 / 衍生周边',
        images: [
          { src: '/works/ip-basic-file.png', label: '01 / IP基础档案', caption: '基础档案 — 角色名 / 生日 / 性格 / 身型 / 角色定位 / 性格标签 / 三视参考' },
          { src: '/works/ip-worldview.png', label: '02 / IP世界观', caption: '世界观故事背景 — 云梦纪时代设定 / 关键概念 / 核心冲突 / 使命 / 主要角色 / 场景 / 故事主线' },
          { src: '/works/ip-three-view.png', label: '03 / IP人物三视图', caption: '人物三视图 — 正面 / 侧面 / 背面 + 头部细节 + 服饰细节 + 动态 + 比例 + 色彩 + 材质' },
          { src: '/works/ip-color-card.png', label: '04 / IP标准色卡', caption: '标准色卡 — 主色调（云雾蓝 / 星雾蓝 / 云朵白 / 暖米白 / 雾霭蓝）+ 辅助色 + 情绪色 + 比例建议' },
          { src: '/works/ip-details-showcase.png', label: '05 / IP细节展示', caption: '细节展示图 — 服饰纹理 / 材质结构 / 饰品工艺 / 特有符号 / 质感表现' },
          { src: '/works/ip-design-keywords.png', label: '06 / IP设计关键词', caption: '设计关键词 — 造型关键词 / 风格关键词 / 细节关键词 / 场景关键词 / 关键词总结' },
          { src: '/works/ip-expression-pack.png', label: '07 / IP表情包', caption: '表情包延伸专区 — 基础表情 + 动作表情 + 更多情绪 + 场景系列 + 延展建议' },
          { src: '/works/ip-action-poses.png', label: '08 / IP动作', caption: '动作延伸专区 — 标志性 Pose + 可延展动作（跑 / 跳 / 蹲 / 飞）+ 更多延展' },
          { src: '/works/ip-clothing-extensions.png', label: '09 / IP服装', caption: '服装延伸专区 — 现有穿着 + 日常 / 礼服 / 战斗 / 睡衣 / 季节限定 + 配饰细节 + 面料参考' },
          { src: '/works/ip-merch-display.png', label: '10 / IP衍生周边', caption: '衍生周边展示专区 — 软周边 / 硬周边 / 联名盲盒 / 联名文具 + 更多衍生可能' },
        ],
      },
    ],
  },
  {
    id: '14',
    title: 'Babysir 儿童平衡车',
    category: '电商设计',
    year: '2026-05',
    client: 'Babysir',
    tags: ['电商设计', 'AI 海报', '详情页', 'Banner'],
    accent: '#9CC4FF',
    image: '/works/babysir-banner.png',
    size: 'wide',
    blurb: 'Babysir 儿童平衡车电商视觉全案——以 AI 工作流完成 Banner、海报、主图与六屏详情页，构建清晰的童品爆款视觉链路。',
    group: 'ecommerce',
    detailSub: 'Concept — 从 Banner → 海报 → 主图 → 详情页，构建童品爆款的完整视觉转化链路',
    detailDesc: 'Babysir 儿童平衡车电商视觉全案。围绕"智能平衡辅助 + 稳定车身 + 夜间氛围灯"三大卖点，以蓝色科技风统一视觉语言，自上而下构建从 Banner 强引流、海报强势主推、主图清晰传递产品力，到六屏详情页解决购买顾虑的完整转化链路。所有视觉素材均基于 AI 工作流生成与合成，再以人工精修统一品牌调性。',
    sections: [
      {
        en: 'MAIN VISUAL',
        title: '产品主图',
        sub: 'Main visual — 突出产品核心卖点的视觉主推图',
        compact: true,
        images: [
          { src: '/works/babysir-main.png', caption: '产品主图 — 智能平衡辅助的体感与姿态呈现' },
        ],
      },
      {
        en: 'PRODUCT POSTER',
        title: '产品宣传海报',
        sub: 'Promotional poster — 价值主张 + 三大卖点 + 信任背书的强主推物料',
        compact: true,
        images: [
          { src: '/works/babysir-poster.png', caption: '产品宣传海报 — 科技酷炫 · 智能防摔 · 童趣护具三大卖点强主推' },
        ],
      },
      {
        en: 'STORE BANNER',
        title: '产品 Banner 图',
        sub: 'Store banner — 顶部焦点引流，强价格钩子与赠品驱动点击',
        images: [
          { src: '/works/babysir-banner.png', caption: '店铺焦点 Banner — 限时直降 100 / 到手价 ¥499' },
        ],
      },
      {
        en: 'DETAIL PAGE',
        title: '产品详情页',
        sub: 'Detail page — 长图详情，从情感共鸣到功能拆解，解决购买顾虑',
        images: [
          { src: '/works/babysir-detail-1.png', caption: '详情 ① — 价值主张与情感共鸣' },
          { src: '/works/babysir-detail-3.jpg', caption: '详情 ② — 用户痛点与产品解决方案' },
          { src: '/works/babysir-detail-4.png', caption: '详情 ③ — 智能平衡辅助系统' },
          { src: '/works/babysir-detail-5.jpg', caption: '详情 ④ — 稳定车身设计与多场景骑行' },
          { src: '/works/babysir-detail-6.jpg', caption: '详情 ⑤ — 夜间氛围灯光与高亮 LED' },
          { src: '/works/babysir-detail-7.jpg', caption: '详情 ⑥ — 防滑脚踏设计细节' },
        ],
      },
    ],
  },
  {
    id: '15',
    title: '飞鸽儿童自行车',
    category: '电商设计',
    year: '2026-06',
    client: 'PIGEON 飞鸽',
    tags: ['电商设计', 'AI 海报', '详情页', 'Banner'],
    accent: '#B564D9',
    image: '/works/pigeon-banner.png',
    size: 'wide',
    blurb: '飞鸽（PIGEON）儿童自行车电商视觉全案——以 AI 工作流完成 Banner、海报、主图与六屏详情页，围绕"轻盈骑行 · 探索无限可能"统一粉紫渐变视觉语言。',
    group: 'ecommerce',
    detailSub: 'Concept — 从 Banner → 海报 → 主图 → 详情页，构建童车爆款的完整视觉转化链路',
    detailDesc: '飞鸽（PIGEON）儿童自行车电商视觉全案。围绕"轻量高碳钢车架 · 双重碟刹 · 加宽越野胎 · 高亮大灯"四大核心卖点，以粉紫渐变统一品牌视觉，自上而下构建从 Banner 强引流（¥289 起限时抢购）、海报强势主推、主图清晰传递产品力，到六屏详情页（价值主张 → 功能亮点 → 产品参数 → 细节品质 → 用户证言 → 售后保障）解决购买顾虑的完整转化链路。所有视觉素材均基于 AI 工作流生成与合成，再以人工精修统一品牌调性。',
    sections: [
      {
        en: 'MAIN VISUAL',
        title: '产品主图',
        sub: 'Main visual — 突出产品核心卖点的视觉主推图',
        compact: true,
        images: [
          { src: '/works/pigeon-main.png', caption: '产品主图 — 轻盈骑行 · 探索无限可能' },
        ],
      },
      {
        en: 'PRODUCT POSTER',
        title: '产品宣传海报',
        sub: 'Promotional poster — 价值主张 + 四大卖点 + 信任背书的强主推物料',
        compact: true,
        images: [
          { src: '/works/pigeon-poster.png', caption: '产品宣传海报 — 6-12 岁户外越野山地车 / 双重碟刹 / 高亮大灯 / 买即送护具五件套' },
        ],
      },
      {
        en: 'STORE BANNER',
        title: '产品 Banner 图',
        sub: 'Store banner — 顶部焦点引流，强价格钩子（¥289 起）与赠品驱动点击',
        images: [
          { src: '/works/pigeon-banner.png', caption: '店铺焦点 Banner — 限时抢购 / 前 100 名送护具大礼包 / 到手价 ¥289 起' },
        ],
      },
      {
        en: 'DETAIL PAGE',
        title: '产品详情页',
        sub: 'Detail page — 六屏长图，从情感共鸣到功能拆解，解决购买顾虑',
        images: [
          { src: '/works/pigeon-detail-1.png', caption: '详情 ① — 价值主张（轻盈骑行）与四大核心卖点' },
          { src: '/works/pigeon-detail-2.png', caption: '详情 ② — 功能亮点拆解（双重碟刹 / 轻量钢架 / 加宽越野胎 / 高亮大灯）' },
          { src: '/works/pigeon-detail-3.png', caption: '详情 ③ — 产品参数与两色可选（粉紫渐变 / 星空蓝）' },
          { src: '/works/pigeon-detail-4.png', caption: '详情 ④ — 细节品质（灵敏碟刹 / 时尚烤漆 / 轻松操控 / 高亮大灯）' },
          { src: '/works/pigeon-detail-5.png', caption: '详情 ⑤ — 十万+ 真实评价与权威认证（3C / 质检 / 品牌直营）' },
          { src: '/works/pigeon-detail-6.png', caption: '详情 ⑥ — 放心购买与搭配推荐（头盔 / 收纳挂架 / 水壶）' },
        ],
      },
    ],
  },
  {
    id: '16',
    title: '沙迪克U盘',
    category: '电商设计',
    year: '2026-06',
    client: 'Sodiok 沙迪克',
    tags: ['电商设计', 'AI 海报', '详情页', 'Banner'],
    accent: '#D8A657',
    image: '/works/sodiok-banner.jpg',
    size: 'wide',
    blurb: 'Sodiok 沙迪克金属 U 盘电商视觉全案——以 AI 工作流完成 Banner、海报、主图与六屏详情页，围绕"高速稳定 · 金属质感"统一暖金视觉语言。',
    group: 'ecommerce',
    detailSub: 'Concept — 从 Banner → 海报 → 主图 → 详情页，构建数码配件爆款的完整视觉转化链路',
    detailDesc: 'Sodiok 沙迪克金属 U 盘电商视觉全案。围绕"USB3.0 高速传输 · 一体旋转金属机身 · 便携挂环 · 大容量存储"四大核心卖点，以暖金质感统一品牌视觉，自上而下构建从 Banner 强引流（¥59.9 限时特惠）、海报强势主推、主图清晰传递产品力，到六屏详情页（价值主张 → 功能拆解 → 传输性能 → 多系统兼容 → 多场景随身 → 产品参数）解决购买顾虑的完整转化链路。所有视觉素材均基于 AI 工作流生成与合成，再以人工精修统一品牌调性。',
    sections: [
      {
        en: 'MAIN VISUAL',
        title: '产品主图',
        sub: 'Main visual — 突出产品核心卖点的视觉主推图',
        compact: true,
        images: [
          { src: '/works/sodiok-main.png', caption: '产品主图 — 高速稳定 · 金属质感随身存储' },
        ],
      },
      {
        en: 'PRODUCT POSTER',
        title: '产品宣传海报',
        sub: 'Promotional poster — 价值主张 + 四大卖点 + 信任背书的强主推物料',
        compact: true,
        images: [
          { src: '/works/sodiok-poster.png', caption: '产品宣传海报 — 高速金属 U 盘 / 一体旋转机身 / ¥59.9 限时特惠' },
        ],
      },
      {
        en: 'STORE BANNER',
        title: '产品 Banner 图',
        sub: 'Store banner — 顶部焦点引流，强价格钩子（¥59.9）与赠品驱动点击',
        images: [
          { src: '/works/sodiok-banner.jpg', caption: '店铺焦点 Banner — 限时特惠 / 高速金属 U 盘 / 到手价 ¥59.9' },
        ],
      },
      {
        en: 'DETAIL PAGE',
        title: '产品详情页',
        sub: 'Detail page — 六屏长图，从情感共鸣到功能拆解，解决购买顾虑',
        images: [
          { src: '/works/sodiok-detail-1.png', caption: '详情 ① — 价值主张（高速稳定存储）与四大核心卖点' },
          { src: '/works/sodiok-detail-2.png', caption: '详情 ② — 功能拆解（全合金磨砂 / 360° 旋转翻盖 / 一体挂链 / 迷你轻薄）' },
          { src: '/works/sodiok-detail-3.png', caption: '详情 ③ — 传输性能（USB3.0 / 150MB·s / 5 倍速）' },
          { src: '/works/sodiok-detail-4.png', caption: '详情 ④ — 多系统兼容（Windows / macOS / 安卓 / 车载 / 台式）' },
          { src: '/works/sodiok-detail-5.png', caption: '详情 ⑤ — 多场景随身（办公 / 居家学习 / 车载 / 户外）' },
          { src: '/works/sodiok-detail-6.png', caption: '详情 ⑥ — 产品参数与全面了解' },
        ],
      },
    ],
  },
  {
    id: '17',
    title: '飞鸽儿童自行车',
    category: 'TVC广告',
    year: '2026-06',
    client: 'PIGEON 飞鸽',
    tags: ['TVC广告', '故事板', '运动拍摄', '品牌宣传'],
    accent: '#B564D9',
    image: '/works/pigeon-tvc-cover.jpg',
    size: 'wide',
    blurb: '飞鸽（PIGEON）儿童自行车 TVC 商业广告——30 秒品牌宣传片《好搭档，就该能闯能停》，从故事板 → 实拍分镜 → 后期合成，构建电影感童车品牌片。',
    group: 'tvc',
    detailVideo: '/works/pigeon-tvc.mp4',
    videoPoster: '/works/pigeon-video-poster.png',
    detailSub: 'Concept — 电影质感 + 运动感 + 治愈系 + 成长故事 / 目标人群：7-12 岁儿童及其家长',
    detailDesc: '飞鸽（PIGEON）儿童自行车 TVC 商业广告。以「好搭档，就该能闯能停」为核心创意，30 秒成片分三段情绪递进：自然主义镜语（0–20s 无空白建立童趣治愈感）→ 硬核亮相（20–28s 突出双碟刹 / 越野胎 / 高碳钢车架 / 高亮大灯的产品力）→ 温情全收（28–30s「懂孩子的自行车，懂爸妈的安心」收束品牌主张）。整体基于前期完整故事板（角色 / 场景 / 光线 / 镜头运动 / 情绪关键词 / 音频设计）拆解分镜，再以 AI 工作流生成与合成关键镜头，最后由实拍与后期统一调性。',
    sections: [
      {
        en: 'STORYBOARD',
        title: '故事板',
        sub: 'Storyboard — 8 分镜 / 30 秒成片 / 镜头运动 + 实景描述 + 情绪递进',
        images: [
          { src: '/works/pigeon-storyboard.png', caption: '完整故事板 — 角色风格参考 / 场景与机位设计 / 光线氛围 / 音频设计 / 摄影制作笔记' },
        ],
      },
    ],
  },
  {
    id: '18',
    title: 'Babysir 儿童平衡车',
    category: 'TVC广告',
    year: '2026-05',
    client: 'Babysir',
    tags: ['TVC广告', '故事板', '亲子成长', '品牌宣传'],
    accent: '#9CC4FF',
    image: '/works/babysir-tvc-cover.jpg',
    size: 'wide',
    blurb: 'Babysir 儿童平衡车 30 秒 TVC 商业广告《守护每一位自由勇敢的成长时光》——以 8 个分镜的镜头语言，从童年孤独 → 母亲期盼 → 与平衡车的相遇相知，呈现电影感治愈亲子片。',
    group: 'tvc',
    detailVideo: '/works/babysir-tvc.mp4',
    videoPoster: '/works/babysir-video-poster.jpg',
    detailSub: 'Concept — 电影质感 + 治愈系 + 高端简约 + 亲子温情 / 目标人群：3–8 岁儿童及其家长',
    detailDesc: 'Babysir 儿童平衡车 30 秒 TVC 商业广告。以「守护每一位自由勇敢的成长时光」为核心主张，30 秒成片分三段情绪递进：童年孤独（0–12s 男孩独自涂写 / 远望 / 母亲温柔顾虑 / 公园独处的落寞）→ 与平衡车的相遇（16–24s 成长的期许 + 灵光登场 + 自在迎风的骑行）→ 成长定格（28–30s「自信放胆·小孩轻顺利」收束品牌）。8 个分镜分别覆盖近景俯视 / 主视仰写 / 侧脸特写 / 大远景抬头 / 微距慢动作 / 跟拍低机位 / 环境静物等机位语言，配以「轻柔钢琴弦音 → 原声 → 轻快明快 → 激昂」的音频曲线，整体调性高端简约、治愈温暖、亲子共情。',
    sections: [
      {
        en: 'STORYBOARD',
        title: '故事板',
        sub: 'Storyboard — 8 分镜 / 角色造型 / 场景机位 / 光线氛围 / 音频设计 / 摄影制作笔记',
        images: [
          { src: '/works/babysir-storyboard.png', caption: '完整故事板 — 8 个分镜 / 风格参考 / 场景与机位 / 8 种镜头运动 / 情绪关键词 / 音频设计 / 摄影制作笔记' },
        ],
      },
    ],
  },
  {
    id: '27',
    title: '沙迪克U盘',
    category: 'TVC广告',
    year: '2026-05',
    client: 'Sodiok 沙迪克',
    tags: ['TVC广告', '故事板', '产品展示', '数码科技'],
    accent: '#D8A657',
    image: '/works/sodiok-tvc-cover.png',
    size: 'wide',
    blurb: 'Sodiok 沙迪克金属 U 盘 TVC 商业广告——以「高速传输 · 金属质感 · 一体旋转」为核心卖点，构建数码科技感品牌宣传片。',
    group: 'tvc',
    detailVideo: '/works/sodiok-tvc.mp4',
    videoPoster: '/works/sodiok-tvc-poster.png',
    detailSub: 'Concept — 科技质感 + 高速动感 + 金属冷调 + 产品力硬核展示 / 目标人群：数码爱好者与办公人群',
    detailDesc: 'Sodiok 沙迪克金属 U 盘 TVC 商业广告。以「高速传输，不止于快」为核心创意，30 秒成片分三段节奏递进：科技感开场（0–10s 金属质感特写 + 数据流光效 + 高速传输的视觉冲击）→ 产品力硬核展示（10–25s USB3.0 高速读写 + 一体旋转金属机身 + 便携挂环设计 + 多场景适用）→ 品牌收束（25–30s「Sodiok — 让数据更有质感」品牌主张定格）。整体基于前期故事板拆解分镜，以 AI 工作流生成科技感视觉素材，配合动态图形与数据可视化，呈现高端数码产品的科技调性与品质感。',
    sections: [
      {
        en: 'STORYBOARD',
        title: '故事板',
        sub: 'Storyboard — 产品特写 / 数据可视化 / 场景应用 / 镜头运动 + 光线氛围 + 音频设计',
        images: [
          { src: '/works/sodiok-storyboard.png', caption: '完整故事板 — 产品多角度特写 / 数据传输可视化 / 办公·车载·多场景应用 / 镜头运动 / 光线氛围 / 音频设计' },
        ],
      },
    ],
  },
  {
    id: '19',
    title: '充电宝',
    category: '电商信息流',
    year: '2026-04',
    client: '充电宝',
    tags: ['电商信息流', '短视频', '信息流广告', '种草'],
    accent: '#F2A93B',
    image: '/works/charger-cover.png',
    size: 'wide',
    blurb: '充电宝电商信息流短视频——以「轻巧便携 · 超大容量 · 快充不发烫」为核心卖点，打造适合抖音/小红书信息流的强种草短视频，3 秒抓注意力、15 秒讲清价值。',
    group: 'feed',
    detailVideo: '/works/charger-video.mp4',
    detailSub: 'Concept — 信息流短视频 / 3 秒钩子 + 痛点共鸣 + 卖点快切 + 行动召唤 / 适配抖音·小红书·视频号',
    detailDesc: '充电宝电商信息流短视频。围绕「轻巧便携 · 20000mAh 超大容量 · 22.5W 双向快充 · 低温不发烫」四大核心卖点，以信息流短视频的节奏逻辑展开：前 3 秒用强钩子（电量焦虑 / 出门没电的尴尬）抓住注意力，中段痛点共鸣 + 卖点快切（容量 / 快充 / 便携 / 安全），后段信任背书 + 行动召唤（限时折扣 / 点击购买）。整体视觉明快、节奏紧凑、字幕醒目，适配抖音 / 小红书 / 视频号等多平台信息流投放。',
    sections: [],
  },
  {
    id: '20',
    title: '美的冰箱',
    category: '电商信息流',
    year: '2026-04',
    client: 'Midea 美的',
    tags: ['电商信息流', '短视频', '信息流广告', '家电种草'],
    accent: '#2E7DD1',
    image: '/works/midea-cover.png',
    size: 'wide',
    blurb: '美的冰箱电商信息流短视频——以「超大容量 · 风冷无霜 · 净味保鲜 · 一级能效」为核心卖点，打造适合抖音/小红书信息流的强种草短视频，3 秒抓注意力、15 秒讲清价值。',
    group: 'feed',
    detailVideo: '/works/midea-video.mp4',
    detailSub: 'Concept — 信息流短视频 / 3 秒钩子 + 痛点共鸣 + 卖点快切 + 行动召唤 / 适配抖音·小红书·视频号',
    detailDesc: '美的冰箱电商信息流短视频。围绕「超大容量囤鲜 · 风冷无霜不结霜 · PST+ 净味保鲜 · 一级能效省电」四大核心卖点，以信息流短视频的节奏逻辑展开：前 3 秒用强钩子（食材串味 / 结霜难清理的烦恼）抓住注意力，中段痛点共鸣 + 卖点快切（容量 / 无霜 / 净味 / 节能），后段信任背书 + 行动召唤（限时折扣 / 点击购买）。整体视觉清爽、节奏紧凑、字幕醒目，适配抖音 / 小红书 / 视频号等多平台信息流投放。',
    sections: [],
  },
  {
    id: '21',
    title: '去味喷雾',
    category: '电商信息流',
    year: '2026-05',
    client: '去味喷雾',
    tags: ['电商信息流', '短视频', '信息流广告', '居家种草'],
    accent: '#4CB08B',
    image: '/works/spray-cover.png',
    size: 'wide',
    blurb: '去味喷雾电商信息流短视频——以「一喷即净 · 母婴级安全 · 长效留香 · 多场景适用」为核心卖点，打造适合抖音/小红书信息流的强种草短视频，3 秒抓注意力、15 秒讲清价值。',
    group: 'feed',
    detailVideo: '/works/spray-video.mp4',
    detailSub: 'Concept — 信息流短视频 / 3 秒钩子 + 痛点共鸣 + 卖点快切 + 行动召唤 / 适配抖音·小红书·视频号',
    detailDesc: '去味喷雾电商信息流短视频。围绕「一喷即净除味 · 母婴级安全配方 · 长效清新留香 · 多场景随手喷（鞋柜 / 卫生间 / 车内 / 宠物窝）」四大核心卖点，以信息流短视频的节奏逻辑展开：前 3 秒用强钩子（异味尴尬 / 密闭空间闷臭的烦恼）抓住注意力，中段痛点共鸣 + 卖点快切（除味力 / 安全性 / 留香 / 便携），后段信任背书 + 行动召唤（限时折扣 / 点击购买）。整体视觉清新、节奏紧凑、字幕醒目，适配抖音 / 小红书 / 视频号等多平台信息流投放。',
    sections: [],
  },
  {
    id: '22',
    title: '杨子吸尘器',
    category: '电商信息流',
    year: '2026-05',
    client: 'YANGZI 杨子',
    tags: ['电商信息流', '短视频', '信息流广告', '家电种草'],
    accent: '#3A8FD4',
    image: '/works/vacuum-cover.png',
    size: 'wide',
    blurb: '杨子吸尘器电商信息流短视频——以「大吸力 · 无线轻便 · 多刷头适用 · 长续航」为核心卖点，打造适合抖音/小红书信息流的强种草短视频，3 秒抓注意力、15 秒讲清价值。',
    group: 'feed',
    detailVideo: '/works/vacuum-video.mp4',
    detailSub: 'Concept — 信息流短视频 / 3 秒钩子 + 痛点共鸣 + 卖点快切 + 行动召唤 / 适配抖音·小红书·视频号',
    detailDesc: '杨子吸尘器电商信息流短视频。围绕「大吸力深层除尘 · 无线手持轻便 · 多刷头全屋适用（地板 / 沙发 / 车载 / 键盘）· 长续航不中断」四大核心卖点，以信息流短视频的节奏逻辑展开：前 3 秒用强钩子（灰尘毛发难清理 / 有线束缚的烦恼）抓住注意力，中段痛点共鸣 + 卖点快切（吸力 / 轻便 / 多场景 / 续航），后段信任背书 + 行动召唤（限时折扣 / 点击购买）。整体视觉清爽、节奏紧凑、字幕醒目，适配抖音 / 小红书 / 视频号等多平台信息流投放。',
    sections: [],
  },
  {
    id: '23',
    title: '泡澡桶',
    category: '电商信息流',
    year: '2026-06',
    client: '泡澡桶',
    tags: ['电商信息流', '短视频', '信息流广告', '居家种草'],
    accent: '#7C6FD4',
    image: '/works/bathtub-cover.png',
    size: 'wide',
    blurb: '泡澡桶电商信息流短视频——以「折叠省空间 · 恒温保暖 · 加厚耐用 · 全家适用」为核心卖点，打造适合抖音/小红书信息流的强种草短视频，3 秒抓注意力、15 秒讲清价值。',
    group: 'feed',
    detailVideo: '/works/bathtub-video.mp4',
    detailSub: 'Concept — 信息流短视频 / 3 秒钩子 + 痛点共鸣 + 卖点快切 + 行动召唤 / 适配抖音·小红书·视频号',
    detailDesc: '泡澡桶电商信息流短视频。围绕「可折叠省空间收纳 · 恒温保暖锁温 · 加厚材质结实耐用 · 全家老少适用（成人泡浴 / 宝宝戏水）」四大核心卖点，以信息流短视频的节奏逻辑展开：前 3 秒用强钩子（浴室太小没地方泡 / 普通盆散热快的烦恼）抓住注意力，中段痛点共鸣 + 卖点快切（折叠 / 保暖 / 耐用 / 多人群），后段信任背书 + 行动召唤（限时折扣 / 点击购买）。整体视觉治愈、节奏紧凑、字幕醒目，适配抖音 / 小红书 / 视频号等多平台信息流投放。',
    sections: [],
  },
  {
    id: '24',
    title: '牛肉饼',
    category: '电商信息流',
    year: '2026-06',
    client: '牛肉饼',
    tags: ['电商信息流', '短视频', '信息流广告', '美食种草'],
    accent: '#C9642E',
    image: '/works/beef-cover.png',
    size: 'wide',
    blurb: '牛肉饼电商信息流短视频——以「真材实料 · 鲜嫩多汁 · 方便快捷 · 健康低脂」为核心卖点，打造适合抖音/小红书信息流的强种草短视频，3 秒抓注意力、15 秒讲清价值。',
    group: 'feed',
    detailVideo: '/works/beef-video.mp4',
    detailSub: 'Concept — 信息流短视频 / 3 秒钩子 + 痛点共鸣 + 卖点快切 + 行动召唤 / 适配抖音·小红书·视频号',
    detailDesc: '牛肉饼电商信息流短视频。围绕「真牛肉现做真材实料 · 鲜嫩多汁一口爆香 · 免揉免醒方便快捷 · 高蛋白低脂轻负担」四大核心卖点，以信息流短视频的节奏逻辑展开：前 3 秒用强钩子（早餐没时间 / 外卖不健康吃腻了的烦恼）抓住注意力，中段痛点共鸣 + 卖点快切（用料 / 口感 / 便捷 / 健康），后段信任背书 + 行动召唤（限时折扣 / 点击购买）。整体视觉诱人、节奏紧凑、字幕醒目，适配抖音 / 小红书 / 视频号等多平台信息流投放。',
    sections: [],
  },
  {
    id: '26',
    title: '冰喵汐',
    category: 'IP形象设计',
    year: '2026-07',
    client: '个人 IP',
    tags: ['IP形象设计', '角色设计', '世界观构建', '治愈系', '冰雪主题'],
    accent: '#9CC4E8',
    image: '/works/bm-poster.jpg',
    size: 'wide',
    blurb: '冰喵汐（Bing Miao Xi）原创 IP 全案设计——以「冰原温柔，喵汐相伴」为内核，构建来自冰原深处的猫耳精灵视觉体系：治愈系角色定位、完整三视图与动作体系、冰雪色卡与设计关键词、多套可替换服装，以及完整的世界观故事背景与衍生周边。',
    group: 'ip',
    detailSub: 'Concept — 冰原温柔 · 喵汐相伴 / 治愈系猫耳精灵 / 目标人群：Z 世代与年轻女性 / 调性：冰雪治愈 + 梦幻守护 + 魔法冰雪',
    detailPoster: '/works/bm-detail-poster.jpg',
    detailDesc: '冰喵汐（Bing Miao Xi）原创 IP 全案设计。围绕「冰原温柔 · 喵汐相伴 · 把冰原的柔软藏进每一段温柔时光里」的核心主张，从基础档案（角色定位 / 三视图 / 性格标签 / 技能设定 / 外观特征）出发，构建完整的 IP 视觉系统：世界观故事背景（时代设定 / 核心冲突 / 核心使命 / 主要角色 / 故事线 / 象征元素 / 世界关键词）、人物三视图专区（正面 / 侧面 / 背面 + 基础档案 + Q 版比例）、标准色卡（主色 + 辅助色 + 情绪色 + 渐变色）、细节展示（服饰纹理 / 特有符号 / 质感表现 / 细节放大）、设计关键词（造型 / 风格 / 色彩 / 细节 / 气质）、表情包延伸（基础表情 + 动作表情结合）、动作延伸（标志性 Pose + 可延展动作 + 动作延展小贴士）、服装延伸（日常 / 礼服 / 战斗 / 睡衣 / 节日限定 + 配饰 + 面料图案），再到衍生周边展示（软周边 / 硬周边 / 联名向 / 更多周边），最终以一张统一 IP 海报收束所有视觉资产。',
    sections: [
      {
        en: 'IP POSTER',
        title: 'IP形象海报',
        sub: 'Bing Miao Xi · 冰原温柔，喵汐相伴 — 统一的视觉符号与人物简介',
        compact: true,
        images: [
          { src: '/works/bm-detail-poster.jpg', caption: 'IP 主海报 — Bing Miao Xi · 冰原温柔，喵汐相伴' },
        ],
      },
      {
        en: 'IP CHARACTER DESIGN',
        title: 'IP形象设计',
        sub: '基础档案 / 世界观 / 人物三视图 / 标准色卡 / 细节展示 / 设计关键词 / 表情包 / 动作 / 服装 / 衍生周边',
        images: [
          { src: '/works/bm-01-basic.jpg', label: '01 / IP基础档案', caption: '基础档案 — 角色定位 / 三视图 / 性格标签 / 技能设定 / 外观特征 / 可延展设定' },
          { src: '/works/bm-02-worldview.jpg', label: '02 / IP世界观', caption: '世界观故事背景 — 时代设定 / 核心冲突 / 核心使命 / 故事线 / 象征元素 / 世界关键词' },
          { src: '/works/bm-03-three-view.jpg', label: '03 / IP人物三视图', caption: '人物三视图专区 — 正面 / 侧面 / 背面 + 基础档案 + Q 版二头身比例' },
          { src: '/works/bm-04-color-card.jpg', label: '04 / IP标准色卡', caption: '标准色卡 — 主色调（冰晶蓝 / 雾霜白 / 薄霜青 / 雾灰蓝 / 深海蓝）+ 辅助色 + 情绪色 + 渐变色搭配' },
          { src: '/works/bm-05-details.jpg', label: '05 / IP细节展示', caption: '细节展示 — 服饰纹理 / 特有符号 / 质感表现 / 细节放大展示' },
          { src: '/works/bm-06-keywords.jpg', label: '06 / IP设计关键词', caption: '设计关键词 — 造型关键词 / 风格关键词 / 色彩关键词 / 细节关键词 / 气质关键词' },
          { src: '/works/bm-07-expression.jpg', label: '07 / IP表情包', caption: '表情包延伸专区 — 基础表情 + 动作表情结合（开心笑 / 委屈哭 / 惊讶 / 无语汗颜 / 开心转圈圈 / 委屈对手指等）' },
          { src: '/works/bm-08-actions.jpg', label: '08 / IP动作', caption: '动作延伸专区 — 标志性 Pose + 可延展动作（跑 / 跳 / 蹲坐 / 飞行）+ 动作延展小贴士' },
          { src: '/works/bm-09-clothing.jpg', label: '09 / IP服装', caption: '服装延伸专区 — 现有穿着 + 日常套装 / 礼服 / 战斗 / 睡衣 / 节日限定 + 配饰延伸 + 面料图案' },
          { src: '/works/bm-10-merch.jpg', label: '10 / IP衍生周边', caption: '衍生周边展示专区 — 软周边（毛绒公仔 / 抱枕 / 钥匙扣）/ 硬周边（手办 / 徽章 / 手机壳）/ 联名向（盲盒 / 文具 / 礼盒）/ 更多延伸' },
        ],
      },
    ],
  },
]

export type Capability = {
  no: string
  icon: string
  title: string
  desc: string
  tags: string[]
}

export const capabilities: Capability[] = [
  {
    no: '01',
    icon: '/skills/photoshop.svg',
    title: 'Photoshop',
    desc: '擅长 PS 图像处理以及图形的创作；对已有的位图图像进行编辑加工处理，以及运用一些特殊效果。',
    tags: ['PS', '图像处理', '图形创作', '特效'],
  },
  {
    no: '02',
    icon: '/skills/stable-diffusion.svg',
    title: 'Stable Diffusion',
    desc: '精通 WebUI、ComfyUI、LibTV，运用 ControlNet 精准控制：姿势、深度、线条、人体姿态等固定构图，及控制 LoRA 风格权重的精细调节。',
    tags: ['Stable Diffusion', 'WebUI', 'ComfyUI', 'ControlNet', 'LoRA'],
  },
  {
    no: '03',
    icon: '/skills/midjourney.svg',
    title: 'Midjourney',
    desc: '精通 MJ 线上主流的 AI 绘画工具，依托 Discord 社群运行。按照自己想法创作有创意和视觉吸引力的图片。',
    tags: ['Midjourney', 'AI 绘画', 'Discord'],
  },
  {
    no: '04',
    icon: '/skills/premiere.svg',
    title: 'Premiere Pro',
    desc: '熟练掌握 PR 剪辑工具，多轨道编辑、特效字幕，同步音频，将素材变为精美影片和视频。',
    tags: ['PR', '视频剪辑', '特效字幕', '音频同步'],
  },
  {
    no: '05',
    icon: '/skills/gpt.svg',
    title: 'GPT',
    desc: '擅长使用 GPT，以对话为基础，进行写作、翻译、编程、识图、联网、逻辑规划。',
    tags: ['GPT', '写作', '翻译', '编程', '识图'],
  },
  {
    no: '06',
    icon: '/skills/liblibai.svg',
    title: 'LibLibAI',
    desc: '熟练使用 LibLibAI 等，国内最大 SD 模型社区，能快速出图与创作者自定义训练、批量生产。',
    tags: ['LibLibAI', 'SD 模型', '批量生产', '自定义训练'],
  },
  {
    no: '07',
    icon: '/skills/suno.svg',
    title: 'Suno',
    desc: '掌握 Suno 等，一站式 AI 全流程歌曲创作工具，可以从文字直接生成完整成品乐曲，并进行后期拆解编辑。',
    tags: ['Suno', 'AI 音乐', '歌曲创作', '后期编辑'],
  },
  {
    no: '08',
    icon: '/skills/deepseek.svg',
    title: 'DeepSeek',
    desc: '熟练运用 DeepSeek 国产高性能通用大模型，并以个人对话的形式，进行创作与私有化开发。',
    tags: ['DeepSeek', '大模型', '私有化开发'],
  },
]

export const marqueeWords: { label: string; href: string }[] = [
  { label: '工作流', href: '#group-workflow' },
  { label: '平面设计', href: '#group-graphic' },
  { label: 'IP形象设计', href: '#group-ip' },
  { label: '电商设计', href: '#group-ecommerce' },
  { label: 'TVC广告', href: '#group-tvc' },
  { label: '电商信息流', href: '#group-feed' },
]

// ─────────────────────────────────────────────────────────────
//  简历模块
// ─────────────────────────────────────────────────────────────

export type ResumeItem = {
  year: string
  title: string
  org: string
  desc: string
}

export type ResumeGroup = {
  category: string
  items: ResumeItem[]
}

export const resumeGroups: ResumeGroup[] = [
  {
    category: '工作经历',
    items: [
      {
        year: '2023 — 至今',
        title: '独立设计师',
        org: '自由职业 · 深圳',
        desc: '为初创公司与全球品牌提供品牌识别、视觉系统与 AI 设计工作流咨询，主导从策略到落地的全链路设计。',
      },
      {
        year: '2020 — 2023',
        title: '资深视觉设计师',
        org: '某头部互联网公司',
        desc: '负责核心产品的视觉体系搭建与迭代，带领 4 人设计小组完成多次大型改版与品牌战役。',
      },
      {
        year: '2017 — 2020',
        title: '视觉设计师',
        org: '某创意机构',
        desc: '参与品牌识别、包装、编辑设计等多类型项目，积累了从概念到印刷全流程的实战经验。',
      },
    ],
  },
  {
    category: '教育背景',
    items: [
      {
        year: '2013 — 2017',
        title: '视觉传达设计 · 学士',
        org: '某美术学院',
        desc: '系统学习平面设计、字体设计、品牌策略与艺术指导，毕业作品获优秀毕业设计奖。',
      },
    ],
  },
  {
    category: '荣誉与认证',
    items: [
      {
        year: '2025',
        title: 'AIGC 设计创新奖',
        org: '设计行业评选',
        desc: '因在 AI 辅助品牌设计领域的探索与实践获此殊荣。',
      },
      {
        year: '2023',
        title: '年度品牌设计奖',
        org: '设计周',
        desc: '主导的品牌识别项目入围并获年度品牌设计奖。',
      },
      {
        year: '2021',
        title: 'UI/UX 设计卓越奖',
        org: '互联网设计大会',
        desc: '产品视觉体系获评审团认可，获 UI/UX 设计卓越奖。',
      },
    ],
  },
]
