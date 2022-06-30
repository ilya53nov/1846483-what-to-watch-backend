import { Genre, User } from "../../const";

export default class CreateFilmDto {
  public title!: string;
 
  public description!: string;
  
  public genre!: string;
  
  public year!: number;
  
  public previewVideoLink!: string;
  
  public videoLink!: string;
  
  public actors!: string[];
  
  public director!: string;
  
  public runTime!: number;
  
  public posterImage!: string;
  
  public backgroundImage!: string;
  
  public backgroundColor!: string;
}
