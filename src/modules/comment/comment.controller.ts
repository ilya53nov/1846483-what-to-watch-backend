import { inject } from 'inversify';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';

import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { fillDTO} from '../../utils/common.js';
import CommentDto from './dto/comment.dto.js';
import { FilmServiceInterface } from '../film/film-service.interface.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ParamsFilm } from '../../types/params-film.type.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';

export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.FilmServiceInterface) private  readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Get,
      handler: this.get,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
  }

  public async create(
    {body, params, user}: Request<core.ParamsDictionary | ParamsFilm , Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    const {filmId} = params;

    const comment = await this.commentService.create({...body, userId: user.id, filmId: filmId});

    await this.filmService.incCommentCount(filmId);
    await this.filmService.incRating(filmId, body.rating);

    this.created(res, fillDTO(CommentDto, comment));
  }

  public async get(
    {params}: Request<core.ParamsDictionary | ParamsFilm, object, object>,
    res: Response
  ): Promise<void> {

    const {filmId} = params;

    const comments = await this.commentService.findByFilmId(filmId);
    this.ok(res, fillDTO(CommentDto, comments));
  }
}
