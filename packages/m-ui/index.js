const { build, defineConfig } = require('vite')
const { resolve } = require('path')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fs = require('fs');
const fsExtra = require('fs-extra');
const { execSync } = require('child_process');
// const { volarSupport } = require('./build-volar-support');

const entryDir = resolve(__dirname, '.');
const outputDir = resolve(__dirname, './build');

const baseConfig = defineConfig({
  // configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
});


const rollupOptions = {
  external: [
    'vue',
    'vue-router',
    '@vueuse/core',
    '@floating-ui/dom',
    'monaco-editor',
    /codemirror/,
    'highlight.js',
    /markdown-it/,
    /^mermaid/,
    'xss',
    /diff2html/,
    'clipboard',
    'echarts',
  ],
  output: {
    globals: {
      vue: 'Vue',
    },
  },
};


const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: resolve(entryDir, 'vue-mui.ts'),
          name: 'Mui',
          fileName: 'm-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
}

const buildSingle = async (name) => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: resolve(entryDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd'],
        },
        outDir: resolve(outputDir, name),
      },
    })
  );
};

const createPackageJson = (name) => {
  const fileStr = `{
  "name": "${name}",
  "version": "0.0.0",
  "main": "index.umd.js",
  "module": "index.es.js",
  "style": "style.css",
  "types": "../types/${name}/index.d.ts"
}`;

  fsExtra.outputFile(resolve(outputDir, `${name}/package.json`), fileStr, 'utf-8');
};

const buildRun = async () => {
  // await buildAll()
  const components = fs.readdirSync(entryDir).filter((name) => {
    const componentDir = resolve(entryDir, name);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes('index.ts');
  });

  const readyToReleaseComponentName = [];
  for (const name of components) {
    readyToReleaseComponentName.push(name);
    await buildSingle(name);
    createPackageJson(name);
  }

  // 生成global.d.ts
  try {
    execSync(`pnpm run build:components:dts`);
  } catch {}

  logger.success('准备生成global.d.ts');
  fs.writeFileSync(
    './build/index.d.ts',
    `
export * from './types/vue-devui';
import _default from './types/vue-devui';
export default _default;
`
  );
  // const volarSupportbuildState = volarSupport(replaceIdentifier, readyToReleaseComponentName);
}

buildRun();