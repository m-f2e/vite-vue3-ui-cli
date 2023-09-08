import { defineComponent, toRefs } from 'vue'
import type { SetupContext } from 'vue'
import { buttonProps, ButtonProps } from './button-types'
import useButton from './use-button';
import { Icon } from '../../icon';
import './button.scss';

export default defineComponent({
  name: 'MButton',
  props: buttonProps,
  emits: ['click'],
  setup(props: ButtonProps, ctx: SetupContext) {
    const { icon, disabled, loading } = toRefs(props)
    const { classes, iconClass } = useButton(props, ctx);

    const onClick = (e: MouseEvent) => {
      if (loading.value) {
        return
      }
      ctx.emit('click', e)
    }
    return () => {
      return (
        <button class={classes.value} disabled={disabled.value} onClick={onClick}>
          {icon.value && <Icon name={icon.value} size="var(--devui-font-size, 12px)" color="" class={iconClass.value} />}
          <div class="loading-icon__container" v-show={loading.value}>
            <Icon name="icon-loading" class="button-icon-loading" color="#BBDEFB"></Icon>
          </div>
          <span class="button-content">{ctx.slots.default?.()}</span>
        </button>
      )
    }
  }
})
