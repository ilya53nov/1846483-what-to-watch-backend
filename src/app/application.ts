import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import { ConfigInterface } from '../common/config/config.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { Component } from '../types/component.types.js';

@injectable()
export default class Application{

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface) {}

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const salt = this.config.get('SALT');
    const dbHost = this.config.get('DB_HOST');

    this.logger.info(`Get value from env $SALT: ${salt}`);
    this.logger.info(`Get value from env $DB_HOST: ${dbHost}`);
  }
}
