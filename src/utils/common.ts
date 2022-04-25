import { LINE_BREAK_CHARACTER, TAB_CHARACTER } from '../const.js';
import { Film } from '../types/film.type.js';
import { Genre } from '../types/genre.enum.js';

const DECIMAL_NUMBER_SYSTEM = 10;

export const createCard = (row: string) => {
  const tokens = row.replace(LINE_BREAK_CHARACTER, ''). split(TAB_CHARACTER);

  const [
    title,
    description,
    publicationDate,
    genre,
    year,
    rating,
    previewVideoLink,
    videoLink,
    actors,
    director,
    runTime,
    commentsCount,
    name,
    email,
    avatarPath,
    password,
    posterImage,
    backgroundImage,
    backgroundColor
  ] = tokens;

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    genre: Genre[genre as Genre] ,
    year: Number.parseInt(year, DECIMAL_NUMBER_SYSTEM),
    rating: Number.parseInt(rating, DECIMAL_NUMBER_SYSTEM),
    previewVideoLink,
    videoLink,
    actors: actors.split(';'),
    director,
    runTime: Number.parseInt(runTime, DECIMAL_NUMBER_SYSTEM),
    commentsCount: Number.parseInt(commentsCount, DECIMAL_NUMBER_SYSTEM),
    user: {name, email, avatarPath, password},
    posterImage,
    backgroundImage,
    backgroundColor,
  } as Film;
};

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';
