import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.js',
        css: true,
        reporters: ['verbose'],
        coverage: {
            reporter: ['text'],
            include: ['src/**/*'],
            exclude: [],
        },
        /* Path aliases */
        alias: {
            '@': path.resolve(__dirname, './src/'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@pages': path.resolve(__dirname, './src/components/pages'),
        },
    },
});
