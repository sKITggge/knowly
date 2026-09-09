<script setup lang="ts">
defineProps<{
  title: string
  desc: string
  to: string
  badge: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="text-base font-semibold text-slate-900 group-hover:text-indigo-700">
          {{ title }}
        </div>
        <p class="mt-2 text-sm leading-6 text-slate-600">
          {{ desc }}
        </p>
      </div>

      <span
        class="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200"
      >
        {{ badge }}
      </span>
    </div>

    <div class="mt-4 text-sm font-semibold text-indigo-600">Открыть →</div>
  </NuxtLink>
</template>
