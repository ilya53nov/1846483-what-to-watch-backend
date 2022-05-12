import { User } from '../../types/user.type.js';
import typegoose, { getModelForClass } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses.js';
import { createSHA256 } from '../../utils/common.js';
import { UserValidation } from '../../validation/user.validation.js';
import { Collection } from '../../types/collection.enum.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: Collection.Users,
  }
})

export class UserEntity extends TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.avatarPath = data.avatarPath;
    this.name = data.name;
    this.password = data.password;
  }

  @prop(UserValidation.avatarPath)
  public avatarPath!: string;

  @prop(UserValidation.email)
  public email!: string;

  @prop(UserValidation.name)
  public name!: string;

  @prop(UserValidation.password)
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
