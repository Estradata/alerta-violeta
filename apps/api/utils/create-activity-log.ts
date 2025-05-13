import { db } from '@/lib/db'

export async function createActivityLog() {
  await db.activityLog.create({
    data: {
      module: '',
      description: '',
      type: '',
    },
  })
}
