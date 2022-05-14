import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import mongoose from 'mongoose';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { DatabaseInterface } from './database.interface.js';
import { ConfigInterface } from '../config/config.interface.js';

@injectable()
export default class DatabaseService implements DatabaseInterface {
  constructor(
      @inject(Component.LoggerInterface) private logger: LoggerInterface,
      @inject(Component.ConfigInterface) private config: ConfigInterface,
  ) {}

  public async connect(uri: string): Promise<void> {
    const dbName = this.config.get('DB_NAME');

    this.logger.info(`Try to connect to MongoDB: ${dbName} ...`);
    await mongoose.connect(uri);
    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Database connection closed.');
  }

}
