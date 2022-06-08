import { DocumentType } from '@typegoose/typegoose';

import CreateFilmDto from './dto/create-film.dto.js';
import FilmDto from './dto/film.dto.js';
import { FilmEntity } from './film.entity.js';

export interface FilmServiceInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findById(id: string): Promise<DocumentType<FilmEntity> | null>;
  find(): Promise<DocumentType<FilmEntity>[]>;
  deleteById(id: string): Promise<DocumentType<FilmEntity> | null>;
  updateById(id: string, dto: FilmDto): Promise<DocumentType<FilmEntity> | null>;
}
