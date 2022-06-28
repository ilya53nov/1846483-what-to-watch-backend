import 'reflect-metadata';
import { inject, injectable}  from 'inversify';
import express, { Express } from 'express';
import cors from 'cors';

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
import GenreController from '../modules/genre/genre.controller.js';
import { AuthenticateMiddleware } from '../common/middlewares/authenticate.middleware.js';
import { getFullServerPath } from '../utils/common.js';

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
    @inject(Component.GenreController) private genreController: GenreController,
  ) {
    this.expressApp = express();
  }

  public registerRoutes() {
    this.expressApp.use(MainRoute.Users, this.userController.router);
    this.expressApp.use(MainRoute.Films, this.filmController.router);
    this.expressApp.use(MainRoute.Favorite, this.favoriteFilmController.router);
    this.expressApp.use(MainRoute.Genres, this.genreController.router);
  }

  public registerMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      MainRoute.Upload,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.expressApp.use(
      MainRoute.Static,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  public registerExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.expressApp.use(cors());
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
    this.logger.info(`Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }
}
