import { CachedTranslation } from '../types';

const MAX_CACHE_SIZE = 50;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export class TranslationCache {
    private cache = new Map<string, CachedTranslation>();

    set(key: string, translation: CachedTranslation): void {
        // Evict oldest entry if cache is full (LRU: Map preserves insertion order)
        if (this.cache.size >= MAX_CACHE_SIZE && !this.cache.has(key)) {
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey !== undefined) {
                this.cache.delete(oldestKey);
            }
        }

        // If key already exists, delete and re-insert to move it to the end (most recent)
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        this.cache.set(key, translation);
    }

    get(key: string): CachedTranslation | undefined {
        const entry = this.cache.get(key);
        if (!entry) {
            return undefined;
        }

        // Check TTL expiration
        if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
            this.cache.delete(key);
            return undefined;
        }

        // Move to end for LRU (most recently accessed)
        this.cache.delete(key);
        this.cache.set(key, entry);

        return entry;
    }

    has(key: string): boolean {
        // Use get() to apply TTL check
        return this.get(key) !== undefined;
    }

    clear(): void {
        this.cache.clear();
    }

    delete(key: string): boolean {
        return this.cache.delete(key);
    }

    get size(): number {
        return this.cache.size;
    }
}
