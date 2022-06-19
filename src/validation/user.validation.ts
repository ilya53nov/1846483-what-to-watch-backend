import { ValidationInterface } from './validation.interface.js';

const name: ValidationInterface = {
  required: true,
};

const email: ValidationInterface = {
  required: true,
  unique: true,
};

const avatarPath: ValidationInterface = {
  required: false,
};

const password: ValidationInterface = {
  required: true,
};

export const UserValidation = {
  name,
  email,
  avatarPath,
  password,
};
