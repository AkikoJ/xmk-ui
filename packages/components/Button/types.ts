import type { Component } from 'vue'
export type ButtonType = 'primary' | 'success' | 'waring' | 'danger' | 'info'
export type NativeType = 'button' | 'rest' | 'reset'
export type ButtonSize = 'large' | 'default' | 'small'

export interface ButtonProps {
  tag?: string | Component
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeType
  disable?: boolean
  loading?: boolean
  icon?: string
  circle?: boolean
  plain?: boolean
  round?: boolean
}
