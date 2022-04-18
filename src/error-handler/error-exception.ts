import { ErrorCode } from './error-code'
import { HttpStatusCode } from '../enums/http-status-code'

export class ErrorException extends Error {
  public statusCode
  public description = ''

  constructor(name: string = ErrorCode.UNKNOWN_ERROR, description = '') {
    super(name)
    // restore prototype chain
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.statusCode = HttpStatusCode.INTERNAL_SERVER
    this.description = description

    switch (name) {
      case ErrorCode.UNAUTHENTICATED:
        this.statusCode = HttpStatusCode.UNAUTHORIZED
        break;
      case ErrorCode.NOT_FOUND:
        this.statusCode = HttpStatusCode.NOT_FOUND
        break;
      case ErrorCode.DUPLICATE_ENTITY_ERROR:
        this.statusCode = HttpStatusCode.CONFLICT
        break;
      default:
        break
    }
  }
}
