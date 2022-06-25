import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';

import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { ParamsFilm } from '../../types/params-film.type.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { FilmServiceInterface } from './film-service.interface.js';
import SummaryFilmDto from './dto/summary-film.dto.js';
import { fillDTO } from '../../utils/common.js';
import { ConfigInterface } from '../../common/config/config.interface.js';

@injectable()
export default class FavoriteFilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for FavoriteFilmController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getFavoriteFilms,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Post,
      handler: this.addToFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Delete,
      handler: this.deleteFromFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
  }

  public async getFavoriteFilms(
    {user}: Request<core.ParamsDictionary, Record<string, unknown>>,
    res: Response
  ): Promise<void> {

    const favoriteFilms =  await this.userService.getFavoriteFilms(user.id);

    const favoriteFilmsIdItems = favoriteFilms?.favoriteFilms;

    if (favoriteFilmsIdItems) {
      const films = await this.filmService.findByIdItems(favoriteFilmsIdItems);

      this.ok(res, fillDTO(SummaryFilmDto, films));
      return;
    }

    this.noContent(res);
  }

  public async deleteFromFavorite(
    {params, user}: Request<core.ParamsDictionary | ParamsFilm , Record<string, unknown>>,
    res: Response
  ): Promise<void> {

    const {filmId} = params;

    await this.userService.deleteFromFavoriteFilm(user.id, filmId);

    this.noContent(res);
  }

  public async addToFavorite(
    {params, user}: Request<core.ParamsDictionary | ParamsFilm , Record<string, unknown>>,
    res: Response
  ): Promise<void> {

    const {filmId} = params;

    await this.userService.addToFavoriteFilm(user.id, filmId);

    this.noContent(res);
  }
}
