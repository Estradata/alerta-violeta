import { db } from '@/lib/db'

export async function checkIsEmailAvailable(email: string) {
   const record = await db.user.findFirst({
      where: {
         email,
      },
   })

   return !record
}
