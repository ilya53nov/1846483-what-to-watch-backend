import { Request, Response } from 'express';
import { inject } from 'inversify';
import {StatusCodes} from 'http-status-codes';
import * as core from 'express-serve-static-core';

import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { FilmServiceInterface } from './film-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import FilmDto from './dto/film.dto.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import CreateFilmDto from './dto/create-film.dto.js';
import SummaryFilmDto from './dto/summary-film.dto.js';
import { ModuleController } from '../../types/controller.enum.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';

type ParamsGetFilm = {
  filmId: string;
}

export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController...');

    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateFilmDto)]});
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/promo', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/:filmId', method: HttpMethod.Put, handler: this.update, middlewares: [new ValidateObjectIdMiddleware('filmId'), new ValidateDtoMiddleware(CreateFilmDto)]});
    this.addRoute({path: '/:filmId', method: HttpMethod.Delete, handler: this.delete, middlewares: [new ValidateObjectIdMiddleware('filmId')]});
    this.addRoute({path: '/:filmId', method: HttpMethod.Get, handler: this.get, middlewares: [new ValidateObjectIdMiddleware('filmId')]});

    // TODO
    //this.addRoute({path: '/filmId/comments', method: HttpMethod.Get, handler: this.index});
    //this.addRoute({path: '/filmId/comments', method: HttpMethod.Post, handler: this.index});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();

    this.ok(res, fillDTO(SummaryFilmDto, films));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response
  ): Promise<void> {
    const createdFilm = await this.filmService.create(body);

    this.created(res, fillDTO(FilmDto, createdFilm));
  }

  public async get(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.findById(filmId);

    if (!film) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${filmId} not found.`,
        ModuleController.Film
      );
    }

    this.ok(res, fillDTO(FilmDto, film));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {filmId} = params;
    const film = await this.filmService.deleteById(filmId);

    if (!film) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${filmId} not found.`,
        ModuleController.Film
      );
    }

    this.noContent(res);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>, FilmDto>,
    res: Response
  ): Promise<void> {
    const updatedFilm = await this.filmService.updateById(params.filmId, body);

    if (!updatedFilm) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${params.filmId} not found.`,
        ModuleController.Film
      );
    }

    this.ok(res, fillDTO(FilmDto, updatedFilm));
  }
}
