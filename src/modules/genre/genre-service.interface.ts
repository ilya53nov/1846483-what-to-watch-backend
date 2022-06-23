import { DocumentType } from '@typegoose/typegoose';

import { Genre } from '../../types/genre.enum.js';
import { FilmEntity } from '../film/film.entity.js';

export interface GenreServiceInterface {
  findByGenre(genre: Genre): Promise<DocumentType<FilmEntity>[]>;
}
