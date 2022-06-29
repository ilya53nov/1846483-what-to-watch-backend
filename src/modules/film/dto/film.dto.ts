import { Expose, Type } from 'class-transformer';
import { FieldMongoDB } from '../../../types/field-mongodb.enum.js';

import { Genre } from '../../../types/genre.enum.js';
import UserDto from '../../user/dto/user.dto.js';

export default class FilmDto {
  @Expose({ name: FieldMongoDB.Id})
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({ name: FieldMongoDB.CreatedAt})
  public publicationDate!: Date;

  @Expose()
  public genre!: Genre;

  @Expose()
  public year!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public videoLink!: string;

  @Expose()
  public actors!: string[];

  @Expose()
  public director!: string;

  @Expose()
  public runTime!: number;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => UserDto)
  public user!: UserDto;

  @Expose()
  public posterImage!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;
}
