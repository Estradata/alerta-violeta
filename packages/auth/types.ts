export type AuthUser = {
  id: string
  email: string
  accountId: string
  name: string

  status: 'BLOCKED' | 'ACTIVE'
  role: 'ADMIN' | 'MEMBER'
}
