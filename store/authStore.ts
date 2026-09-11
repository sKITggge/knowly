import { defineStore } from 'pinia'
import { useGetUserData } from '../app/composables/api/useGetUserData'
import { useLogOut } from '../app/composables/api/useLogOut'
import { useSignIn } from '../app/composables/api/useSignIn'
import { useSignUp } from '../app/composables/api/useSignUp'
import type { User, SignInPayload, SignUpPayload } from '~~/shared/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthed = computed(() => user.value !== null)

  const initialized = ref(false)

  const { getUserData } = useGetUserData()
  const { signIn: signInRequest } = useSignIn()
  const { signUp: signUpRequest } = useSignUp()
  const { logOut: logOutRequest } = useLogOut()

  const signIn = async (payload: SignInPayload) => {
    initialized.value = true
    user.value = await signInRequest(payload)
  }

  const signUp = async (payload: SignUpPayload) => {
    initialized.value = true
    user.value = await signUpRequest(payload)
  }

  const logOut = async () => {
    await logOutRequest()
    initialized.value = true
    user.value = null
  }

  const initialize = async () => {
    try {
      user.value = await getUserData()
    } catch (еrror) {
      user.value = null
    } finally {
      initialized.value = true
    }
  }

  return {
    user,
    isAuthed,
    initialized,
    initialize,
    signIn,
    signUp,
    logOut,
  }
})
