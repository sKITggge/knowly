import type { CreateQuestionPayload, Question } from '~~/shared/types'
import { mapStatusToMessage } from '#shared/utils.ts'

export const useQuestions = () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig()

  const addQuestion = (payload: CreateQuestionPayload) => {
    const url = new URL('/questions', apiBase)

    return $fetch<Question>(url.toString(), {
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

  const getQuestions = () => {
    const url = new URL('/questions', apiBase)

    return $fetch<Question[]>(url.toString(), {
      method: 'GET',
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

  return { addQuestion, getQuestions }
}
