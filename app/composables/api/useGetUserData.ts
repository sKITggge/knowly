import type { User } from '~~/shared/types'

export const useGetUserData = () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig()

  const getUserData = () => {
    const url = new URL('/users/me', apiBase)

    return $fetch<User>(url.toString(), {
      credentials: 'include',
    })
  }

  return { getUserData }
}
