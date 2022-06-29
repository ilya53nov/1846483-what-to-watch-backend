import { IsEnum, IsInt, IsString, IsArray, Length } from 'class-validator';

import { Genre } from '../../../types/genre.enum.js';
import { User } from '../../../types/user.type.js';
import { CreateFilmDtoValidaton } from '../film-dto.validation.js';

export default class CreateFilmDto {
  @IsString({message: CreateFilmDtoValidaton.title.Message})
  @Length(
    CreateFilmDtoValidaton.title.Length!.min,
    CreateFilmDtoValidaton.title.Length!.max,
    {message: CreateFilmDtoValidaton.title.Length!.message})
  public title!: string;

  @IsString({message: CreateFilmDtoValidaton.description.Message})
  @Length(
    CreateFilmDtoValidaton.description.Length!.min,
    CreateFilmDtoValidaton.description.Length!.max,
    {message: CreateFilmDtoValidaton.description.Length!.message})
  public description!: string;

  public publicationDate!: Date;

  @IsEnum(Genre, {message: CreateFilmDtoValidaton.genre.Message})
  public genre!: Genre;

  @IsInt({message: CreateFilmDtoValidaton.year.Message})
  public year!: number;

  public rating!: number;

  @IsString({message: CreateFilmDtoValidaton.previewVideoLink.Message})
  public previewVideoLink!: string;

  @IsString({message: CreateFilmDtoValidaton.videoLink.Message})
  public videoLink!: string;

  @IsArray({message: CreateFilmDtoValidaton.actors.Message})
  public actors!: string[];

  @IsString({message: CreateFilmDtoValidaton.director.Message})
  @Length(
    CreateFilmDtoValidaton.director.Length!.min,
    CreateFilmDtoValidaton.director.Length!.max,
    {message: CreateFilmDtoValidaton.director.Length!.message})
  public director!: string;

  @IsInt({message: CreateFilmDtoValidaton.runTime.Message})
  public runTime!: number;

  public commentCount!: number;

  public user!: User;

  @IsString({message: CreateFilmDtoValidaton.posterImage.Message})
  public posterImage!: string;

  @IsString({message: CreateFilmDtoValidaton.backgroundImage.Message})
  public backgroundImage!: string;

  @IsString({message: CreateFilmDtoValidaton.backgroundColor.Message})
  public backgroundColor!: string;
}
