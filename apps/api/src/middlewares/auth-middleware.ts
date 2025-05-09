import { Request, Response, NextFunction } from 'express'

export function authMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const authHeader = req.headers.authorization

   if (!authHeader || authHeader !== 'Bearer mysecrettoken') {
      return res.status(401).json({ message: 'Unauthorized' })
   }

   next()
}
