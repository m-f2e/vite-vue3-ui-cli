// 生成配置文件
import { existsSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'
import { CWD } from './constant';


export const DEFAULT_CLI_CONFIG_NAME = 'dc.config'
export const DEFAULT_CLI_CONFIG_EXT_NAME = '.ts'
export const DEFAULT_CLI_CONFIG_FILE_NAME = DEFAULT_CLI_CONFIG_NAME + DEFAULT_CLI_CONFIG_EXT_NAME;

export default function generateConfig() {
  const configPath = resolve(CWD, DEFAULT_CLI_CONFIG_FILE_NAME)
  if (existsSync(configPath)) {
    console.error(`Config file ${configPath} already exists.`)
    process.exit(1)
  }
  // writeFileSync(configPath, )
}