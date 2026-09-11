import { useAuthStore } from '~~/store/authStore'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  const { isAuthed, initialized } = storeToRefs(auth)

  if (!initialized) {
    await auth.initialize()
  }

  if (!isAuthed) {
    return navigateTo('/login')
  }

  return navigateTo(to)
})
