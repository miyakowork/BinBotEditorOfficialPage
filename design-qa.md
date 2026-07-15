# BinBotEditor 官网视觉 QA

- 设计参考：`docs/superpowers/specs/assets/2026-07-15-ui-motion-refinement-reference.png`
- 桌面实现：`docs/superpowers/specs/assets/2026-07-15-ui-motion-refinement-implementation-desktop.png`
- 平板实现：`docs/superpowers/specs/assets/2026-07-15-ui-motion-refinement-implementation-tablet.png`
- 移动实现：`docs/superpowers/specs/assets/2026-07-15-ui-motion-refinement-implementation-mobile.png`
- 移动预览状态：`docs/superpowers/specs/assets/2026-07-15-ui-motion-refinement-mobile-preview.png`
- 对照视口：桌面 1440 × 1024；平板 768 × 1024；移动 390 × 844

## 对照结论

参考图与浏览器实现已放入同一张左右对照画面检查。实现保留了参考中的浅色纸张网格、超大编辑式标题、紫色强调、本地工作流舞台和左右错位构图；产品窗口改为更适合真实官网交互的四步演示，而不是静态截图。

## 修正记录

1. 首轮桌面检查发现产品窗口偏低且与标题联系不足。将舞台宽度收紧到 `min(900px, 60vw)`，并加大向左重叠，使标题、介绍与产品界面形成一个连续主视觉。
2. 首轮移动检查发现标题末行孤立、下载说明与次要操作距离过紧。调整移动端标题比例、操作区布局与说明定位，390px 视口无横向溢出。
3. 下载按钮文字曾因链接使用普通行盒而靠近上沿。按钮改为 `inline-flex` 居中，并用独立 `.button-label` 文本层校正行高与抗锯齿。
4. 代码示例中的语义标签会生成额外引号并造成视觉噪点。已换成中性语法高亮类，离线格式化示例显示为单层 `'offline'`。
5. 浏览器检查发现缺失 favicon 的 404。复用现有 `binbot-editor.svg` 并在文档头部声明，重新启动浏览器会话后控制台零错误。
6. 代码审查发现手机端会隐藏“实时预览”的结果面板。现已在该步骤用预览面板替换代码区；浏览器确认预览可见、编辑区隐藏且无横向溢出。

## 功能与可访问性

- “离线格式化”步骤可点击，舞台状态、`aria-pressed` 与命令浮层同步更新。
- 移动导航可展开，包含 5 个可操作链接。
- 产品能力摘要使用真实列表语义，工作流步骤使用原生按钮。
- 1440px、768px 与 390px 视口的 `scrollWidth` 均等于 `innerWidth`；平板舞台左右边界为 24px 与 744px。
- 保留键盘焦点、触屏稳定状态与 `prefers-reduced-motion` 降级。

final result: passed
