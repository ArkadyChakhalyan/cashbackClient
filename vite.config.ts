import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
    },
    optimizeDeps: {
        exclude: ['js-big-decimal, @hello-pangea/dnd']
    },
    resolve: {
        alias: {
            types: path.resolve(__dirname, '../types/src'),
        },
    },
})
