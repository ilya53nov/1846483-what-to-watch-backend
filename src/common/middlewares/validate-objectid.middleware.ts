import mongoose from 'mongoose';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';
import { Middleware } from '../../types/middleware.enum.js';
import { MiddlewareErrorMessage } from './middleware-error-message.enum.js';

const {Types} = mongoose;

export class ValidateObjectIdMiddleware implements MiddlewareInterface {
  constructor(private param: string) {}

  public execute({params}: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} ${MiddlewareErrorMessage.ValidateObjectId}`,
      Middleware.ValidateObjectId
    );
  }
}
