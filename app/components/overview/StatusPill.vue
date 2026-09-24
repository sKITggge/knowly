<script setup lang="ts">
import type { Status } from '~~/shared/types'

const props = defineProps<{
  label: string
  hint: string
  status: Status
}>()

const colorClass = computed(() => {
  switch (props.status) {
    case 'todo':
      return 'bg-slate-100 text-slate-800 ring-slate-200'
    case 'inProgress':
      return 'bg-blue-50 text-blue-800 ring-blue-200'
    case 'review':
      return 'bg-amber-50 text-amber-900 ring-amber-200'
    case 'learned':
      return 'bg-emerald-50 text-emerald-900 ring-emerald-200'
    default:
      return 'bg-slate-100 text-slate-800 ring-slate-200'
  }
})
</script>

<template>
  <div :class="['rounded-xl p-3 ring-1', colorClass]">
    <div class="text-sm font-semibold">{{ label }}</div>
    <div class="mt-0.5 text-xs opacity-80">{{ hint }}</div>
  </div>
</template>
