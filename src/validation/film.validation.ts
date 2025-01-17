import { UserEntity } from '../modules/user/user.entity.js';
import { Genre } from '../types/genre.enum.js';
import { ValidationInterface } from './validation.interface.js';

const title: ValidationInterface = {
  required: true,
  trim: true,
};

const description: ValidationInterface = {
  trim: true,
};

const publicationDate: ValidationInterface = {
  required: false,
};

const genre: ValidationInterface = {
  required: true,
  enum: Genre,
};

const year: ValidationInterface = {
  required: true,
};

const rating: ValidationInterface = {
  required: true,
};

const ratingSum: ValidationInterface = {
  required: false,
};

const previewVideoLink: ValidationInterface = {
  required: true,
  default: '',
};

const videoLink: ValidationInterface = {
  required: true,
};

const actors: ValidationInterface = {
  required: true,
  default: [],
  type: () => String,
};

const director: ValidationInterface = {
  required: true,
};

const runTime: ValidationInterface = {
  required: true,
};

const user: ValidationInterface = {
  required: true,
  ref: UserEntity,
};

const posterImage: ValidationInterface = {
  required: true,
  default: '',
};

const backgroundImage: ValidationInterface = {
  required: true,
  default: '',
};

const backgroundColor: ValidationInterface = {
  required: true,
};

const commentCount: ValidationInterface = {
  default: 0,
};

export const FilmValidation = {
  title,
  description,
  publicationDate,
  genre,
  year,
  rating,
  ratingSum,
  previewVideoLink,
  videoLink,
  actors,
  director,
  runTime,
  user,
  posterImage,
  backgroundImage,
  backgroundColor,
  commentCount,
};
