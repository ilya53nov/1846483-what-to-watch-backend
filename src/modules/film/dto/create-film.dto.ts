import { Genre } from '../../../types/genre.enum.js';
import { User } from '../../../types/user.type.js';

export default class CreateFilmDto {
  public title!: string;
  public description!: string;
  public publicationDate!: Date;
  public genre!: Genre;
  public year!: number;
  public rating!: number;
  public previewVideoLink!: string;
  public videoLink!: string;
  public actors!: string[];
  public director!: string;
  public runTime!: number;
  public commentsCount!: number;
  public user!: User;
  public posterImage!: string;
  public backgroundImage!: string;
  public backgroundColor!: string;
}
