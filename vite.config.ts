import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import path from 'path'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    envDir: './',
    build: {
        outDir: 'build'
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        reactRefresh(),
        svgr(),
    ],
    css: {
        preprocessorOptions: {
            sass: {
                javascriptEnable: true
            }
        }
    }
})
