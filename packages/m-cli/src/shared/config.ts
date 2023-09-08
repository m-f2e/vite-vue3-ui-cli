import { merge } from 'lodash-es'
import type { CliConfig } from '../../types/config'
import { CWD } from './constant';

export const cliConfig: CliConfig = {
  cwd: CWD,
  componentRootDir: '.',
  componentCategories: ['通用', '导航', '反馈', '数据录入', '数据展示', '布局'],
  libPrefix: '',
  libStyleFileSuffix: '.css',
  libClassPrefix: '',
  libEntryRootDir: '.',
  libEntryFileName: 'index',
  version: '0.0.0'
};

export function mergeCliConfig(config: Partial<CliConfig> = {}) {
  return merge(cliConfig, config)
}

// 检查配置
export function detectCliConfig() {
  return cliConfig
}