export interface CapabilityChapter {
  id: 'languages' | 'formatters' | 'markdown' | 'json'
  index: string
  eyebrow: string
  title: string
  description: string
  metric: string
}

export interface WorkflowItem {
  id: 'search' | 'tabs' | 'session'
  index: string
  title: string
  description: string
}

export const releaseStatus = {
  label: '下载 macOS 正式版',
  notice: 'v0.2.1 适用于 Apple Silicon，当前版本未经 Apple 公证；首次启动时可能需要在“隐私与安全性”中确认打开。',
  available: true,
  downloadUrl: 'https://github.com/miyakowork/BinBotEditorOfficialPage/releases/download/v0.2.1/BinBotEditor-0.2.1-macOS-arm64.dmg',
} as const

export const navigationItems = [
  { label: '产品能力', href: '#capabilities' },
  { label: '工作流', href: '#workflow' },
  { label: '为 Mac 而生', href: '#mac' },
  { label: '下载', href: '#release' },
] as const

export const supportedLanguages = [
  'JavaScript', 'TypeScript', 'JSON', 'Python', 'Java', 'Markdown', 'HTML',
  'CSS', 'SCSS', 'Less', 'C', 'C++', 'Rust', 'PHP', 'SQL', 'XML', 'YAML',
  'Shell', 'Zsh', 'Fish', 'Makefile', 'Go', 'Ruby', 'Swift', 'Kotlin', 'TOML',
  'Properties', 'Nginx', 'Dockerfile', 'Diff', 'Plain Text',
] as const

export const offlineFormatters = [
  'JavaScript', 'TypeScript', 'JSON', 'CSS', 'SCSS', 'HTML', 'Markdown',
  'YAML', 'Shell', 'Dockerfile', 'Java', 'PHP', 'Python', 'Kotlin',
] as const

export const capabilityChapters: readonly CapabilityChapter[] = [
  {
    id: 'languages', index: '01', eyebrow: '打开即懂',
    title: '30+ 种语言，打开即懂。',
    description: '从 TypeScript、Python 到 Kotlin、Dockerfile 与 Markdown，文件打开时即可获得准确的语法识别与高亮。',
    metric: '30+',
  },
  {
    id: 'formatters', index: '02', eyebrow: '格式化不出本机',
    title: '14 种格式化，全部离线。',
    description: 'Prettier、Ruff 与 ktfmt 等格式化引擎随应用提供，常用语言无需安装外部命令，也不依赖网络。',
    metric: '14',
  },
  {
    id: 'markdown', index: '03', eyebrow: 'Markdown 工作流',
    title: '写作与预览，不必来回切换。',
    description: '实时预览、文档大纲、GFM 和代码块高亮，让技术文档与代码处于同一工作区。',
    metric: 'MD',
  },
  {
    id: 'json', index: '04', eyebrow: 'JSON 工具箱',
    title: 'JSON 不只是纯文本。',
    description: '格式化、深度解析、折叠与展开、转义与反转义、压缩复制集中完成。',
    metric: '{}',
  },
]

export const workflowItems: readonly WorkflowItem[] = [
  { id: 'search', index: '01', title: '跨项目搜索', description: '按文件分组结果，并可区分大小写，快速回到需要修改的位置。' },
  { id: 'tabs', index: '02', title: '文件树与多标签', description: '路径、打开状态与编辑上下文始终保持清楚。' },
  { id: 'session', index: '03', title: '自动保存与会话恢复', description: '离开后再次打开，优先恢复当前文件，其余标签按需加载。' },
]

export const faqItems = [
  {
    id: 'platforms',
    question: 'BinBotEditor 支持哪些平台？',
    answer: 'v0.2.1 适用于搭载 Apple Silicon 的 Mac。',
  },
  {
    id: 'release-date',
    question: '什么时候可以下载？',
    answer: 'v0.2.1 已开放下载，当前提供 macOS Apple Silicon 正式版。',
  },
  {
    id: 'local-files',
    question: '代码会上传到云端吗？',
    answer: '核心编辑和格式化无需云端；可选智能功能仅在启用时参与工作流。',
  },
  {
    id: 'formatting',
    question: '格式化需要额外安装工具吗？',
    answer: '不需要。支持语言的格式化能力随应用离线提供。',
  },
] as const
