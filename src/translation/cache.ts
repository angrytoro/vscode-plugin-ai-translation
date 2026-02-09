import { CachedTranslation } from '../types';

export class TranslationCache {
    private cache = new Map<string, CachedTranslation>();

    set(key: string, translation: CachedTranslation): void {
        this.cache.set(key, translation);
    }

    get(key: string): CachedTranslation | undefined {
        return this.cache.get(key);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    clear(): void {
        this.cache.clear();
    }

    delete(key: string): boolean {
        return this.cache.delete(key);
    }
}
