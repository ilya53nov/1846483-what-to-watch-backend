import { DocumentType } from '@typegoose/typegoose';

import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import CreateFilmDto from './dto/create-film.dto.js';
import FilmDto from './dto/film.dto.js';
import { FilmEntity } from './film.entity.js';

export interface FilmServiceInterface extends DocumentExistsInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findById(id: string): Promise<DocumentType<FilmEntity> | null>;
  find(count?: number): Promise<DocumentType<FilmEntity>[]>;
  getPromoFilm(): Promise<DocumentType<FilmEntity> | null>;
  findByIdItems(idItems: string[]): Promise<DocumentType<FilmEntity>[]>;
  deleteById(id: string): Promise<DocumentType<FilmEntity> | null>;
  updateById(id: string, dto: FilmDto): Promise<DocumentType<FilmEntity> | null>;
  incCommentCount(id: string): Promise<DocumentType<FilmEntity> | null>;
  updateRating(id: string, rating: number): Promise<DocumentType<FilmEntity> | null>;
  isFilmByUser(filmId: string, userId: string): Promise<boolean>;
}
