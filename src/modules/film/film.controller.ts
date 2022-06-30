import { Request, Response } from 'express';
import { inject } from 'inversify';
import * as core from 'express-serve-static-core';

import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { FilmServiceInterface } from './film-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import FilmDto from './dto/film.dto.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import CreateFilmDto from './dto/create-film.dto.js';
import SummaryFilmDto from './dto/summary-film.dto.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { ParamsFilm } from '../../types/params-film.type.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import CommentDto from '../comment/dto/comment.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CreateCommentDto from '../comment/dto/create-comment.dto.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { ModuleController } from '../../types/controller.enum.js';
import { MAX_FILM_COUNT } from './film.constants.js';
import { Entity } from '../../types/entity.enum.js';
import { FieldMongoDB } from '../../types/field-mongodb.enum.js';
import { DECIMAL_NUMBER_SYSTEM } from '../../const.js';
import { ControllerRoute } from '../../types/controller-route.enum.js';

export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for FilmController...');

    this.addRoute({
      path: ControllerRoute.Main,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateFilmDto),
      ]
    });

    this.addRoute({
      path: ControllerRoute.Main,
      method: HttpMethod.Get,
      handler: this.index
    });


    this.addRoute({
      path: ControllerRoute.Promo,
      method: HttpMethod.Get,
      handler: this.getPromoFilm
    });

    this.addRoute({
      path: ControllerRoute.FilmId,
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware(FieldMongoDB.UserId),
        new ValidateDtoMiddleware(CreateFilmDto),
        new DocumentExistsMiddleware(this.filmService, Entity.Film, FieldMongoDB.UserId),
      ]
    });

    this.addRoute({
      path: ControllerRoute.FilmId,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware(FieldMongoDB.UserId),
        new DocumentExistsMiddleware(this.filmService, Entity.Film, FieldMongoDB.UserId),
      ]
    });

    this.addRoute({
      path: ControllerRoute.FilmId,
      method: HttpMethod.Get,
      handler: this.getFilm,
      middlewares: [
        new ValidateObjectIdMiddleware(FieldMongoDB.UserId),
        new DocumentExistsMiddleware(this.filmService, Entity.Film, FieldMongoDB.UserId),
      ]
    });

    this.addRoute({
      path: `${ControllerRoute.FilmId}${ControllerRoute.Comments}`,
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware(FieldMongoDB.UserId),
        new DocumentExistsMiddleware(this.filmService, Entity.Film, FieldMongoDB.UserId),
      ]
    });

    this.addRoute({
      path: `${ControllerRoute.FilmId}${ControllerRoute.Comments}`,
      method: HttpMethod.Post,
      handler: this.createComment,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.filmService, Entity.Film, FieldMongoDB.UserId),
      ]
    });
  }

  public async index(
    req: Request,
    res: Response
  ): Promise<void> {

    const countFromQuery = String(req.query.count).toString();

    let count: number;

    if (countFromQuery) {
      count = Number.parseInt(countFromQuery, DECIMAL_NUMBER_SYSTEM);
    } else {
      count = MAX_FILM_COUNT;
    }

    const films = await this.filmService.find(count);

    this.ok(res, fillDTO(SummaryFilmDto, films));
  }

  public async create(
    {body, user}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response
  ): Promise<void> {
    const findedUser = await this.userService.findById(user.id);

    const createdFilm = await this.filmService.create({...body, user: findedUser!});

    this.created(res, fillDTO(FilmDto, createdFilm));
  }

  public async getFilm(
    {params}: Request<core.ParamsDictionary | ParamsFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;

    const film = await this.filmService.findById(filmId);

    this.ok(res, fillDTO(FilmDto, film));
  }

  public async getPromoFilm(
    _req: Request,
    res: Response
  ): Promise<void> {

    const promoFilm = await this.filmService.getPromoFilm();
    this.ok(res, fillDTO(FilmDto, promoFilm));
  }

  public async delete(
    {params, user}: Request<core.ParamsDictionary | ParamsFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;

    const isFilmByUser = await this.filmService.isFilmByUser(filmId, user.id);

    if (!isFilmByUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Film id «${filmId}» is not by user id «${user.id}».`,
        ModuleController.Film
      );
    }

    await this.filmService.deleteById(filmId);
    await this.commentService.deleteByFilmId(filmId);

    this.noContent(res);
  }

  public async update(
    {body, params, user}: Request<core.ParamsDictionary | ParamsFilm, Record<string, unknown>, FilmDto>,
    res: Response
  ): Promise<void> {

    const {filmId} = params;

    const isFilmByUser = await this.filmService.isFilmByUser(filmId, user.id);

    if (isFilmByUser) {
      const updatedFilm = await this.filmService.updateById(filmId, body);

      this.ok(res, fillDTO(FilmDto, updatedFilm));
    }
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsFilm, object, object>,
    res: Response
  ): Promise<void> {

    const comments = await this.commentService.findByFilmId(params.filmId);
    this.ok(res, fillDTO(CommentDto, comments));
  }

  public async createComment(
    {body, params, user}: Request<core.ParamsDictionary | ParamsFilm , Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    const {filmId} = params;

    const comment = await this.commentService.create({...body, userId: user.id, filmId: filmId});

    await this.filmService.incCommentCount(filmId);
    await this.filmService.updateRating(filmId, body.rating);

    this.created(res, fillDTO(CommentDto, comment));
  }
}
