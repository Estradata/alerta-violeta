import env from 'dotenv'
env.config()

export const JWT_SECRET = process.env.JWT_SECRET as string