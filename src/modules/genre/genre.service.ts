import { DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { Component } from '../../types/component.types.js';
import { Genre } from '../../types/genre.enum.js';
import { FIELD_FOR_SORTING_PUBLICATION_DATE, MAX_FILM_COUNT, USER } from '../film/film.constants.js';
import { FilmEntity } from '../film/film.entity.js';
import { GenreServiceInterface } from './genre-service.interface.js';

@injectable()
export default class GenreService implements GenreServiceInterface {
  constructor(
    @inject(Component.FilmModel) private readonly filmModel: ModelType<FilmEntity>
  ) {}

  public async findByGenre(genre: Genre): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find({genre: genre})
      .limit(MAX_FILM_COUNT)
      .sort(`${FIELD_FOR_SORTING_PUBLICATION_DATE}: -1`)
      .populate([USER])
      .exec();
  }

}
