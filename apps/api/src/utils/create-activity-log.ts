import { db } from '@/lib/db'
import { PermissionModule } from '@prisma/client'

type Action = 'UPDATE' | 'CREATE'

export async function createActivityLog(data: {
  action: Action
  adminId: string
  description: string
  module?: PermissionModule
}) {
  await db.activityLog.create({
    data,
  })
}
