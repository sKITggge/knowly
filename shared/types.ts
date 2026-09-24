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
