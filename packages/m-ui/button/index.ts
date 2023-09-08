import type { App } from 'vue'
import Button from './src/button'

Button.install = function (app: App) {
	app.component(Button.name, Button)
}

export { Button }

export default {
  install(app: App) {
    app.use(Button as any)
  }
}
