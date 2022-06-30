import {Expose, Type} from 'class-transformer';
import { FieldMongoDB } from '../../../types/field-mongodb.enum.js';
import UserDto from '../../user/dto/user.dto.js';

export default class CommentDto {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: FieldMongoDB.CreatedAt})
  public postDate!: string;

  @Expose({ name: FieldMongoDB.UserId})
  @Type(() => UserDto)
  public user!: UserDto;
}
