import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { MiddlewareErrorMessage } from '../../common/middlewares/middleware-error-message.enum.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { Component } from '../../types/component.types.js';
import { ControllerRoute } from '../../types/controller-route.enum.js';
import { ModuleController } from '../../types/controller.enum.js';
import { FieldMongoDB } from '../../types/field-mongodb.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { createJWT, fillDTO } from '../../utils/common.js';
import CreateUserDto from './dto/create-user.dto.js';
import CreatedUserDto from './dto/created-user.dto.js';
import LoggedUserDto from './dto/logged-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import UploadUserAvatarDto from './dto/upload-user-avatar.dto.js';
import UserDto from './dto/user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import { AVATAR, JWT_ALGORITM } from './user.constant.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
  ) {
    super(logger, configService);
    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: ControllerRoute.Register,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto),
      ]
    });

    this.addRoute({
      path: ControllerRoute.Login,
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto),
      ]
    });

    this.addRoute({
      path: ControllerRoute.Login,
      method: HttpMethod.Get,
      handler: this.checkAuthenticate
    });

    this.addRoute({
      path: ControllerRoute.Avatar,
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware(FieldMongoDB.UserId),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), AVATAR),
      ]
    });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        ModuleController.User
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));

    this.created(
      res,
      fillDTO(CreatedUserDto, result)
    );
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        MiddlewareErrorMessage.PrivateRoute,
        ModuleController.User
      );
    }

    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get('JWT_SECRET'),
      { email: user.email, id: user.id}
    );

    const loggedUserDto = fillDTO(LoggedUserDto, user);

    this.ok(res, {...loggedUserDto, token});
  }

  public async uploadAvatar(req: Request, res: Response) {
    const {userId} = req.params;
    const uploaFile = {avatarPath: req.file?.filename};
    await this.userService.updateById(userId, uploaFile);
    this.created(res, fillDTO(UploadUserAvatarDto, uploaFile));
  }

  public async checkAuthenticate(req: Request, res: Response) {
    const user = await this.userService.findByEmail(req.user.email);

    if (user) {
      this.ok(res, fillDTO(UserDto, user));
    }
  }
}
