# BinBotEditor GitHub Pages 部署设计

## 目标

将公开仓库 `miyakowork/BinBotEditorOfficialPage` 自动部署到 GitHub Pages，公开地址为 `https://miyakowork.github.io/BinBotEditorOfficialPage/`。

## 发布流程

GitHub Actions 在 `main` 分支推送时自动运行，也允许从 Actions 页面手动触发。工作流按顺序检出代码、安装锁定依赖、运行全部测试、执行 Vite 生产构建、上传 `dist/` Pages artifact，并通过 `github-pages` environment 发布。测试或构建失败时不得进入部署步骤。

## 路径与资源

GitHub Pages 项目站点部署在 `/BinBotEditorOfficialPage/` 子路径。Vite 生产构建使用该基础路径，本地开发仍使用 `/`。代码中的公共资源通过 Vite 基础路径解析，避免图标、脚本和样式在 Pages 上请求站点根目录导致 404。

## 权限与并发

工作流只申请 Pages 发布所需的最小权限：读取仓库内容、写入 Pages、签发 OIDC token。部署并发组为 `pages`，新部署可以取消尚未完成的旧部署，避免多个版本竞争发布。

## 验证

- 本地测试全部通过。
- 使用生产基础路径构建成功。
- 检查 `dist/index.html` 中的脚本和样式 URL 均带有 `/BinBotEditorOfficialPage/` 前缀。
- 推送后确认 GitHub Actions 成功，仓库 Pages 配置来源为 GitHub Actions。
- 访问公开地址，确认首页、图标、样式和交互正常。

## 回滚

若部署失败，保留上一个成功的 Pages 版本。代码回滚通过恢复 `main` 上的提交后重新运行工作流完成；不在工作流中提交编译产物或维护 `gh-pages` 分支。
