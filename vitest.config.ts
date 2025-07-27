import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
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
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                ref: true,
                svgo: false,
                titleProp: true,
            },
            include: '**/*.svg?react',
        }),
    ],
});
