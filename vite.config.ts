import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
          manifest: {
            name: 'Green Business Assessment',
            short_name: 'GreenBiz',
            description: 'BID4CJ Green Business Assessment Tool for Bangladeshi SMEs',
            theme_color: '#16a34a',
            background_color: '#f0fdf4',
            display: 'standalone',
            orientation: 'portrait',
            start_url: '/',
            scope: '/',
            lang: 'en',
            icons: [
              { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
              { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
              { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
            ],
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            runtimeCaching: [
              {
                urlPattern: ({ url }) => url.origin === 'https://cdnjs.cloudflare.com',
                handler: 'CacheFirst',
                options: {
                  cacheName: 'cdn-assets',
                  expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 30 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                urlPattern: ({ url }) => url.origin === 'https://cdn.tailwindcss.com',
                handler: 'CacheFirst',
                options: {
                  cacheName: 'tailwind-cdn',
                  expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 * 30 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
                handler: 'StaleWhileRevalidate',
                options: { cacheName: 'google-fonts-stylesheets' },
              },
              {
                urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-webfonts',
                  expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                // Tile layer for OpenStreetMap (used by location reverse-geocode endpoint)
                urlPattern: ({ url }) => url.origin === 'https://nominatim.openstreetmap.org',
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'nominatim',
                  networkTimeoutSeconds: 5,
                },
              },
            ],
            navigateFallback: '/index.html',
            navigateFallbackDenylist: [/^\/api/],
          },
        }),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        },
      },
    };
});
