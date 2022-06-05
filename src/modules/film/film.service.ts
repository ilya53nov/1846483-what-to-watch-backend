import { DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import createFilmDto from './dto/create-film.dto.js';
import { FilmServiceInterface } from './film-service.interface.js';
import { FilmEntity } from './film.entity.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: ModelType<FilmEntity>
  ) {}

  public async create(dto: createFilmDto): Promise<DocumentType<FilmEntity>> {
    const film = new FilmEntity(dto);

    const result = await this.filmModel.create(film);
    this.logger.info(`New film created: ${dto.title}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findById(id);
  }

}
