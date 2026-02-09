# AI Translation for Markdown

> Translate Markdown files using AI with real-time incremental rendering

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VSCode](https://img.shields.io/badge/VSCode-1.80.0%2B-blue.svg)](https://code.visualstudio.com/)

## Features

- **🚀 Real-time Streaming** - Watch translations appear as AI generates them word by word
- **💾 Smart Caching** - Never translate the same content twice, saves time and API costs
- **🌍 Multiple Languages** - Support for Chinese, English, Japanese, Korean, French, German, and Spanish
- **🔒 Secure API Key Storage** - Your API keys are encrypted in OS keychain, other extensions cannot access them
- **⚙️ Highly Customizable** - Configure API endpoint, model, system prompts, and target language
- **🔌 OpenAI Compatible** - Works with OpenAI, Azure OpenAI, and any OpenAI-compatible APIs

## Security

🔐 **Your API keys are protected!**

This extension uses VSCode's `secretStorage` API to securely store your API keys:

- ✅ **Encrypted Storage** - API keys are encrypted and stored in your OS keychain (Keychain on macOS, Credential Manager on Windows, libsecret on Linux)
- ✅ **Isolated Access** - Only this extension can access your stored API keys
- ✅ **No Leakage** - API keys are never stored in workspace settings or configuration files
- ✅ **Git Safe** - Your API keys won't be accidentally committed to version control
- ✅ **Extension Isolation** - Other VSCode extensions cannot read your API keys

## Installation

### From Marketplace (Coming Soon)

Search for "AI Translation for Markdown" in the VSCode Extensions marketplace.

### From VSIX

1. Download the latest `.vsix` file from [Releases](https://github.com/angrytoro/vscode-plugin-ai-translation/releases)
2. Open VSCode
3. Press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
4. Type "Extensions: Install from VSIX"
5. Select the downloaded `.vsix` file

### From Source

```bash
# Clone the repository
git clone https://github.com/angrytoro/vscode-plugin-ai-translation.git
cd vscode-plugin-ai-translation

# Install dependencies
npm install

# Compile
npm run compile

# Build webview
npm run build:webview

# Package extension
npm run package
```

## Quick Start

### 1. Set Your API Key

**First-time setup:**

When you use the translation feature for the first time, you'll be automatically prompted to set your API key.

**Manual setup:**

1. Press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) to open the Command Palette
2. Type "AI Translation: Set API Key"
3. Enter your API key in the password input box (input is masked for security)
4. Press Enter to save

The API key will be securely stored in your OS keychain.

### 2. Configure (Optional)

Open VSCode Settings and search for "AI Translation" to configure:

- **API Endpoint** - Default: `https://api.openai.com/v1`
- **Model** - Default: `gpt-4`
- **Target Language** - Default: `zh-CN` (Chinese Simplified)

### 3. Start Translating

1. Open a Markdown file in VSCode
2. Press `Ctrl+K Ctrl+T` (Mac: `Cmd+K Cmd+T`) or right-click and select "AI Translation: Open Preview"
3. Watch the real-time translation appear in the preview panel!

## Commands

| Command | Description |
|---------|-------------|
| `AI Translation: Open Preview` | Open translation preview for current Markdown file |
| `AI Translation: Open Settings` | Open VSCode settings for AI Translation |
| `AI Translation: Test Connection` | Test your API connection |
| `AI Translation: Set API Key` | Set or update your API key (stored securely) |
| `AI Translation: Clear API Key` | Remove stored API key |

## Configuration

Configure the extension in VSCode Settings (search for "AI Translation"):

| Setting | Description | Default |
|---------|-------------|---------|
| `aiTranslation.apiEndpoint` | AI API endpoint URL | `https://api.openai.com/v1` |
| `aiTranslation.model` | Model name for translation | `gpt-4` |
| `aiTranslation.targetLanguage` | Target language for translation | `zh-CN` |
| `aiTranslation.systemPrompt` | Custom system prompt (supports `{targetLanguage}` placeholder) | Expert translation prompt |
| `aiTranslation.autoTranslate` | Automatically translate when file changes | `false` (disabled) |

### Supported Languages

| Language | Code |
|----------|------|
| Chinese (Simplified) | `zh-CN` |
| English | `en` |
| Japanese | `ja` |
| Korean | `ko` |
| French | `fr` |
| German | `de` |
| Spanish | `es` |

## Advanced Usage

### Using Custom API Endpoints

This extension works with any OpenAI-compatible API:

**Azure OpenAI:**

1. Set `aiTranslation.apiEndpoint` to your Azure endpoint
2. Set `aiTranslation.model` to your deployment name

**Local LLMs (Ollama, LM Studio, etc.):**

1. Run your local server with OpenAI-compatible API
2. Set `aiTranslation.apiEndpoint` to your local endpoint (e.g., `http://localhost:11434/v1`)
3. Set `aiTranslation.model` to your model name (e.g., `llama2`, `mistral`)

### Custom System Prompt

Customize translation behavior by modifying the system prompt:

```
You are a technical translator. Translate the following markdown content to {targetLanguage}.
Keep technical terms in English. Preserve all formatting and code blocks.
```

The `{targetLanguage}` placeholder will be automatically replaced with your configured target language.

### Testing Your Connection

Before translating important documents, test your API setup:

1. Press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type "AI Translation: Test Connection"
3. You'll see a success or error message

## FAQ

### Q: Where is my API key stored?

**A:** Your API key is encrypted and stored in your operating system's keychain:
- **macOS**: Keychain Access
- **Windows**: Credential Manager
- **Linux**: libsecret (GNOME Keyring / KWallet)

It is NOT stored in workspace settings or configuration files.

### Q: Can other VSCode extensions read my API key?

**A:** No. The API key is stored using VSCode's `secretStorage` API, which only allows this extension to access it.

### Q: Which AI services are supported?

**A:** Any service that provides an OpenAI-compatible API, including:
- OpenAI (GPT-3.5, GPT-4, etc.)
- Azure OpenAI
- Anthropic (via compatibility layers)
- Local LLMs (Ollama, LM Studio, etc.)
- Other OpenAI-compatible APIs

### Q: How do I update my API key?

**A:** Use "AI Translation: Set API Key" command to overwrite the existing key, or use "AI Translation: Clear API Key" followed by setting a new key.

### Q: Why is my translation not working?

**A:** Check the following:
1. Verify your API key is set: Use "AI Translation: Test Connection"
2. Check your API endpoint and model settings
3. Ensure you have sufficient API credits/quota
4. Check the VSCode Developer Console (Help → Toggle Developer Tools) for error messages

### Q: Does this extension work offline?

**A:** No. An internet connection is required to communicate with AI APIs. However, previously translated content is cached locally.

### Q: Can I translate to multiple languages at once?

**A:** Not directly. You need to change the `targetLanguage` setting and translate again. Each language's translation is cached separately.

## Requirements

- **VSCode**: Version 1.80.0 or higher
- **API**: OpenAI API key or compatible API
- **Account**: Valid API account with sufficient credits/quota

## Troubleshooting

### "API key is required" Error

**Solution:** Set your API key using "AI Translation: Set API Key" command.

### "Connection failed" Error

**Possible causes:**
- Incorrect API endpoint
- Invalid API key
- Network connectivity issues
- API service downtime

**Solution:** Use "AI Translation: Test Connection" to diagnose the issue.

### Translation Quality Issues

**Tips:**
- Try different models (GPT-4 generally provides better quality than GPT-3.5)
- Customize the system prompt for your specific needs
- For technical content, consider keeping technical terms in English

## License

MIT License - see [LICENSE](LICENSE) file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

- **Issues**: [GitHub Issues](https://github.com/angrytoro/vscode-plugin-ai-translation/issues)
- **Discussions**: [GitHub Discussions](https://github.com/angrytoro/vscode-plugin-ai-translation/discussions)

---

Made with ❤️ for the Markdown and AI community
