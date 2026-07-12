export const releaseStatus = {
  label: 'macOS 版即将发布',
  notice: 'BinBotEditor 正在为首次发布做准备，正式版本上线后即可在这里下载。',
  available: false,
} as const

export const navigationItems = [
  { label: '功能', href: '#features' },
  { label: '格式化', href: '#formatting' },
  { label: '隐私', href: '#privacy' },
  { label: '常见问题', href: '#faq' },
] as const

export const faqItems = [
  {
    id: 'platforms',
    question: 'BinBotEditor 支持哪些平台？',
    answer: '首版专注于 macOS。',
  },
  {
    id: 'release-date',
    question: '什么时候可以下载？',
    answer: '首个公开版本正在准备中，发布日期尚未公布。',
  },
  {
    id: 'local-files',
    question: '代码会上传到云端吗？',
    answer: '不会。BinBotEditor 以本地工作流为核心，你的文件留在自己的 Mac。',
  },
  {
    id: 'formatting',
    question: '格式化需要额外安装工具吗？',
    answer: '不需要。支持语言的格式化能力随应用离线提供。',
  },
] as const
