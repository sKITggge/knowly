import { useAuthStore } from '~~/store/authStore'

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()
  if (!auth.initialized) await auth.initialize()
})
