import { ValidationInterface } from './validation.interface.js';

const name: ValidationInterface = {
  // TODO
  //minLength: [1, 'Min length for name is 1'],
  //maxLength: [15, 'Max length for name is 15'],
  required: true,
};

const email: ValidationInterface = {
  required: true,
  unique: true,
};

const avatarPath: ValidationInterface = {

};

const password: ValidationInterface = {
  required: true,
  // TODO
  //minLength: [6, 'Min length for password is 6'],
  //maxLength: [12, 'Max length for password is 12'],
};

export const UserValidation = {
  name,
  email,
  avatarPath,
  password,
};
