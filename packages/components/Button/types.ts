import type {Component, Ref} from 'vue'
export type ButtonType = 'primary' | 'success' | 'waring' | 'danger' | 'info'
export type NativeType = 'button' | 'rest' | 'reset'
export type ButtonSize = 'large' | 'default' | 'small'

export interface ButtonProps {
  tag?: string | Component
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeType
  disabled?: boolean
  loading?: boolean
  icon?: string
  circle?: boolean
  plain?: boolean
  round?: boolean
  autofocus?: boolean
  loadingIcon?: string
  useThrottle?: boolean
  throttleDuration?: number
}

export interface ButtonEmits {
  (e: 'click', val: MouseEvent): void
}

export interface ButtonInstace {
  ref: Ref<HTMLButtonElement | void>
}
