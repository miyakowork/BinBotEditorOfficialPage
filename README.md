# BinBotEditor 官方网站

BinBotEditor 的中文产品官网。当前提供面向 macOS Apple Silicon 的 `v0.9.0` 正式版。

在线访问：[https://miyakowork.github.io/BinBotEditorOfficialPage/](https://miyakowork.github.io/BinBotEditorOfficialPage/)

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址为 `http://localhost:5173`。

## 验证

```bash
npm test -- --run
npm run build
```

生产构建输出到 `dist/`。网站为纯静态 React 应用，不依赖后端服务、远程图片或分析脚本。

## 当前范围

- 中文单页官网
- macOS 产品介绍
- 31 种语法语言
- 14 种离线格式化
- Markdown 实时预览
- JSON 工具
- 使用自备 API Key 的 AI 翻译
- 文件与工具独立工作区
- 时间边界快捷操作
- 全局搜索与会话恢复
- 统一的 macOS 正式版下载入口
- 桌面、平板和手机响应式布局

下载地址指向 GitHub Release 中带版本号的安装包文件名。当前安装包未经 Apple 公证，首次启动时可能需要在 macOS“隐私与安全性”中确认打开。

## 自动部署

推送到 `main` 后，GitHub Actions 会依次运行测试和生产构建，并在验证成功后自动发布到 GitHub Pages。也可以从仓库的 Actions 页面手动触发部署。
