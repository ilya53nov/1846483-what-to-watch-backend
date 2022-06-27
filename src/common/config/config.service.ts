import 'reflect-metadata';
import { inject, injectable}  from 'inversify';
import { config } from 'dotenv';

import { LoggerInterface } from '../logger/logger.interface.js';
import { ConfigInterface } from './config.interface.js';
import { configSchema, ConfigSchema } from './config.schema.js';
import { Component } from '../../types/component.types.js';
import { ENV_FILE_FOUND_MESSAGE, ENV_FILE_NOT_EXISTS_MESSAGE } from './config.constant.js';

@injectable()
export default class ConfigService implements ConfigInterface{
  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(ENV_FILE_NOT_EXISTS_MESSAGE);
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.error});

    this.config = configSchema.getProperties();
    this.logger.info(ENV_FILE_FOUND_MESSAGE);
  }

  public get<T extends keyof ConfigSchema>(key: T) {
    return this.config[key];
  }
}
