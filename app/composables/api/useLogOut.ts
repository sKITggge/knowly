export const useLogOut = () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig()

  const logOut = () => {
    const url = new URL('/users/logout', apiBase)

    return $fetch(url.toString(), {
      method: 'POST',
      credentials: 'include',
    })
  }

  return { logOut }
}
