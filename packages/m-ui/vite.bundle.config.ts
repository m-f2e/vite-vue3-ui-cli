import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

const entryDir = resolve(__dirname, './')
const outputDir = resolve(__dirname, './build')

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: resolve(entryDir, 'vue-mui.ts'),
      name: 'index',
      fileName: 'index',
      formats: ['es', 'umd']
    },
    outDir: outputDir
  }
})
