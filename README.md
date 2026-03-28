# Markdown AI 翻译插件

> 使用 AI 实时流式翻译 Markdown 文件

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VSCode](https://img.shields.io/badge/VSCode-1.80.0%2B-blue.svg)](https://code.visualstudio.com/)

[English](README.md) | 简体中文

## 功能特性

- **🚀 实时流式翻译** - 看着 AI 生成的翻译逐字出现，即时反馈
- **💾 智能缓存** - 相同内容只翻译一次，节省时间和 API 费用
- **🌍 多语言支持** - 支持中文、英语、日语、韩语、法语、德语和西班牙语
- **🔒 安全密钥存储** - API 密钥加密存储在系统钥匙串中，其他扩展无法访问
- **⚙️ 高度可定制** - 可配置 API 端点、模型、系统提示词和目标语言
- **🔌 OpenAI 兼容** - 支持 OpenAI、Azure OpenAI 和任何 OpenAI 兼容的 API

## 安全性

🔐 **您的 API 密钥受到保护！**

本插件使用 VSCode 的 `secretStorage` API 安全存储您的 API 密钥：

- ✅ **加密存储** - API 密钥加密后存储在系统钥匙串中（macOS 的 Keychain、Windows 的凭据管理器、Linux 的 libsecret）
- ✅ **访问隔离** - 只有本插件可以访问您存储的 API 密钥
- ✅ **零泄露** - API 密钥从不存储在工作区设置或配置文件中
- ✅ **Git 安全** - API 密钥不会被意外提交到版本控制系统
- ✅ **扩展隔离** - 其他 VSCode 扩展无法读取您的 API 密钥

## 安装

### 从应用市场安装（即将推出）

在 VSCode 扩展市场中搜索 "AI Translation for Markdown"。

### 从 VSIX 安装

1. 从 [发布页面](https://github.com/angrytoro/vscode-plugin-ai-translation/releases) 下载最新的 `.vsix` 文件
2. 打开 VSCode
3. 按 `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）
4. 输入 "Extensions: Install from VSIX"
5. 选择下载的 `.vsix` 文件

### 从源码安装

```bash
# 克隆仓库
git clone https://github.com/angrytoro/vscode-plugin-ai-translation.git
cd vscode-plugin-ai-translation

# 安装依赖
npm install

# 编译
npm run compile

# 构建前端界面
npm run build:webview

# 打包扩展
npm run package
```

## 快速开始

### 1. 设置 API 密钥

**首次使用设置：**

首次使用翻译功能时，系统会自动提示您设置 API 密钥。

**手动设置：**

1. 按 `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）打开命令面板
2. 输入 "AI Translation: Set API Key"
3. 在密码输入框中输入您的 API 密钥（输入会被掩码保护）
4. 按回车键保存

API 密钥将安全地存储在您的系统钥匙串中。

### 2. 配置（可选）

打开 VSCode 设置，搜索 "AI Translation" 进行配置：

- **API 端点** - 默认：`https://api.openai.com/v1`
- **模型** - 默认：`gpt-4`
- **目标语言** - 默认：`zh-CN`（简体中文）

### 3. 开始翻译

1. 在 VSCode 中打开一个 Markdown 文件
2. 按 `Ctrl+K Ctrl+T`（Mac: `Cmd+K Cmd+T`）或右键点击选择 "AI Translation: Open Preview"
3. 在预览面板中实时观看翻译结果！

## 命令列表

| 命令 | 描述 |
|------|------|
| `AI Translation: Open Preview` | 打开当前 Markdown 文件的翻译预览 |
| `AI Translation: Open Settings` | 打开 AI Translation 的 VSCode 设置 |
| `AI Translation: Test Connection` | 测试您的 API 连接 |
| `AI Translation: Set API Key` | 设置或更新您的 API 密钥（安全存储） |
| `AI Translation: Clear API Key` | 删除已存储的 API 密钥 |

## 配置说明

在 VSCode 设置中配置本插件（搜索 "AI Translation"）：

| 设置项 | 描述 | 默认值 |
|--------|------|--------|
| `aiTranslation.apiEndpoint` | AI API 端点 URL | `https://api.openai.com/v1` |
| `aiTranslation.model` | 用于翻译的模型名称 | `gpt-4` |
| `aiTranslation.targetLanguage` | 翻译的目标语言 | `zh-CN` |
| `aiTranslation.systemPrompt` | 自定义系统提示词（支持 `{targetLanguage}` 占位符） | 专家翻译提示词 |
| `aiTranslation.autoTranslate` | 文件更改时自动翻译 | `false`（已禁用） |

### 支持的语言

| 语言 | 代码 |
|------|------|
| 中文（简体） | `zh-CN` |
| English | `en` |
| 日本語 | `ja` |
| 한국어 | `ko` |
| Français | `fr` |
| Deutsch | `de` |
| Español | `es` |

## 高级用法

### 使用自定义 API 端点

本插件可使用任何 OpenAI 兼容的 API：

**Azure OpenAI：**

1. 将 `aiTranslation.apiEndpoint` 设置为您的 Azure 端点
2. 将 `aiTranslation.model` 设置为您的部署名称

**本地大模型（Ollama、LM Studio 等）：**

1. 运行带有 OpenAI 兼容 API 的本地服务器
2. 将 `aiTranslation.apiEndpoint` 设置为本地端点（例如：`http://localhost:11434/v1`）
3. 将 `aiTranslation.model` 设置为模型名称（例如：`llama2`、`mistral`）

### 自定义系统提示词

通过修改系统提示词来自定义翻译行为：

```
你是一名技术翻译。将以下 Markdown 内容翻译成 {targetLanguage}。
保持技术术语为英文。保留所有格式和代码块。
```

`{targetLanguage}` 占位符会被自动替换为您配置的目标语言。

### 测试连接

在翻译重要文档之前，先测试您的 API 设置：

1. 按 `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）
2. 输入 "AI Translation: Test Connection"
3. 您将看到成功或错误消息

## 常见问题

### Q: 我的 API 密钥存储在哪里？

**A:** 您的 API 密钥经过加密并存储在操作系统的钥匙串中：
- **macOS**: 钥匙串访问（Keychain Access）
- **Windows**: 凭据管理器（Credential Manager）
- **Linux**: libsecret（GNOME Keyring / KWallet）

它**不会**存储在工作区设置或配置文件中。

### Q: 其他 VSCode 扩展能读取我的 API 密钥吗？

**A:** 不能。API 密钥使用 VSCode 的 `secretStorage` API 存储，只允许本插件访问。

### Q: 支持哪些 AI 服务？

**A:** 任何提供 OpenAI 兼容 API 的服务，包括：
- OpenAI（GPT-3.5、GPT-4 等）
- Azure OpenAI
- Anthropic（通过兼容层）
- 本地大模型（Ollama、LM Studio 等）
- 其他 OpenAI 兼容的 API

### Q: 如何更新我的 API 密钥？

**A:** 使用 "AI Translation: Set API Key" 命令覆盖现有密钥，或使用 "AI Translation: Clear API Key" 清除后重新设置。

### Q: 为什么翻译无法工作？

**A:** 检查以下事项：
1. 验证 API 密钥已设置：使用 "AI Translation: Test Connection"
2. 检查 API 端点和模型设置
3. 确保您有足够的 API 配额/额度
4. 查看 VSCode 开发者控制台（Help → Toggle Developer Tools）的错误消息

### Q: 这个插件可以离线工作吗？

**A:** 不能。需要互联网连接才能与 AI API 通信。但是，之前翻译的内容会缓存在本地。

### Q: 我可以同时翻译成多种语言吗？

**A:** 不能直接实现。您需要更改 `targetLanguage` 设置并重新翻译。每种语言的翻译是单独缓存的。

## 系统要求

- **VSCode**: 版本 1.80.0 或更高
- **API**: OpenAI API 密钥或兼容的 API
- **账户**: 有效的 API 账户，且有足够的额度/配额

## 故障排除

### "API key is required" 错误

**解决方案：** 使用 "AI Translation: Set API Key" 命令设置您的 API 密钥。

### "Connection failed" 错误

**可能的原因：**
- API 端点不正确
- API 密钥无效
- 网络连接问题
- API 服务宕机

**解决方案：** 使用 "AI Translation: Test Connection" 诊断问题。

### 翻译质量问题

**提示：**
- 尝试不同的模型（GPT-4 通常比 GPT-3.5 提供更好的质量）
- 根据您的具体需求自定义系统提示词
- 对于技术内容，考虑将技术术语保持为英文

## 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 支持

- **问题反馈**: [GitHub Issues](https://github.com/angrytoro/vscode-plugin-ai-translation/issues)
- **讨论交流**: [GitHub Discussions](https://github.com/angrytoro/vscode-plugin-ai-translation/discussions)

---

为 Markdown 和 AI 社区用 ❤️ 制作
