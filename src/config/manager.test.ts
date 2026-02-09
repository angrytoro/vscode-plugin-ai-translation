import * as vscode from 'vscode';
import { ConfigManager } from './manager';
import { TranslationConfig } from '../types';

// Mock ExtensionContext
const mockContext = {
    secrets: {
        get: jest.fn(),
        store: jest.fn(),
    },
    globalState: {
        get: jest.fn(),
        update: jest.fn(),
    },
    workspaceState: {
        get: jest.fn(),
        update: jest.fn(),
    },
} as unknown as vscode.ExtensionContext;

describe('ConfigManager', () => {
    let configManager: ConfigManager;

    beforeEach(() => {
        configManager = new ConfigManager(mockContext);
    });

    describe('getConfig', () => {
        test('should get default config', () => {
            const config = configManager.getConfig();
            expect(config.apiEndpoint).toBe('https://api.openai.com/v1');
            expect(config.model).toBe('gpt-4');
            expect(config.targetLanguage).toBe('zh-CN');
        });

        test('should require API key', () => {
            const config = configManager.getConfig();
            const isValid = config.apiKey.length > 0;
            expect(isValid).toBe(false);
        });
    });

    describe('validateConfig', () => {
        test('should pass validation with valid config', () => {
            const validConfig: TranslationConfig = {
                apiEndpoint: 'https://api.openai.com/v1',
                apiKey: 'test-key',
                model: 'gpt-4',
                targetLanguage: 'zh-CN',
                systemPrompt: 'Translate to {targetLanguage}',
                autoTranslate: false,
            };

            const result = configManager.validateConfig(validConfig);
            expect(result.valid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        test('should fail validation without API key', () => {
            const invalidConfig: TranslationConfig = {
                apiEndpoint: 'https://api.openai.com/v1',
                apiKey: '',
                model: 'gpt-4',
                targetLanguage: 'zh-CN',
                systemPrompt: 'Translate to {targetLanguage}',
                autoTranslate: false,
            };

            const result = configManager.validateConfig(invalidConfig);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('API key is required');
        });

        test('should fail validation without API endpoint', () => {
            const invalidConfig: TranslationConfig = {
                apiEndpoint: '',
                apiKey: 'test-key',
                model: 'gpt-4',
                targetLanguage: 'zh-CN',
                systemPrompt: 'Translate to {targetLanguage}',
                autoTranslate: false,
            };

            const result = configManager.validateConfig(invalidConfig);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('API endpoint is required');
        });

        test('should fail validation without model', () => {
            const invalidConfig: TranslationConfig = {
                apiEndpoint: 'https://api.openai.com/v1',
                apiKey: 'test-key',
                model: '',
                targetLanguage: 'zh-CN',
                systemPrompt: 'Translate to {targetLanguage}',
                autoTranslate: false,
            };

            const result = configManager.validateConfig(invalidConfig);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('Model name is required');
        });

        test('should fail validation with invalid URL', () => {
            const invalidConfig: TranslationConfig = {
                apiEndpoint: 'not-a-valid-url',
                apiKey: 'test-key',
                model: 'gpt-4',
                targetLanguage: 'zh-CN',
                systemPrompt: 'Translate to {targetLanguage}',
                autoTranslate: false,
            };

            const result = configManager.validateConfig(invalidConfig);
            expect(result.valid).toBe(false);
            expect(result.error).toBe('Invalid API endpoint URL');
        });

        test('should validate custom API endpoints', () => {
            const customConfig: TranslationConfig = {
                apiEndpoint: 'https://custom.api.com/v1',
                apiKey: 'test-key',
                model: 'custom-model',
                targetLanguage: 'en',
                systemPrompt: 'Custom prompt',
                autoTranslate: false,
            };

            const result = configManager.validateConfig(customConfig);
            expect(result.valid).toBe(true);
        });
    });

    describe('testConnection', () => {
        test('should return validation error if config is invalid', async () => {
            // Mock getConfiguration to return invalid config
            const mockManager = new ConfigManager(mockContext);

            const result = await mockManager.testConnection();
            expect(result.valid).toBe(false);
            expect(result.error).toBe('API key is required');
        });
    });
});
