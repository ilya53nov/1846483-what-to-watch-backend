import { Request, Response } from 'express';
import { inject } from 'inversify';
import * as core from 'express-serve-static-core';

import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
//import { FilmServiceInterface } from '../film/film-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Genre } from '../../types/genre.enum.js';
import { fillDTO } from '../../utils/common.js';
import SummaryFilmDto from '../film/dto/summary-film.dto.js';
import { GenreServiceInterface } from './genre-service.interface.js';

type ParamsGetFilm = {
  genre: string;
}

export default class GenreController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.GenreServiceInterface) private readonly genreService: GenreServiceInterface,
    //@inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for GenreController...');

    this.addRoute({
      path: '/:genre',
      method: HttpMethod.Get,
      handler: this.getFilmsGenre
    });
  }

  public async getFilmsGenre(
    {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
    res: Response
  ): Promise<void> {
    const {genre} = params;
    const films = await this.genreService.findByGenre(genre as Genre);

    this.ok(res, fillDTO(SummaryFilmDto, films));
  }

}
