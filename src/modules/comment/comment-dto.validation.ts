import { DtoValidation } from '../../types/dto-validation.interface.js';

const TEXT_MIN_LENGTH = 5;
const TEXT_MAX_LENGTH = 1024;

const RATING_MIN = 1;
const RATING_MAX = 1024;

const text: DtoValidation = {
  Lenght: {
    min: TEXT_MIN_LENGTH,
    max: TEXT_MAX_LENGTH,
    message: `Min length is ${TEXT_MIN_LENGTH}, max is ${TEXT_MAX_LENGTH}`
  },

  Message: 'Text is required'
};

const rating: DtoValidation = {
  Min: {
    value: RATING_MIN,
    message: `Min value is ${RATING_MIN}`
  },

  Max: {
    value: RATING_MAX,
    message: `Max value is ${RATING_MAX}`
  },

  Message: 'Rating is required'
};

export const CreateCommentDtoValidation = {
  text,
  rating,
};
