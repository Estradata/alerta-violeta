export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorProps {
  description?: string
  httpCode?: HttpCode
  name?: string
  data?: object
}

export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: HttpCode
  public readonly description?: string
  public readonly data?: object

  constructor({ description, httpCode, name, data }: AppErrorProps) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.description = description
    this.name = name || 'Error'

    if (data) {
      this.data = data
    }

    this.httpCode = httpCode ?? HttpCode.INTERNAL_SERVER_ERROR

    Error.captureStackTrace(this)
  }
}

export class CredentialsError extends AppError {
  constructor() {
    super({
      httpCode: HttpCode.UNAUTHORIZED,
      name: 'CredentialsError',
    })
  }
}

export class UnauthorizedError extends AppError {
  constructor(description?: string) {
    super({
      httpCode: HttpCode.UNAUTHORIZED,
      name: 'UnauthorizedError',
      description: description ?? 'La operación solicitada no está autorizada',
    })
  }
}

export class TokenError extends AppError {
  constructor() {
    super({
      name: 'TokenError',
      description: 'Token de acceso inválido',
      httpCode: HttpCode.UNAUTHORIZED,
    })
  }
}

export class NotFoundError extends AppError {
  constructor() {
    super({
      httpCode: HttpCode.NOT_FOUND,
      name: 'NotFoundError',
      description: 'El recurso solicitado no pudo ser encontrado',
    })
  }
}

export class ValidationError extends AppError {
  constructor(data?: Record<string, string>) {
    super({
      httpCode: HttpCode.BAD_REQUEST,
      name: 'ValidationError',
      data,
    })
  }
}
