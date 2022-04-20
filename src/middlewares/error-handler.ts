import { Request, Response, NextFunction } from 'express'
import { ErrorCode } from '../error-handler/error-code'
import { ErrorException } from '../error-handler/error-exception'
import logger from '../lib/logger'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err)
  if (err instanceof ErrorException) {
    res.status(err.statusCode).send({ name: err.name, statusCode: err.statusCode, description: err.description})
  } else {
    // For unhandled errors.
    res.status(500).send({ name: ErrorCode.UNKNOWN_ERROR, statusCode: 500 })
  }
}
