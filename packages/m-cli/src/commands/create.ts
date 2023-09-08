import prompts from 'prompts';
import logger from '../shared/logger'
import { loadCliConfig } from './base';
import { onPromptsCancel } from '../shared/utils';
import createComponentAction from './create-component';
import createLibEntryAction from './create-lib-entry';

export type CreateCMD = {
  config?: string
  type?: string
  core?: boolean
  service?: boolean
  directive?: boolean
  force?: boolean
}

const CREATE_TYPE_ACTION: { [key: string]: (args: string[], options: CreateCMD) => void } = {
  'component': createComponentAction,
  'lib-entry': createLibEntryAction
};

const CREATE_TYPES = ['component', 'component-test', 'component-doc', 'lib-entry', 'doc-nav']
const UNFINISHED_CREATE_TYPES = ['component-test', 'component-doc', 'doc-nav'];

export function validateCreateType(type: string) {
  const valid = CREATE_TYPES.includes(type)
  if (!valid) {
    logger.error('create type error!')
    logger.info(`Optional type list: ${CREATE_TYPES.map((type) =>
      UNFINISHED_CREATE_TYPES.includes(type) ? `${type}(Unfinished)` : type
    ).join(', ')}`)
  }
  return valid ? type : ''
}

export default async function createAction(args: string[] = [], options: CreateCMD = {}) {
  // 加载配置文件
  loadCliConfig(options)

  let { type } = options
  if (!type) {
    try {
      const result = await prompts([
        {
          name: 'type',
          type: 'select',
          message: 'Select create type.',
          choices: CREATE_TYPES.map((value, index) => ({ title: value, value, selected: index === 0 })),
        }
      ], {
        onCancel: onPromptsCancel 
      })
      type = result.type
    } catch (error: any) {
      logger.error(error.message)
      process.exit(1)
    }
  }

  const action: (args: string[], options: CreateCMD) => void = CREATE_TYPE_ACTION[type!]
  if (action) {
    action(args, options)
  } else {
    logger.error(`Unknown create type: ${type}`)
  }
}


