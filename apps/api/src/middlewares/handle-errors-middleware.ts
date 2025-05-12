import {
  AppError,
  HttpCode,
  NotFoundError,
  ValidationError,
} from '@/lib/errors'
import type { NextFunction, Response } from 'express'
import { ZodError } from 'zod'

type Handler = (error: Error) => AppError
const ERRORS: Record<string, Handler> = {
  JsonWebTokenError: () => {
    return new AppError({
      description: 'Token de acceso inválido',
      httpCode: HttpCode.UNAUTHORIZED,
    })
  },

  CastError: () => {
    return new AppError({
      description: 'Solicitud incorrecta',
      httpCode: HttpCode.BAD_REQUEST,
    })
  },

  NotFoundError: () => {
    return new NotFoundError()
  },

  defaultError: (error) => {
    console.log('Unhandled error: ', error.name, error.message)

    return new AppError({
      description: 'Ocurrió un error inesperado, intente denuevo',
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    })
  },
}

export function isZodError(err: unknown): err is ZodError {
  return Boolean(
    err && (err instanceof ZodError || (err as ZodError).name === 'ZodError')
  )
}

function handleErrors(
  error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  /**
   * Manual throwed error
   */
  if (error instanceof AppError) {
    res.status(error.httpCode).send(error)
    return
  }

  if (isZodError(error)) {
    const data: Record<string, string> = {}

    for (const issue of error.errors) {
      data[`${issue.path.join('.')}`] = issue.message
    }

    const customError = new ValidationError(data)

    res.status(customError.httpCode).send(customError)
    return
  }

  const handler = ERRORS[error.name] || ERRORS.defaultError
  const customError = handler(error)
  res.status(customError.httpCode).send(customError)
}

export default handleErrors
