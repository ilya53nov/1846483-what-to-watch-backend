import { DtoValidation } from '../../types/dto-validation.interface.js';

const TITLE_MIN_LENGTH = 2;
const TITLE_MAX_LENGTH = 100;

const DESCRIPTION_MIN_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 1024;

const DIRECTOR_MIN_LENGTH = 2;
const DIRECTOR_MAX_LENGTH = 50;

const title: DtoValidation = {
  Message: 'Title is required',

  Length: {
    min: TITLE_MIN_LENGTH,
    max: TITLE_MAX_LENGTH,
    message: `Min length is ${TITLE_MIN_LENGTH}, max is ${TITLE_MAX_LENGTH}`
  }
};

const description: DtoValidation = {
  Message: 'Description is required',

  Length: {
    min: DESCRIPTION_MIN_LENGTH,
    max: DESCRIPTION_MAX_LENGTH,
    message: `Min length is ${DESCRIPTION_MIN_LENGTH}, max is ${DESCRIPTION_MAX_LENGTH}`
  }
};

const genre: DtoValidation = {
  Message: 'Type must be comedy, crime, documentary, drama, horror, family, romance, scifi, thriller'
};

const year: DtoValidation = {
  Message: 'Year must be an integer'
};

const previewVideoLink: DtoValidation = {
  Message: 'PreviewVideoLink is required'
};

const videoLink: DtoValidation = {
  Message: 'VideoLink is required'
};

const actors: DtoValidation = {
  Message: 'Field actors must be an array'
};

const director: DtoValidation = {
  Message: 'Director is required',

  Length: {
    min: DIRECTOR_MIN_LENGTH,
    max: DIRECTOR_MAX_LENGTH,
    message: `Min length is ${DIRECTOR_MIN_LENGTH}, max is ${DIRECTOR_MAX_LENGTH}`
  }
};

const runTime: DtoValidation = {
  Message: 'RunTime must be an integer'
};

const posterImage: DtoValidation = {
  Message: 'PosterImage is required'
};

const backgroundImage: DtoValidation = {
  Message: 'BackgroundImage is required'
};

const backgroundColor: DtoValidation = {
  Message: 'BackgroundColor is required'
};

export const CreateFilmDtoValidaton = {
  title,
  description,
  genre,
  year,
  videoLink,
  previewVideoLink,
  actors,
  director,
  runTime,
  posterImage,
  backgroundImage,
  backgroundColor
};
