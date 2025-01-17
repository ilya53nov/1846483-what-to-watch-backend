import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';
import { createSecretKey } from 'crypto';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';
import { UTF_8 } from '../../const.js';
import { Middleware } from '../../types/middleware.enum.js';
import { MiddlewareErrorMessage } from './middleware-error-message.enum.js';

export class AuthenticateMiddleware implements MiddlewareInterface {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const {payload} = await jose.jwtVerify(token, createSecretKey(this.jwtSecret, UTF_8));
      req.user = { email: payload.email as string, id: payload.id as string };

      return next();
    } catch {

      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        MiddlewareErrorMessage.Authenticate,
        Middleware.Authenticate)
      );
    }
  }
}
