export const mapStatusToMessage = (status: number) => {
  switch (status) {
    case 400:
      return 'Некорректный запрос.'
    case 401:
      return 'Вы не авторизованы. Войдите в аккаунт и попробуйте снова.'
    case 403:
      return 'Недостаточно прав для выполнения действия.'
    case 404:
      return 'Ресурс не найден.'
    case 409:
      return 'Пользователь с таким email уже существует.'
    case 422:
      return 'Проверьте правильность заполнения полей.'
    case 500:
      return 'Ошибка сервера. Попробуйте позже.'
    default:
      return 'Не удалось выполнить запрос. Попробуйте ещё раз.'
  }
}

export const getQuestionStatusStyles = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-100 text-emerald-700'
    case 'In Progress':
      return 'bg-blue-100 text-blue-700'
    case 'Revision':
      return 'bg-amber-100 text-amber-700'
    default:
      return 'bg-slate-100 text-slate-600'
  }
}

export const getQuestionCountText = (count: number) => {
  const result = `${count} Вопрос`

  if (count % 10 === 1) return result
  if (count % 10 > 1 && count % 10 < 5) return result + 'а'

  return result + 'ов'
}
