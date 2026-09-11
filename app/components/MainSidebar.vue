<script setup lang="ts">
import { useAuthStore } from '~~/store/authStore'

const auth = useAuthStore()
const { logOut } = auth

const navLinks: { label: string; href: string; icon: string }[] = [
  { label: 'Обзор', href: '/', icon: 'material-symbols:docs-outline' },
  { label: 'Вопросы', href: '/questions', icon: 'material-symbols:live-help-outline' },
  { label: 'Канбан', href: '/dashboard', icon: 'material-symbols:view-kanban-outline' },
  { label: 'Изучение', href: '/learning', icon: 'material-symbols:star-shine-outline' },
  { label: 'Создать вопрос', href: '/', icon: 'material-symbols:add-box-outline-rounded' },
]

const userInitials = computed(() => {
  const email = auth?.user?.email?.trim() ?? ''
  return email ? email.charAt(0).toUpperCase() : 'U'
})
</script>

<template>
  <aside
    class="h-screen sticky top-0 left-0 p-4 border-r border-gray-300 flex flex-col shrink-0 gap-8 w-64"
  >
    <a class="flex items-center gap-2" href="/">
      <span
        class="w-8 h-8 flex items-center justify-center rounded-md text-white text-2xl font-bold bg-indigo-600"
      >
        K
      </span>
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

    <div class="mt-auto">
      <div class="h-px w-full bg-slate-200 mb-4" />

      <div
        v-if="auth.isAuthed && auth.user?.email"
        class="rounded-2xl border border-slate-200 bg-slate-50 p-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold"
          >
            {{ userInitials }}
          </div>

          <div class="min-w-0">
            <div class="text-xs text-slate-500">Вы вошли как</div>
            <div class="truncate text-sm font-semibold text-slate-900">
              {{ auth.user.email }}
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="logOut"
          class="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 transition"
        >
          Выйти
        </button>
      </div>

      <div v-else class="rounded-2xl border border-slate-200 bg-white p-4">
        <div class="text-sm font-semibold text-slate-900">Добро пожаловать</div>
        <div class="mt-1 text-xs leading-5 text-slate-500">
          Войдите, чтобы сохранять прогресс и управлять вопросами.
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2">
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition"
          >
            Sign In
          </NuxtLink>

          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
          >
            Sign Up
          </NuxtLink>
        </div>
      </div>
    </div>
  </aside>
</template>
