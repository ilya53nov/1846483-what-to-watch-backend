import { IsString, Length, IsInt, Min, Max } from 'class-validator';

import { CreateCommentDtoValidation } from '../comment-dto.validation.js';

export default class CreateCommentDto {
  @IsString({message: CreateCommentDtoValidation.text.Message})
  @Length(
    CreateCommentDtoValidation.text.Length!.min,
    CreateCommentDtoValidation.text.Length!.max,
    {message: CreateCommentDtoValidation.text.Length!.message})
  public text!: string;

  @IsInt({message: CreateCommentDtoValidation.rating.Message})
  @Min(
    CreateCommentDtoValidation.rating.Min!.value,
    {message: CreateCommentDtoValidation.rating.Min!.message})
  @Max(
    CreateCommentDtoValidation.rating.Max!.value,
    {message: CreateCommentDtoValidation.rating.Max!.message})
  public rating!: number;

  public filmId!: string;

  public userId!: string;
}
