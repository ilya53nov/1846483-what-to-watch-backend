import { ConfigInterface } from '../common/config/config.interface.js';
import ConfigService from '../common/config/config.service.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';
import { EmitEvent } from '../common/file-reader/emit-event.enum.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { FilmServiceInterface } from '../modules/film/film-service.interface.js';
import { FilmModel } from '../modules/film/film.entity.js';
import FilmService from '../modules/film/film.service.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { UserModel } from '../modules/user/user.entity.js';
import UserService from '../modules/user/user.service.js';
import { Command } from '../types/command.enum.js';
import { Film } from '../types/film.type.js';
import { createCard, getErrorMessage } from '../utils/common.js';
import { getURI } from '../utils/db.js';
import { COMMAND_START_SYMBOL } from './cli-command.constant.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = `${COMMAND_START_SYMBOL}${Command.Import}`;

  private config: ConfigInterface;
  private userService!: UserServiceInterface;
  private filmService!: FilmServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.filmService = new FilmService(this.logger, FilmModel);
    this.userService = new UserService(this.logger, UserModel);
    this.config = new ConfigService(this.logger);
    this.databaseService = new DatabaseService(this.logger, this.config);
  }

  private async saveFilm(film: Film) {
    const user = await this.userService.findOrCreate({
      ...film.user,
      password: film.user.password
    }, this.salt);

    await this.filmService.create({
      ...film,
      user
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const card = createCard(line);

    await this.saveFilm(card);
    resolve();
  }

  private onComplete(count: number) {
    this.logger.info(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filepath: string): Promise<void> {

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    this.salt = this.config.get('SALT');

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filepath.trim());

    fileReader.on(EmitEvent.Line, this.onLine);
    fileReader.on(EmitEvent.End, this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      this.logger.info(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
