<script setup lang="ts">
defineProps<{
  k: string
  v: string
}>()
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-4">
    <div class="text-xs font-semibold text-slate-500">{{ k }}</div>
    <div class="mt-1 text-sm font-semibold text-slate-900">{{ v }}</div>
  </div>
</template>
