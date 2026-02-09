const vscodeUri = {
    scheme: 'file',
    path: '/extension',
    fsPath: '/extension',
    with: jest.fn(),
    joinPath: jest.fn((...parts) => ({
        scheme: 'file',
        path: parts.join('/'),
        fsPath: parts.join('/'),
        with: jest.fn(),
    })),
};

module.exports = {
    Uri: vscodeUri,
    workspace: {
        getConfiguration: jest.fn(() => ({
            get: jest.fn((key, defaultValue) => {
                const defaults = {
                    'aiTranslation.apiEndpoint': 'https://api.openai.com/v1',
                    'aiTranslation.apiKey': '',
                    'aiTranslation.model': 'gpt-4',
                    'aiTranslation.targetLanguage': 'zh-CN',
                    'aiTranslation.systemPrompt': 'You are a professional translator. Translate the following markdown content to {targetLanguage}, preserving all markdown syntax, formatting, and structure.',
                };
                return defaults[key] || defaultValue;
            }),
        })),
    },
    window: {
        showInformationMessage: jest.fn(),
        showWarningMessage: jest.fn(),
        showErrorMessage: jest.fn(),
        withProgress: jest.fn(),
    },
    commands: {
        executeCommand: jest.fn(),
        registerCommand: jest.fn(),
    },
    ProgressLocation: {
        Notification: 'notification',
    },
};
