import { DtoValidation } from '../../types/dto-validation.interface.js';

const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 15;

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 12;

const email: DtoValidation = {
  Message: 'Email must be valid addres'
};

const name: DtoValidation = {
  Message: 'Name is required',

  Length: {
    min: NAME_MIN_LENGTH,
    max: NAME_MAX_LENGTH,
    message: `Min length is ${NAME_MIN_LENGTH}, max is ${NAME_MAX_LENGTH}`
  }
};

const password: DtoValidation = {
  Message: 'Password is required',

  Length: {
    min: PASSWORD_MIN_LENGTH,
    max: PASSWORD_MAX_LENGTH,
    message: `Min length is ${PASSWORD_MIN_LENGTH}, max is ${PASSWORD_MAX_LENGTH}`
  }
};

export const CreateUserDtoValidation = {
  email,
  name,
  password
};
