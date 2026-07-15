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

## Section 标题层级精修 QA

- 设计说明：`docs/superpowers/specs/2026-07-15-section-title-hierarchy-design.md`
- 修改前后同屏对照：`docs/superpowers/specs/assets/2026-07-15-section-title-hierarchy-comparison.png`
- 桌面实现：`docs/superpowers/specs/assets/2026-07-15-section-title-hierarchy-desktop.png`
- 平板实现：`docs/superpowers/specs/assets/2026-07-15-section-title-hierarchy-tablet.png`
- 移动实现：`docs/superpowers/specs/assets/2026-07-15-section-title-hierarchy-mobile.png`
- 移动 Mac 区域：`docs/superpowers/specs/assets/2026-07-15-section-title-hierarchy-mobile-mac.png`
- 移动 FAQ 区域：`docs/superpowers/specs/assets/2026-07-15-section-title-hierarchy-mobile-faq.png`
- 移动下载区域：`docs/superpowers/specs/assets/2026-07-15-section-title-hierarchy-mobile-release.png`
- 视口与状态：1440 × 1024、768 × 1024、390 × 844；各 Section 滚动进入后的稳定状态

### 对照历史

1. 首轮实现将章节标题从最高约 `94px` 收敛到 `52–72px`，移除组件中的固定 `<br />`。浏览器截图仍发现 P2：桌面标题列过窄，产品能力标题出现孤立“存。”，工作流标题出现孤立“重来。”。
2. 将眉题列改为固定窄列 `120–180px`，主标题最大宽度增至 `900px`，桌面字号上限降至 `68px`，并为章节标题和能力标题增加 `text-wrap: balance`。
3. 后续同屏对照确认产品能力和工作流标题均形成单行稳定构图；Mac 保持均衡两行，FAQ 保持克制单行，下载区形成均衡两行。此前 P2 已关闭。
4. 代码审查发现手机端 Mac 正文仍遗留 `margin-top: -32px`，会削弱标题与正文的呼吸感。现已统一为零负边距，并通过 390px 实机浏览器截图复核。

### 必查维度

- 字体与排版：保留宋体展示风格，标题字距由 `-0.065em` 收敛至 `-0.045em`，行高增至 `1.08–1.1`；没有孤字、强制换行或截断。
- 间距与布局：章节眉题使用窄列，标题左对齐；标题至内容分隔线的距离收敛，Mac 正文不再使用负边距追赶标题。
- 颜色与令牌：暖白纸面、近黑标题、紫色眉题和深色产品面板保持不变，对比度与视觉品牌没有漂移。
- 图像与资产：本轮没有新增或替换图像、图标和产品资产；现有素材的比例、清晰度与裁切不变。
- 文案与内容：标题文字、产品能力说明、FAQ 和下载声明均保持原意，仅改为浏览器自然且均衡的断行。
- 响应式：768px 与 390px 的 `scrollWidth` 分别等于 `innerWidth`；手机端产品能力、Mac、FAQ 和下载标题均无重叠或横向裁切。
- 行为与可访问性：DOM 阅读顺序、标题层级、导航、FAQ、下载和减少动态效果行为不变；本地页面控制台零错误。

### 层级说明

- 手机下载区标题与普通 Section 使用相同的字号上限；最终转化层级由深色容器、居中排版与主按钮共同建立，避免重新引入突兀的大字。

final result: passed
