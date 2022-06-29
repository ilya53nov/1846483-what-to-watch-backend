import { IsEnum, IsInt, IsString, IsArray, Length } from 'class-validator';

import { Genre } from '../../../types/genre.enum.js';
import { User } from '../../../types/user.type.js';
import { CreateFilmDtoValidaton } from '../film-dto.validation.js';

export default class CreateFilmDto {
  @IsString({message: CreateFilmDtoValidaton.title.Message})
  @Length(
    CreateFilmDtoValidaton.title.Lenght!.min,
    CreateFilmDtoValidaton.title.Lenght!.max,
    {message: CreateFilmDtoValidaton.title.Lenght!.message})
  public title!: string;

  @IsString({message: CreateFilmDtoValidaton.description.Message})
  @Length(
    CreateFilmDtoValidaton.description.Lenght!.min,
    CreateFilmDtoValidaton.description.Lenght!.max,
    {message: CreateFilmDtoValidaton.description.Lenght!.message})
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
    CreateFilmDtoValidaton.director.Lenght!.min,
    CreateFilmDtoValidaton.director.Lenght!.max,
    {message: CreateFilmDtoValidaton.director.Lenght!.message})
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
