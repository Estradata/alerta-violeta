import { PrismaClient as MySQLPrismaClient } from '@prisma/client'

const sqlClientSingleton = () => {
   return new MySQLPrismaClient({})
}

declare const globalThis: {
   db: ReturnType<typeof sqlClientSingleton>
} & typeof global

export const db = globalThis.db ?? sqlClientSingleton()

if (process.env.NODE_ENV !== 'production') {
   globalThis.db = db
}
