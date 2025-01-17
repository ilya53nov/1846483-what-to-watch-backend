import { Expose, Type } from 'class-transformer';
import { FieldMongoDB } from '../../../types/field-mongodb.enum.js';

import { Genre } from '../../../types/genre.enum.js';
import UserDto from '../../user/dto/user.dto.js';

export default class SummaryFilmDto {
  @Expose({ name: FieldMongoDB.Id})
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public publicationDate!: Date;

  @Expose()
  public genre!: Genre;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => UserDto)
  public user!: UserDto;

  @Expose()
  public posterImage!: string;
}
