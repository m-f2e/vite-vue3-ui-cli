import { coreClassName, coreRealName, propsName, propsTypesName, typesFileName } from './utils';

export default function genCoreTemplate(name: string) {
  return `\
import { defineComponent } from 'vue'
import type { SetupContext } from 'vue'
import { ${propsName(name)}, ${propsTypesName(name)} } from './${typesFileName(name)}'

export default defineComponent({
  name: '${coreRealName(name)}',
  props: ${propsName(name)},
  emits: [],
  setup(props: ${propsTypesName(name)}, ctx: SetupContext) {
    return () => {
      return (<div class="${coreClassName(name)}"></div>)
    }
  }
})
`;
}