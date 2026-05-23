import * as vscode from 'vscode';
import { activate } from './extension';
import { TranslationController } from './translation/controller';

jest.mock('./translation/controller');

const MockedTranslationController = TranslationController as jest.MockedClass<typeof TranslationController>;

type CommandMap = Record<string, (...args: any[]) => any>;

describe('extension preview behavior', () => {
    let commands: CommandMap;
    let webviewMessageHandler: ((message: any) => void | Promise<void>) | undefined;
    let postMessage: jest.Mock;
    let abortMock: jest.Mock;
    let translateMock: jest.Mock;

    const markdownUri = {
        toString: () => 'file:///workspace/current.md',
    };

    const markdownDocument = {
        languageId: 'markdown',
        uri: markdownUri,
        getText: jest.fn(() => '# Current'),
    };

    const context = {
        extensionUri: vscode.Uri,
        subscriptions: [],
        secrets: {
            get: jest.fn(async () => 'test-key'),
            store: jest.fn(),
            delete: jest.fn(),
        },
    } as any;

    beforeEach(() => {
        commands = {};
        webviewMessageHandler = undefined;
        postMessage = jest.fn();
        abortMock = jest.fn();
        translateMock = jest.fn(async function* (source: string) {
            yield { content: `translated:${source}`, done: false };
            yield { content: '', done: true };
        });
        context.subscriptions = [];
        markdownDocument.getText.mockReturnValue('# Current');
        (vscode.workspace.getConfiguration as jest.Mock).mockReturnValue({
            get: jest.fn((key, defaultValue) => ({
                apiEndpoint: 'https://api.openai.com/v1',
                model: 'gpt-4',
                targetLanguage: 'zh-CN',
                systemPrompt: 'Translate to {targetLanguage}',
                autoTranslate: true,
            } as Record<string, any>)[key] ?? defaultValue),
        });
        (vscode.window as any).activeTextEditor = {
            document: markdownDocument,
        };
        (vscode.window.createWebviewPanel as jest.Mock).mockReturnValue({
            webview: {
                html: '',
                cspSource: 'vscode-webview:',
                asWebviewUri: jest.fn((uri) => uri),
                postMessage,
                onDidReceiveMessage: jest.fn((handler) => {
                    webviewMessageHandler = handler;
                    return { dispose: jest.fn() };
                }),
            },
            onDidDispose: jest.fn(() => ({ dispose: jest.fn() })),
            dispose: jest.fn(),
        });
        (vscode.commands.registerCommand as jest.Mock).mockImplementation((name, callback) => {
            commands[name] = callback;
            return { dispose: jest.fn() };
        });
        (vscode.commands.executeCommand as jest.Mock).mockResolvedValue(undefined);

        MockedTranslationController.mockClear();
        MockedTranslationController.mockImplementation(() => ({
            abort: abortMock,
            hasStartedStreaming: jest.fn(() => false),
            shouldCompleteInBackground: jest.fn(() => false),
            setWebview: jest.fn(),
            translate: translateMock,
        }) as any);
    });

    function openPreview() {
        activate(context);
        return commands['aiTranslation.openPreview']();
    }

    test('refresh translates the bound markdown document immediately and ignores cache', async () => {
        await openPreview();
        await webviewMessageHandler?.({ type: 'refresh' });

        expect(MockedTranslationController).toHaveBeenCalledTimes(1);
        expect(translateMock.mock.calls[0][0]).toBe('# Current');
    });

    test('clear aborts active translation without starting another translation', async () => {
        await openPreview();
        await webviewMessageHandler?.({ type: 'refresh' });

        await webviewMessageHandler?.({ type: 'clear' });

        expect(abortMock).toHaveBeenCalledTimes(1);
        expect(MockedTranslationController).toHaveBeenCalledTimes(1);
    });
});
