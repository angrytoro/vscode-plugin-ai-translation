import { generateHash } from './hash';

describe('generateHash', () => {
    test('should generate consistent hash for same input', () => {
        const input = 'Hello, World!';
        const hash1 = generateHash(input);
        const hash2 = generateHash(input);

        expect(hash1).toBe(hash2);
    });

    test('should generate different hashes for different inputs', () => {
        const hash1 = generateHash('Hello');
        const hash2 = generateHash('World');

        expect(hash1).not.toBe(hash2);
    });

    test('should generate SHA-256 hash of correct length', () => {
        const hash = generateHash('test');
        expect(hash).toHaveLength(64); // SHA-256 produces 64 character hex string
    });

    test('should handle empty string', () => {
        const hash = generateHash('');
        expect(hash).toHaveLength(64);
    });

    test('should handle special characters', () => {
        const input = '测试中文字符 🚀';
        const hash = generateHash(input);
        expect(hash).toHaveLength(64);
    });

    test('should handle long text', () => {
        const longText = 'a'.repeat(10000);
        const hash = generateHash(longText);
        expect(hash).toHaveLength(64);
    });
});
