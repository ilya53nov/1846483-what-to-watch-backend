import { FilmEntity } from '../modules/film/film.entity.js';
import { UserEntity } from '../modules/user/user.entity.js';
import { ValidationInterface } from './validation.interface.js';

const text: ValidationInterface = {
  required: true,
  trim: true,
};

const rating: ValidationInterface = {
  required: true,
};

const userId: ValidationInterface = {
  required: true,
  ref: UserEntity,
};

const filmId: ValidationInterface = {
  required: true,
  ref: FilmEntity,
};

export const CommentsValidation = {
  text,
  rating,
  userId,
  filmId
};
