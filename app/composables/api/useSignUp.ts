import { mapStatusToMessage } from '~~/shared/utils'
import type { SignUpPayload, User } from '~~/shared/types'

export const useSignUp = () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig()

  const signUp = (payload: SignUpPayload) => {
    const url = new URL('/users', apiBase)

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

  return { signUp }
}
