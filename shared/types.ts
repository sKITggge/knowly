import { type JSONContent } from '@tiptap/vue-3'

export interface User {
  id: string
  email: string
  created_at: string
}

export type SignInPayload = {
  email: string
  password: string
}

export type SignUpPayload = {
  email: string
  password: string
}

export type Status = 'todo' | 'inProgress' | 'review' | 'learned'

export type CreateQuestionPayload = {
  title: string
  topic_id: string | null
  answer: JSONContent | null
}

export interface Question {
  id: string
  topic_id: string
  title: string
  answer: string
  status: string
  created_at: string
}
