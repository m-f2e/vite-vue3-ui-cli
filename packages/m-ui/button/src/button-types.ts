import type { PropType, ExtractPropTypes, ComputedRef, Ref, InjectionKey } from 'vue'

export type TButtonVariant = 'solid' | 'outline' | 'text'
export type TButtonColor = 'secondary' | 'primary' | 'danger' | 'default'
export type TButtonSize = 'lg' | 'md' | 'sm'
export type TButtonShape = 'round' | 'circle'

export const buttonProps = {
  variant: {
    type: String as PropType<TButtonVariant>,
    default: 'outline'
  },
  size: {
    type: String as PropType<TButtonSize>,
    default: 'md'
  },
  color: {
    type: String as PropType<TButtonColor>,
    default: 'default'
  },
  icon: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  shape: {
    type: String as PropType<TButtonShape>,
  }
} as const

export const buttonGroupProps = {
  size: {
    type: String as PropType<TButtonSize>,
    default: 'md',
  }
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export interface UseButtonReturnType {
  classes: ComputedRef<{ [key: string]: string | boolean }>,
  iconClass: ComputedRef<string>
}

interface ButtonGroupInjection {
  size: Ref<TButtonSize>
}

export const buttonGroupInjectionKey: InjectionKey<ButtonGroupInjection> = Symbol('m-button-group')
