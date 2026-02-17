import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png.', 'masked-icon.svg'],
    manifest: {
        name: 'CashbackCheck',
        short_name: 'CashbackCheck',
        description: 'Track your cashbacks across all your banks',
        icons: [
            {
                src: '/android-chrome-192-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/android-chrome-512-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
                purpose: 'apple touch icon',
            },
            {
                src: '/maskable_icon.png',
                sizes: '225x225',
                type: 'image/png',
                purpose: 'any maskable',
            },
        ],
        theme_color: '#ee857f',
        background_color: '#120b1b',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        categories: [
            'finance',
        ],
    }
}

export default defineConfig({
    plugins: [react(), VitePWA(manifestForPlugin)],
    base: '/cashbackClient/',
    server: {
        port: 3000,
        open: true,
        host: true,
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
