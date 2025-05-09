import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export function validationMiddleware(schema: z.ZodObject<any, any>) {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
}
