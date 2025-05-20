import { db } from '@/lib/db'

export async function checkIsUserEmailTaken(email: string) {
  const record = await db.user.findFirst({
    where: {
      email,
    },
  })

  return !record
}
