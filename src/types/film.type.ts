import { FilmGenre } from './film-genre.enum.js';
import { User } from './user.type.js';

export type Film = {
  title: string;
  description: string;
  publicationDate: Date;
  genre: FilmGenre;
  year: number;
  rating: number;
  previewVideoLink: string;
  videoLink: string;
  actors: string[];
  director: string;
  runTime: number;
  commentsCount: number;
  user: User;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
}
