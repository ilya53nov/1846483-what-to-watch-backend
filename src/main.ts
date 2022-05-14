import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Container } from 'inversify';
import Application from './app/application.js';
import { ConfigInterface } from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import { DatabaseInterface } from './common/database-client/database.interface.js';
import DatabaseService from './common/database-client/database.service.js';
import { LoggerInterface } from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import { FilmServiceInterface } from './modules/film/film-service.interface.js';
import { FilmEntity, FilmModel } from './modules/film/film.entity.js';
import FilmService from './modules/film/film.service.js';
import { UserServiceInterface } from './modules/user/user-service.interface.js';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import UserService from './modules/user/user.service.js';
import { Component } from './types/component.types.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<FilmServiceInterface>(Component.FilmServiceInterface).to(FilmService);
applicationContainer.bind<ModelType<FilmEntity>>(Component.FilmModel).toConstantValue(FilmModel);


const application = applicationContainer.get<Application>(Component.Application);
await application.init();
