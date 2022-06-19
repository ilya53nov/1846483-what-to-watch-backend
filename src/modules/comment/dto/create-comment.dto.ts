import {IsMongoId, IsString, Length, IsInt, Min, Max} from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsInt({message: 'rating is required'})
  @Min(1, {message: 'Min value is 1'})
  @Max(10, {message: 'Max value is 10'})
  public rating!: number;

  @IsMongoId({message: 'filmId field must be a valid id'})
  public filmId!: string;

  @IsMongoId({message: 'userId field must be a valid id'})
  public userId!: string;
}
