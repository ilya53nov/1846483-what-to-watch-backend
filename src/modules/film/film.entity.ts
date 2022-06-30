import typegoose, { getModelForClass } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses.js';

import { Collection } from '../../types/collection.enum.js';
import { Film } from '../../types/film.type.js';
import { Genre } from '../../types/genre.enum.js';
import { User } from '../../types/user.type.js';
import { FilmValidation } from '../../validation/film.validation.js';

const { prop, modelOptions } = typegoose;

const DEFAULT_RATING_SUM_ = 0;

export interface FilmEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: Collection.Films,
  }
})

export class FilmEntity extends TimeStamps implements Film {
  constructor(data: Film) {
    super();

    this.title = data.title;
    this.description = data.description;
    this.publicationDate = data.publicationDate;
    this.genre = data.genre;
    this.year = data.year;
    this.rating = data.rating;
    this._ratingSum = DEFAULT_RATING_SUM_;
    this.previewVideoLink = data.previewVideoLink;
    this.videoLink = data.videoLink;
    this.actors = data.actors;
    this.director = data.director;
    this.runTime = data.runTime;
    this.commentCount = data.commentCount;
    this.user = data.user;
    this.posterImage = data.posterImage;
    this.backgroundImage = data.backgroundImage;
    this.backgroundColor = data.backgroundColor;
  }

  @prop(FilmValidation.title)
  public title!: string;

  @prop(FilmValidation.description)
  public description!: string;

  @prop(FilmValidation.publicationDate)
  public publicationDate!: Date;

  @prop(FilmValidation.genre)
  public genre!: Genre;

  @prop(FilmValidation.year)
  public year!: number;

  @prop(FilmValidation.rating)
  public rating!: number;

  @prop(FilmValidation.ratingSum)
  public _ratingSum!: number;

  @prop(FilmValidation.previewVideoLink)
  public previewVideoLink!: string;

  @prop(FilmValidation.videoLink)
  public videoLink!: string;

  @prop(FilmValidation.actors)
  public actors!: string[];

  @prop(FilmValidation.director)
  public director!: string;

  @prop(FilmValidation.runTime)
  public runTime!: number;

  @prop(FilmValidation.commentCount)
  public commentCount!: number;

  @prop(FilmValidation.user)
  public user!: User;

  @prop(FilmValidation.posterImage)
  public posterImage!: string;

  @prop(FilmValidation.backgroundImage)
  public backgroundImage!: string;

  @prop(FilmValidation.backgroundColor)
  public backgroundColor!: string;
}

export const FilmModel = getModelForClass(FilmEntity);
