import 'reflect-metadata';
import {injectable} from 'inversify';
import {Response, Router} from 'express';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';

import {LoggerInterface} from '../logger/logger.interface.js';
import {RouteInterface} from '../../types/route.interface.js';
import {ControllerInterface} from './controller.interface.js';
import { ConfigInterface } from '../config/config.interface.js';
import { UnknownObject } from '../../types/unknown-object.type.js';
import { getFullServerPath, transformObject } from '../../utils/common.js';
import { STATIC_RESOURCE_FIELDS } from '../../app/application.constant.js';
import { APPLICATION_JSON } from '../../const.js';

@injectable()
export abstract class Controller implements ControllerInterface {
  private readonly _router: Router;

  constructor(
    protected readonly logger: LoggerInterface,
    protected readonly configService: ConfigInterface
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteInterface) {
    const routeHandler = asyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map(
      (middleware) => asyncHandler(middleware.execute.bind(middleware))
    );

    const chainHandlers = middlewares ? [...middlewares, routeHandler] : routeHandler;
    this._router[route.method](route.path, chainHandlers);

    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  protected addStaticPath(data: UnknownObject): void {
    const fullServerPath = getFullServerPath(this.configService.get('HOST'), this.configService.get('PORT'));

    transformObject(
      STATIC_RESOURCE_FIELDS,
      `${fullServerPath}/${this.configService.get('STATIC_DIRECTORY_PATH')}`,
      `${fullServerPath}/${this.configService.get('UPLOAD_DIRECTORY')}`,
      data
    );
  }

  public send<T>(res: Response, statusCode: number, data?: T): void {
    res
      .type(APPLICATION_JSON)
      .status(statusCode);

    if (data) {
      this.addStaticPath(data as UnknownObject);
      res.json(data);
    } else {
      res.json();
    }
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent(res: Response): void {
    this.send(res, StatusCodes.NO_CONTENT);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
