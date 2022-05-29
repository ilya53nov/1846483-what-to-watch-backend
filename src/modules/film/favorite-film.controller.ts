import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';

@injectable()
export default class FavoriteFilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteFilmController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/filmId', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/filmId', method: HttpMethod.Delete, handler: this.index});
  }

  public index(_req: Request, _res: Response): void {
    throw new Error('Not implemented');
  }

  public create(_req: Request, _res: Response): void {
    throw new Error('Not implemented');
  }
}
