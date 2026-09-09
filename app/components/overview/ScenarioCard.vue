<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h3 class="text-base font-semibold text-slate-900">{{ title }}</h3>
    <div class="mt-3">
      <slot />
    </div>
  </div>
</template>
