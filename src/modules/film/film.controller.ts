import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController...');

    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/promo', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/filmId', method: HttpMethod.Put, handler: this.index});
    this.addRoute({path: '/filmId', method: HttpMethod.Delete, handler: this.index});
    this.addRoute({path: '/filmId', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/filmId/comments', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/filmId/comments', method: HttpMethod.Post, handler: this.index});
  }

  public index(_req: Request, _res: Response): void {
    throw new Error('Not implemented');
  }

  public create(_req: Request, _res: Response): void {
    throw new Error('Not implemented');
  }
}
