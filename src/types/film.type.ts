import { Genre } from './genre.enum.js';
import { User } from './user.type.js';

export type Film = {
  title: string;
  description: string;
  publicationDate: Date;
  genre: Genre;
  year: number;
  rating: number;
  //_ratingSum: number;
  previewVideoLink: string;
  videoLink: string;
  actors: string[];
  director: string;
  runTime: number;
  commentCount: number;
  user: User;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
}
