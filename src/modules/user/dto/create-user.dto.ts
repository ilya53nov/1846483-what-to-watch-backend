import { IsEmail, IsString, Length } from 'class-validator';

import { CreateUserDtoValidation } from '../user-dto.validation.js';

export default class CreateUserDto {
  @IsEmail({}, {message: CreateUserDtoValidation.email.Message})
  public email!: string;

  @IsString({message: CreateUserDtoValidation.name.Message})
  @Length(
    CreateUserDtoValidation.name.Lenght!.min,
    CreateUserDtoValidation.name.Lenght!.max,
    {message: CreateUserDtoValidation.name.Lenght!.message})
  public name!: string;

  @IsString({message: CreateUserDtoValidation.password.Message})
  @Length(
    CreateUserDtoValidation.password.Lenght!.min,
    CreateUserDtoValidation.password.Lenght!.max,
    {message: CreateUserDtoValidation.password.Lenght!.message})
  public password!: string;
}
