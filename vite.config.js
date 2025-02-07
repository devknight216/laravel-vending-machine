import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/index.jsx',
            ],
            refresh: true,
        }),
    ],
    server: {
        host: '127.0.0.1',
    },
});
