import {StatusCodes} from 'http-status-codes';
import {NextFunction, Request, Response} from 'express';

import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';
import { Middleware } from '../../types/middleware.enum.js';
import { MiddlewareErrorMessage } from './middleware-error-message.enum.js';

export class PrivateRouteMiddleware implements MiddlewareInterface {
  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {

    if (!req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        MiddlewareErrorMessage.PrivateRoute,
        Middleware.PrivateRoute
      );
    }

    return next();
  }
}
