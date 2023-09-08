import type { App } from 'vue'
import ButtonInstall, { Button } from './button'

const installs = [
  ButtonInstall,
]

export {
  Button,
}

export default {
  version: '0.0.1',
  install(app: App): void {
    installs.forEach((p) => app.use(p as any))
  }
}