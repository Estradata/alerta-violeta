import { db } from '@/lib/db'
import { Admin } from '@prisma/client'

export async function checkIsAdminEmailTaken(
  email: string
): Promise<Admin | null> {
  const admin = await db.admin.findFirst({
    where: {
      email,
    },
  })

  return admin
}
