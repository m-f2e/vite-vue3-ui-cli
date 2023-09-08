import { camelCase, kebabCase } from 'lodash-es';
import { bigCamelCase } from '../../shared/utils';
import { cliConfig } from '../../shared/config';

// 驼峰格式，转中划线
export const coreFileName = (name: string) => kebabCase(name);
export const directiveFileName = (name: string) => kebabCase(name + '-directive');
export const serviceFileName = (name: string) => kebabCase(name + '-service');
export const typesFileName = (name: string) => kebabCase(name + '-types');

export const getRealLibPrefix = () => (cliConfig.libPrefix ? cliConfig.libPrefix + '-' : '');
export const getRealClassPrefix = () =>
  cliConfig.libClassPrefix ? cliConfig.libClassPrefix + '-' : '';

export const coreName = (name: string) => bigCamelCase(name);
export const coreRealName = (name: string) => bigCamelCase(getRealLibPrefix() + name);
export const coreClassName = (name: string) => kebabCase(getRealClassPrefix() + name);
export const propsName = (name: string) => camelCase(name + 'Props');
export const propsTypesName = (name: string) => bigCamelCase(name + 'Props');
export const serviceName = (name: string) => bigCamelCase(name + 'Service');
export const directiveName = (name: string) => bigCamelCase(name + 'Directive');
