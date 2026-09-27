import type { User } from '~~/shared/types'

export const useGetUserData = () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig()

  const getUserData = () => {
    const url = new URL('/users/me', apiBase)
    const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

    return $fetch<User>(url.toString(), {
      credentials: 'include',
      headers,
    })
  }

  return { getUserData }
}