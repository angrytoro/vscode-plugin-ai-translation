// Mock VSCode module
global.vscode = {
    workspace: {
        getConfiguration: jest.fn(() => ({
            get: jest.fn((key, defaultValue) => {
                const defaults = {
                    'aiTranslation.apiEndpoint': 'https://api.openai.com/v1',
                    'aiTranslation.apiKey': '',
                    'aiTranslation.model': 'gpt-4',
                    'aiTranslation.targetLanguage': 'zh-CN',
                    'aiTranslation.systemPrompt': 'You are a professional translator. Translate the following markdown content to {targetLanguage}, preserving all markdown syntax, formatting, and structure.',
                    'aiTranslation.autoTranslate': false,
                };
                return defaults[key] || defaultValue;
            }),
        })),
    },
};
