import { DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import createUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import { DEFAULT_AVATAR_FILE_NAME } from './user.constant.js';
import { UserEntity } from './user.entity.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.UserModel) private readonly userModel: ModelType<UserEntity>
  ) {}

  public async create(dto: createUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({...dto, avatarPath: DEFAULT_AVATAR_FILE_NAME});

    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id);
  }

  public async findOrCreate(dto: createUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    // TODO
    if (!user) {
      return null;
    }

    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }

    return null;
  }

  public async deleteFromFavoriteFilm(userId: string, filmId: string): Promise<DocumentType<UserEntity> | null> {
    const finded = await this.userModel.exists({_id: userId, favoriteFilms: filmId});

    if (finded) {
      return this.userModel
        .findByIdAndUpdate(
          userId,
          {
            '$pull': {favoriteFilms: filmId},
          },
        ).exec();
    }

    return null;

  }

  public async addToFavoriteFilm(userId: string, filmId: string): Promise<DocumentType<UserEntity> | null> {
    const finded = await this.userModel.exists({_id: userId, favoriteFilms: filmId});

    if (!finded) {
      return this.userModel
        .findByIdAndUpdate(
          userId,
          {
            '$push': {favoriteFilms: filmId},
          },
          {upsert: true},
        ).exec();
    }

    return null;
  }

  public async getFavoriteFilms(userId: string): Promise<DocumentType<UserEntity> | null> {
    const favoriteFilms =  await this.userModel
      .findOne({_id: userId}, {favoriteFilms: 1, _id: 0})
      .exec();

    if (favoriteFilms) {
      return favoriteFilms;
    }

    return null;
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, {new: true})
      .exec();
  }
}
