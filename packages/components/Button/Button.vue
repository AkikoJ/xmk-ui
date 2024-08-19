<script setup lang="ts">
import type { ButtonProps } from './types'
import { ref } from 'vue'

defineOptions({
  name: 'xmkButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button'
})

const slots = defineSlots()
const _ref = ref<HTMLElement>()
</script>
<template>
  <component
    :is="props.tag"
    :type="tag === 'button' ? props.nativeType : void 0"
    :disable="disable || loading ? true : void 0"
    class="xmk-button"
    :class="{
      [`xmk-button-${type}`]: type,
      [`xmk-button-${size}`]: size,
      isplain: plain,
      isround: round,
      iscircle: circle,
      isloading: loading,
      isdisable: disable
    }"
  >
    <slot></slot>
  </component>
</template>
./types
