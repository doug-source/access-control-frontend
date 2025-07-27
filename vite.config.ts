import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
            '@components': path.resolve(__dirname, './src/shared/components/'),
            '@pages': path.resolve(__dirname, './src/components/pages/'),
            '@shared': path.resolve(__dirname, './src/shared/'),
        },
    },
    // plugins: [react()],
    plugins: [react(), svgr()],
});
