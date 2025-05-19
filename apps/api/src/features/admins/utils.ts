import { db } from '@/lib/db'

export async function checkIsAdminEmailAvailable(email: string) {
  const record = await db.admin.findFirst({
    where: {
      email,
    },
  })

  return !record
}
