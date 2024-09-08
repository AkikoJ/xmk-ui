<script setup lang="ts">
import type {ButtonProps, ButtonEmits, ButtonInstace} from './types'
import {throttle} from 'lodash-es'
import {ref, computed} from 'vue'
import XmkIcon from '../Icon/Icon.vue'
defineOptions({
  name: 'xmkButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500
})

const emits = defineEmits<ButtonEmits>()
const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()
const iconStyle = computed(() => ({marginRight: slots.default ? '6px' : 0}))
const handleBtnClick = (e: MouseEvent) => emits('click', e)

const handlBtneCLickThrottle = throttle(handleBtnClick, props.throttleDuration)

defineExpose<ButtonInstace>({
  ref: _ref
})
</script>
<template>
  <component
    :is="tag"
    ref="_ref"
    :autofocus="autofocus"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    class="xmk-button"
    :class="{
      [`xmk-button--${type}`]: type,
      [`xmk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-loading': loading,
      'is-disabled': disabled
    }"
    @click="(e: MouseEvent) => (useThrottle ? handlBtneCLickThrottle(e) : handleBtnClick(e))"
  >
    <template v-if="loading">
      <slot name="loading">
        <Xmk-Icon class="loading-cion" :icon="loadingIcon ?? 'spinner'" :style="iconStyle" size="1x" spin />
      </slot>
    </template>
    <Xmk-Icon v-if="icon && !loading" :icon="icon" size="1x" :style="iconStyle" />
    <slot></slot>
  </component>
</template>

<style scoped>
@import './style.css';
</style>
