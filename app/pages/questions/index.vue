<script setup lang="ts">
import { useQuestions } from '~/composables/api/useQuestions'
import type { Question } from '~~/shared/types'
import { getQuestionCountText, getQuestionStatusStyles } from '~~/shared/utils'

const { getQuestions } = useQuestions()

const {
  data: questions,
  pending,
  error,
  refresh,
} = await useAsyncData('questions', () => getQuestions(), {
  default: () => [],
})

const errorMessage = computed(() => {
  if (!error.value) return null
  return error.value.message || 'Не удалось загрузить вопросы. Попробуйте ещё раз.'
})

const isEmpty = computed(() => !pending.value && !error.value && (questions.value?.length ?? 0) === 0)

const questionCount = computed(() => {
  getQuestionCountText(questions.value.length)
})

const getFormattedDate = (date_string: string) => {
  const date = new Date(date_string)

  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

onMounted(async () => {
  questions.value = await getQuestions()
})
</script>

<template>
  <div class="min-h-full bg-slate-50 p-6">
    <div class="mb-6 flex items-start justify-between">
      <div>
        <span class="text-md text-slate-400 uppercase">
          {{ questionCount }}
        </span>
        <h1 class="text-4xl font-bold">Вопросы</h1>
      </div>

      <NuxtLink
        to="/questions/create"
        class="mb-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        Добавить вопрос
      </NuxtLink>
    </div>

    <div v-if="pending" class="rounded-2xl border border-slate-200 bg-white p-4">
      <div class="space-y-3">
        <div v-for="i in 6" :key="i" class="h-10 animate-pulse rounded-xl bg-slate-100" />
      </div>
    </div>

    <div
      v-else-if="errorMessage"
      class="rounded-2xl border border-rose-200 bg-rose-50 p-4"
    >
      <div class="text-sm font-semibold text-rose-900">Ошибка загрузки</div>
      <div class="mt-1 text-sm text-rose-800">{{ errorMessage }}</div>
      <button
        type="button"
        class="mt-4 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
        @click="refresh()"
      >
        Повторить
      </button>
    </div>

    <div
      v-else-if="isEmpty"
      class="rounded-2xl border border-slate-200 bg-white p-6 text-center"
    >
      <h2 class="text-base font-semibold text-slate-900">Пока нет вопросов</h2>
      <p class="mt-1 text-sm text-slate-600">
        Создайте первый вопрос и начните изучение.
      </p>
    </div>

    <div v-else class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table class="w-full text-left">
        <thead class="border-b border-slate-200 bg-slate-50">
          <tr>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Вопрос</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Статус</th>
            <th class="px-6 py-4 text-sm font-semibold text-slate-600">Создано</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="(item, index) in questions"
            :key="index"
            class="transition-colors hover:bg-slate-50"
          >
            <td class="flex flex-col gap-1 px-6 py-4 text-sm font-medium text-slate-800">
              <span class="text-md font-semibold">{{ item.title }}</span>
              <span class="text-xs text-slate-500">{{ item.topic_id || 'Без темы' }}</span>
            </td>

            <td class="px-6 py-4">
              <span
                class="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                :class="getQuestionStatusStyles(item.status)"
              >
                {{ item.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-sm text-slate-500">
              {{ getFormattedDate(item.created_at) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
