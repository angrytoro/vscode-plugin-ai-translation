import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'src/webview/views/dist',
        target: 'es2015',
        rollupOptions: {
            input: resolve(__dirname, 'src/webview/components/index.tsx'),
            output: {
                entryFileNames: 'app.js',
                chunkFileNames: 'app-[name].js',
                assetFileNames: 'app-[name][extname]',
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
