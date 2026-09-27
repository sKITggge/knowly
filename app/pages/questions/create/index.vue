<script setup lang="ts">
import type { JSONContent } from '@tiptap/vue-3'
import { useQuestions } from '~/composables/api/useQuestions'
import type { CreateQuestionPayload } from '~~/shared/types'

type FormState = {
  title: string
  tags: string
  answer: JSONContent | null
}

const form = reactive<FormState>({
  title: '',
  tags: '',
  answer: null,
})

const { addQuestion } = useQuestions()

const isSubmitting = ref(false)
const formError = ref<string | null>(null)
const fieldErrors = reactive<{ title?: string; answer?: string }>({})

const validate = () => {
  fieldErrors.title = undefined
  fieldErrors.answer = undefined

  if (!form.title.trim()) fieldErrors.title = 'Введите заголовок вопроса'
  if (!form.answer) fieldErrors.answer = 'Добавьте ответ'

  return !fieldErrors.title && !fieldErrors.answer
}

const handleSubmit = async () => {
  formError.value = null
  if (!validate()) return

  isSubmitting.value = true
  try {
    const payload: CreateQuestionPayload = {
      title: form.title,
      topic_id: null,
      answer: form.answer,
    }
    await addQuestion(payload)

    await navigateTo(`/questions`, { replace: true })
  } catch(e) {
    formError.value = (e as Error).message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-full bg-slate-50 p-6">
    <div class="mb-6">
      <span class="text-md text-slate-400 uppercase"> Создание </span>
      <h1 class="text-4xl font-bold">новый вопрос</h1>
    </div>

    <form
      class="rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-3 space-y-3"
      @submit.prevent="handleSubmit"
    >
      <div class="flex justify-between gap-4">
        <div class="flex-1">
          <label for="question" class="block text-sm font-semibold text-slate-500">Вопрос</label>
          <input
            id="question"
            v-model="form.title"
            type="text"
            class="mt-2 h-8 block w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div class="flex-1">
          <label for="topic" class="block text-sm font-semibold text-slate-500">Тема</label>
          <input
            id="topic"
            type="text"
            class="mt-2 h-8 block w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label for="tags" class="block text-sm font-semibold text-slate-500">Теги</label>
        <input
          v-model="form.tags"
          id="tags"
          type="text"
          class="mt-2 h-8 block w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="answer" class="block text-sm font-semibold text-slate-500">Ответ</label>
        <RichTextEditor id="answer" v-model="form.answer" />
      </div>

      <button
        type="submit"
        class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        Создать вопрос
      </button>
    </form>
  </div>
</template>
