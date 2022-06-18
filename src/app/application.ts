import 'reflect-metadata';
import { inject, injectable}  from 'inversify';
import express, { Express } from 'express';

import { ConfigInterface } from '../common/config/config.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { Component } from '../types/component.types.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { getURI } from '../utils/db.js';
import { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';
import UserController from '../modules/user/user.controller.js';
import FilmController from '../modules/film/film.controller.js';
import FavoriteFilmController from '../modules/film/favorite-film.controller.js';
import { MainRoute } from '../types/route.enum.js';

@injectable()
export default class Application{
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private userController: UserController,
    @inject(Component.FilmController) private filmController: FilmController,
    @inject(Component.FavoriteFilmController) private favoriteFilmController: FavoriteFilmController,
  ) {
    this.expressApp = express();
  }

  public registerRoutes() {
    this.expressApp.use(MainRoute.Users, this.userController.router);
    this.expressApp.use(MainRoute.Films, this.filmController.router);
    this.expressApp.use(MainRoute.Favorite, this.favoriteFilmController.router);
  }

  public registerMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      MainRoute.Upload,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
  }

  public registerExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    this.registerMiddlewares();
    this.registerRoutes();
    this.registerExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
