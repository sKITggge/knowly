<script setup lang="ts">
const props = defineProps<{
  label: string
  hint: string
}>()

const colorClass = computed(() => {
  switch (props.label) {
    case 'To do':
      return 'bg-slate-100 text-slate-800 ring-slate-200'
    case 'В процессе':
      return 'bg-blue-50 text-blue-800 ring-blue-200'
    case 'На повторение':
      return 'bg-amber-50 text-amber-900 ring-amber-200'
    case 'Выучено':
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
