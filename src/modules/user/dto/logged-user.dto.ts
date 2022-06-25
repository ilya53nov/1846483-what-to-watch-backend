import {Expose} from 'class-transformer';

export default class LoggedUserDto {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarPath!: string;
}
