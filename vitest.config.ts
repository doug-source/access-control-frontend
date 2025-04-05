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
    },
});
