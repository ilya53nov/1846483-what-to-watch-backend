import { Genre } from "../../const";
import UserDto from "../user/user.dto";

export default class FilmDto {
  public id!: string;

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

  public commentCount!: number;

  public user!: UserDto;

  public posterImage!: string;

  public backgroundImage!: string;

  public backgroundColor!: string;
}
