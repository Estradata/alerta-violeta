export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorProps {
  description: string
  httpCode?: HttpCode
  name?: string
  body?: object
  data?: object
}

export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: HttpCode
  public readonly description: string
  public readonly body?: object
  public readonly data?: object

  constructor({ description, httpCode, name, body, data }: AppErrorProps) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.description = description
    this.name = name || 'Error'

    if (body) {
      this.body = body
    }

    if (data) {
      this.data = data
    }

    this.httpCode = httpCode ?? HttpCode.INTERNAL_SERVER_ERROR

    Error.captureStackTrace(this)
  }
}

export class UnauthorizedError extends AppError {
  constructor(description?: string) {
    super({
      httpCode: HttpCode.UNAUTHORIZED,
      name: 'UnauthorizedError',
      description: description ?? 'The operation requested was not authorized',
    })
  }
}

export class NotFoundError extends AppError {
  constructor() {
    super({
      httpCode: HttpCode.NOT_FOUND,
      name: 'NotFoundError',
      description: 'The request resource could not be found',
    })
  }
}

export class ValidationError extends AppError {
  constructor(data?: Record<string, string>) {
    super({
      httpCode: HttpCode.NO_CONTENT,
      name: 'ValidationError',
      description: 'The request resource could not be found',
      data,
    })
  }
}
