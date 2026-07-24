export interface CapabilityChapter {
  id: 'languages' | 'formatters' | 'markdown' | 'json' | 'tools'
  index: string
  eyebrow: string
  title: string
  description: string
  metric: string
}

export interface ReleaseEntry {
  version: string
  date: string
  latest: boolean
  summary: string
  highlights: readonly string[]
}

export interface WorkflowItem {
  id: 'search' | 'tabs' | 'session'
  index: string
  title: string
  description: string
}

export const releaseStatus = {
  label: '下载 macOS 正式版',
  notice: 'v0.9.0 适用于 Apple Silicon，当前版本未经 Apple 公证；首次启动时可能需要在“隐私与安全性”中确认打开。',
  available: true,
  downloadUrl: 'https://github.com/miyakowork/BinBotEditorOfficialPage/releases/download/v0.9.0/BinBotEditor-0.9.0-macOS-arm64.dmg',
} as const

export const navigationItems = [
  { label: '产品能力', href: '#capabilities' },
  { label: '工作流', href: '#workflow' },
  { label: '为 Mac 而生', href: '#mac' },
  { label: '版本更新', href: '#updates' },
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
  {
    id: 'tools', index: '05', eyebrow: '本地常用工具',
    title: '转换与解析，随手即用。',
    description: 'AI 翻译复用当前服务商与模型，API Key 由本机加密保险库管理；时间和 cURL 工具仍完全本地处理。文件输入不落盘，翻译前会明确提示联网处理。',
    metric: 'AI+',
  },
]

export const releaseHistory: readonly ReleaseEntry[] = [
  {
    version: 'v0.9.0',
    date: '2026-07-24',
    latest: true,
    summary: '让 AI 翻译、文件夹打开和工作区切换真正融入编辑器。',
    highlights: [
      '翻译改用当前 AI 服务商与模型，支持 20 种常用语言；使用前需配置并验证自己的 API Key，凭据由本机加密保险库管理。',
      'macOS 现在可将 BinBotEditor 识别为能够打开文件夹的应用，外部文件夹会直接作为文件工作区打开。',
      '文件与工具工作区切换移动到顶部工具栏，两个工作区的 Tab 继续保持独立。',
    ],
  },
  {
    version: 'v0.8.0',
    date: '2026-07-24',
    latest: false,
    summary: '新增 Apple 本机翻译，并让文件与工具工作区各自独立。',
    highlights: [
      '新增 Apple Translation 本机翻译工具，支持 macOS 15+；语言模型由系统按需管理，原文与译文仅保留在内存中。',
      '文件 Tab 与工具 Tab 分为两个独立工作区，分别维护当前标签与拖动顺序。',
      '时间工具新增今天、昨天等常用时间边界快捷操作。',
    ],
  },
  {
    version: 'v0.7.2',
    date: '2026-07-24',
    latest: false,
    summary: '让标签页拖动在 macOS 上真正可靠，并补齐 cURL 输入区的亮色主题。',
    highlights: [
      '标签页拖动改用适配 WKWebView 的 Pointer Events，拖放后顺序稳定生效。',
      '拖动只调整标签页顺序，当前激活的标签页保持不变。',
      'cURL Command Deck 输入区域完整适配亮色与暗色主题。',
    ],
  },
  {
    version: 'v0.7.1',
    date: '2026-07-23',
    latest: false,
    summary: '修复标签页拖动排序，让内部拖动与文件拖放各司其职。',
    highlights: [
      '修复标签页拖动后顺序未变化的问题。',
      '全局文件拖放只处理真实文件，不再拦截内部标签页拖动排序。',
      '拖动只调整标签页顺序，不会切换当前激活的标签页。',
    ],
  },
  {
    version: 'v0.7.0',
    date: '2026-07-22',
    latest: false,
    summary: '让时间与 cURL 解析结果更清晰，也更适合处理长内容。',
    highlights: [
      '时间工具新增明确的“格式化时间”结果，采用 yyyy-MM-dd HH:mm:ss 格式。',
      'cURL 页面改为全宽命令输入与结构化结果工作台。',
      'Query、Headers 与 Body 使用分区切换，长请求不再挤在左右分栏。',
      'JSON 请求体自动格式化与语法高亮，非 JSON 内容保留原文。',
    ],
  },
  {
    version: 'v0.6.1',
    date: '2026-07-22',
    latest: false,
    summary: '把常用工具收敛为清晰、专注的两个工作区。',
    highlights: [
      '工具选择改为与 JSON / Markdown 一致的横向工具栏模式。',
      '常用工具入口与工具 Tab 更换为更清晰的工具集合图标。',
      '合并时间戳转换与时间格式化，并重新设计时间工具和 cURL 解析页面。',
      '官网新增能力亮点与可持续维护的历史版本记录。',
    ],
  },
  {
    version: 'v0.6.0',
    date: '2026-07-22',
    latest: false,
    summary: '把高频转换与解析能力带进独立工具 Tab。',
    highlights: [
      '新增时间戳转换与日期时间格式化。',
      '新增本地 cURL 结构解析，不执行命令、不发送请求。',
      '工具 Tab 支持重复创建、拖拽排序与数量上限设置。',
    ],
  },
  {
    version: 'v0.5.0',
    date: '2026-07-17',
    latest: false,
    summary: '完善可选智能能力与正式版发布体验。',
    highlights: [
      '新增可选 AI 文件自动命名，并支持多种服务提供方。',
      'API 密钥在本机加密保存，启用前可验证连接状态。',
      '完善 macOS 正式版构建、下载与版本信息展示。',
    ],
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
    answer: 'v0.9.0 适用于搭载 Apple Silicon 的 Mac；AI 翻译需要用户自行配置受支持服务商的 API Key。',
  },
  {
    id: 'release-date',
    question: '什么时候可以下载？',
    answer: 'v0.9.0 已开放下载，当前提供 macOS Apple Silicon 正式版。',
  },
  {
    id: 'local-files',
    question: '代码会上传到云端吗？',
    answer: '核心编辑、格式化、时间和 cURL 工具无需云端；AI 翻译仅在用户主动使用时，将待翻译内容发送给所选服务商。',
  },
  {
    id: 'formatting',
    question: '格式化需要额外安装工具吗？',
    answer: '不需要。支持语言的格式化能力随应用离线提供。',
  },
] as const
