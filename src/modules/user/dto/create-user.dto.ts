import { IsEmail, IsString, Length } from 'class-validator';

import { CreateUserDtoValidation } from '../user-dto.validation.js';

export default class CreateUserDto {
  @IsEmail({}, {message: CreateUserDtoValidation.email.Message})
  public email!: string;

  @IsString({message: CreateUserDtoValidation.name.Message})
  @Length(
    CreateUserDtoValidation.name.Length!.min,
    CreateUserDtoValidation.name.Length!.max,
    {message: CreateUserDtoValidation.name.Length!.message})
  public name!: string;

  @IsString({message: CreateUserDtoValidation.password.Message})
  @Length(
    CreateUserDtoValidation.password.Length!.min,
    CreateUserDtoValidation.password.Length!.max,
    {message: CreateUserDtoValidation.password.Length!.message})
  public password!: string;
}
