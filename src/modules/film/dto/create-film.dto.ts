import { MinLength, MaxLength, IsEnum, IsInt, IsString, IsArray } from 'class-validator';

import { Genre } from '../../../types/genre.enum.js';
import { User } from '../../../types/user.type.js';

export default class CreateFilmDto {
  @IsString({message: 'title is required'})
  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @IsString({message: 'description is required'})
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  //@IsDateString({}, {message: 'publicationDate must be valid ISO date'})
  public publicationDate!: Date;

  @IsEnum(Genre, {message: 'type must be comedy, crime, documentary, drama, horror, family, romance, scifi, thriller'})
  public genre!: Genre;

  @IsInt({message: 'year must be an integer'})
  public year!: number;
  
  public rating!: number;

  @IsString({message: 'previewVideoLink is required'})
  public previewVideoLink!: string;

  @IsString({message: 'videoLink is required'})
  public videoLink!: string;

  @IsArray({message: 'field actors must be an array'})
  public actors!: string[];

  @IsString({message: 'director is required'})
  @MinLength(2, {message: 'Minimum director length must be 2'})
  @MaxLength(50, {message: 'Maximum director length must be 50'})
  public director!: string;

  @IsInt({message: 'runTime must be an integer'})
  public runTime!: number;

  public commentCount!: number;

  public user!: User;

  @IsString({message: 'posterImage is required'})
  public posterImage!: string;

  @IsString({message: 'backgroundImage is required'})
  public backgroundImage!: string;

  @IsString({message: 'backgroundColor is required'})
  public backgroundColor!: string;
}
