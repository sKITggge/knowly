<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'
import { useAuthStore } from '~~/store/authStore'

type SignInForm = {
  email: string
  password: string
}

const form = reactive<SignInForm>({
  email: '',
  password: '',
})

const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Укажите email', required),
    email: helpers.withMessage('Некорректный email', email),
  },
  password: {
    required: helpers.withMessage('Введите пароль', required),
    minLength: helpers.withMessage('Минимум 8 символов', minLength(8)),
  },
}))

const v$ = useVuelidate(rules, form, {
  $autoDirty: false,
  $lazy: true,
})

const formError = ref<string | null>(null)
const isSubmitting = ref(false)
const isSuccess = ref(false)

const authStore = useAuthStore()

const handleSubmit = async () => {
  formError.value = null
  isSuccess.value = false

  const ok = await v$.value.$validate()
  if (!ok) return

  isSubmitting.value = true

  try {
    const payload: SignInForm = {
      email: form.email.trim(),
      password: form.password,
    }

    await authStore.signIn(payload)
    isSuccess.value = true

    setTimeout(() => {
      navigateTo('/', { replace: true })
    }, 1000)
  } catch (error) {
    const fetchError = error as Error
    formError.value = fetchError.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen w-full flex items-center justify-center bg-slate-50">
    <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 class="mb-6 text-2xl font-semibold tracking-tight text-slate-900">Sign Up</h1>

      <form class="space-y-4" @submit.prevent="handleSubmit" novalidate>
        <div
          v-if="formError"
          class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          {{ formError }}
        </div>

        <div class="space-y-1.5">
          <label for="email" class="text-sm font-medium text-slate-800">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            class="block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            :class="
              v$.email.$error
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                : 'border-slate-200'
            "
            placeholder="you@example.com"
            @blur="v$.email.$touch()"
          />
          <p v-if="v$.email.$error" class="text-xs text-rose-700">
            {{ v$.email.$errors[0]?.$message }}
          </p>
        </div>

        <div class="space-y-1.5">
          <label for="password" class="text-sm font-medium text-slate-800">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            name="password"
            class="block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            :class="
              v$.password.$error
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                : 'border-slate-200'
            "
            @blur="v$.password.$touch()"
          />
          <p v-if="v$.password.$error" class="text-xs text-rose-700">
            {{ v$.password.$errors[0]?.$message }}
          </p>
        </div>

        <button
          type="submit"
          class="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 transition-colors duration-300"
          :class="
            isSuccess ? 'bg-green-600 hover:bg-green-500' : 'bg-indigo-600 hover:bg-indigo-500'
          "
          :disabled="isSubmitting || v$.$invalid"
        >
          <span v-if="isSubmitting">...</span>
          <span v-else-if="isSuccess">Успех</span>
          <span v-else>Войти</span>
        </button>
      </form>
    </div>
  </main>
</template>
