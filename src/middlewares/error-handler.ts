import { Request, Response, NextFunction } from 'express'
import { ErrorCode } from '../error-handler/error-code'
import { ErrorException } from '../error-handler/error-exception'
import { ErrorModel } from '../models/error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorException) {
    console.log('Error is known.')
    res.status(err.statusCode).send(err)
  } else {
    // For unhandled errors.
    res.status(500).send({ name: ErrorCode.UNKNOWN_ERROR, statusCode: 500 } as ErrorModel)
  }
}
