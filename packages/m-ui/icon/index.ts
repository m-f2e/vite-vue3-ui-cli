import type { App } from 'vue'
import Icon from './src/icon'
import IconGroup from './src/icon-group'

Icon.install = function (app: App) {
	app.component(Icon.name, Icon)
}

IconGroup.install = function (app: App) {
	app.component(Icon.name, Icon)
}

export { Icon, IconGroup }

export default {
  install(app: App) {
    app.use(Icon as any)
    app.use(IconGroup as any)
  }
}
