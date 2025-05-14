import env from 'dotenv'
env.config()

export const JWT_SECRET_APP = process.env.JWT_SECRET_APP as string
export const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN as string
