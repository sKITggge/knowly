<script setup lang="ts">
const navLinks: { label: string; href: string; icon: string }[] = [
  {
    label: 'Обзор',
    href: '/',
    icon: 'material-symbols:docs-outline',
  },
  {
    label: 'Вопросы',
    href: '/questions',
    icon: 'material-symbols:live-help-outline',
  },
  {
    label: 'Канбан',
    href: '/dashboard',
    icon: 'material-symbols:view-kanban-outline',
  },
  {
    label: 'Изучение',
    href: '/learning',
    icon: 'material-symbols:star-shine-outline',
  },
  {
    label: 'Создать вопрос',
    href: '/',
    icon: 'material-symbols:add-box-outline-rounded',
  },
]
</script>

<template>
  <aside class="h-screen sticky top-0 left-0 p-4 border-r border-gray-300 flex flex-col gap-8 w-64">
    <a class="flex items-center gap-2" href="/">
      <span
        class="w-8 h-8 flex items-center justify-center rounded-md text-white text-2xl font-bold bg-indigo-600"
        >K</span
      >
      <span class="text-xl font-bold">Knowly</span>
    </a>

    <ul class="flex flex-col gap-2">
      <li class="w-full" v-for="item in navLinks" :key="item.label">
        <a
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg border-none hover:bg-indigo-100 border-2 transition duration-200"
          :href="item.href"
        >
          <Icon :name="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>
