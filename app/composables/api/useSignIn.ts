import type { SignInPayload, User } from '~~/shared/types'
import { mapStatusToMessage } from '~~/shared/utils'

export const useSignIn = () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig()

  const signIn = (payload: SignInPayload) => {
    const url = new URL('/users/login', apiBase)

    return $fetch<User>(url.toString(), {
      method: 'POST',
      body: payload,
      credentials: 'include',

      onResponseError({ response }) {
        const message = mapStatusToMessage(response.status)
        throw new Error(message)
      },

      onRequestError() {
        throw new Error('Сервер недоступен. Попробуйте еще раз позже.')
      },
    })
  }

  return { signIn }
}
