import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
// import MButton from '../../../m-ui/button'
import MButton from '@m-ui/button'


// 组件注册
const components = [
  MButton,
]

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    useComponents(app)
    components.forEach((component) => {
      app.use(component)
    })
  }
}