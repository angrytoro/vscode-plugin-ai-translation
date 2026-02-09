import { TranslationCache } from './cache';
import { CachedTranslation } from '../types';

describe('TranslationCache', () => {
    let cache: TranslationCache;

    beforeEach(() => {
        cache = new TranslationCache();
    });

    test('should store and retrieve translation', () => {
        const translation: CachedTranslation = {
            content: 'Translated content',
            timestamp: Date.now(),
            sourceUri: 'file:///test.md',
            targetLanguage: 'zh-CN',
        };

        cache.set('file:///test.md-zhCN-abc123', translation);
        const retrieved = cache.get('file:///test.md-zhCN-abc123');

        expect(retrieved).toEqual(translation);
    });

    test('should return undefined for non-existent key', () => {
        const result = cache.get('nonexistent');
        expect(result).toBeUndefined();
    });

    test('should clear all cache', () => {
        cache.set('key1', { content: 'test', timestamp: Date.now(), sourceUri: '', targetLanguage: '' });
        cache.set('key2', { content: 'test2', timestamp: Date.now(), sourceUri: '', targetLanguage: '' });

        cache.clear();

        expect(cache.get('key1')).toBeUndefined();
        expect(cache.get('key2')).toBeUndefined();
    });
});
