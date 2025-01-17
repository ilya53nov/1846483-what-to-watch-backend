import { DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { SortType } from '../../types/sort-type.enum.js';
import CreateFilmDto from './dto/create-film.dto.js';
import FilmDto from './dto/film.dto.js';
import { FilmServiceInterface } from './film-service.interface.js';
import { DEFAULT_COMMENT_COUNT, DEFAULT_RATING, MAX_FILM_COUNT, USER } from './film.constants.js';
import { FilmEntity } from './film.entity.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const film = new FilmEntity({...dto, rating: DEFAULT_RATING, commentCount: DEFAULT_COMMENT_COUNT});

    const result = await this.filmModel.create(film);
    this.logger.info(`New film created: ${dto.title}`);

    return result.populate(USER);
  }

  public async findById(id: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(id)
      .populate([USER])
      .exec();
  }

  public async find(count: number = MAX_FILM_COUNT): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find()
      .limit(count)
      .sort({publicationDate: SortType.Down})
      .populate([USER])
      .exec();
  }

  public async getPromoFilm(): Promise<DocumentType<FilmEntity> | null> {
    const films = await this.find();

    return films[0];
  }

  public async findByIdItems(idItems: string[]): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find({_id: {'$in': idItems}})
      .populate([USER])
      .exec();
  }

  public async isFilmByUser(filmId: string, userId: string): Promise<boolean> {
    const finded = await this.filmModel.find({_id: filmId, user: userId}).exec();

    return finded.length > 0;
  }

  public async deleteById(id: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(id)
      .exec();
  }

  public async updateById(id: string, dto: FilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(id, dto, {new: true})
      .populate([USER])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.filmModel.exists({_id: documentId})) !== null;
  }

  public async incCommentCount(id: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(id, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async updateRating(id: string, rating: number): Promise<DocumentType<FilmEntity> | null> {
    const findedFields = await this.filmModel.findById(id, {_ratingSum: 1, commentCount:1, _id: 0}).exec();

    const ratingSum = findedFields?._ratingSum;
    const commentCount = findedFields?.commentCount;

    let averageRating = rating;

    if (ratingSum && commentCount) {
      averageRating = (ratingSum + rating) / commentCount;
    }

    return this.filmModel
      .findByIdAndUpdate(
        id,
        {
          '$inc': {_ratingSum: rating},
          '$set': {rating: averageRating},
        }
      ).exec();
  }
}
