import { extname, relative, resolve } from 'path'
import { existsSync, readdirSync, unlinkSync } from 'fs-extra'
import { camelCase, upperFirst } from 'lodash-es'
import { buildSync } from 'esbuild'
import { cliConfig } from './config'
import { coreFileName } from '../templates/component/utils';
import { PKG_NAME } from './constant';

export function onPromptsCancel() {
  throw new Error('Operation cancelled.');
}

export function resolveComponentDir(name: string) {
  return resolve(cliConfig.cwd, cliConfig.componentRootDir, coreFileName(name));
}
export function bigCamelCase(str: string) {
  return upperFirst(camelCase(str));
}

export function canSafelyOverwrite(dir: string) {
  return !existsSync(dir) || readdirSync(dir).length === 0;
}

export function dynamicImport(path: string) {
  const tempPath = path.replace(extname(path), Date.now() + '.js')
  const relativePath = relative(__dirname, tempPath)

  buildSync({
    bundle: true,
    entryPoints: [path],
    outfile: tempPath,
    platform: 'node',
    format: 'cjs',
    external: ['esbuild', PKG_NAME]
  });
  
  const config = require(relativePath).default ?? {};
  unlinkSync(tempPath);

  return config;
}