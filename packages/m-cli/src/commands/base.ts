import { existsSync, statSync } from 'fs-extra'
import { dirname, extname, isAbsolute, resolve } from 'path'
import { CWD } from '../shared/constant'
import logger from '../shared/logger'
import { mergeCliConfig } from '../shared/config';
import { dynamicImport, onPromptsCancel } from '../shared/utils';

export type BaseCmd = {
  init?: boolean
  config?: string
}

export function loadCliConfig(cmd: Pick<BaseCmd, 'config'>) {
  if (!cmd.config) {
    return
  }
  const configPath = resolve(CWD, cmd.config)
  if (!existsSync(configPath)) {
    logger.error(`The path "${configPath}" not exist.`);
    process.exit(1);
  }
  
  if (statSync(configPath).isDirectory() || !['.js', '.ts'].includes(extname(configPath))) {
    logger.error(`The path "${configPath}" is not a ".js" or ".ts" file.`);
    process.exit(1);
  }

  const config = dynamicImport(configPath);
  if (config.cwd && !isAbsolute(config.cwd)) {
    config.cwd = resolve(dirname(configPath), config.cwd);
  }

  mergeCliConfig(config);
}