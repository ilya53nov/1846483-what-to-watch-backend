import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';

import { Component } from '../../types/component.types.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { COMMENT_COUNT } from './comment.constant.js';
import { SortType } from '../../types/sort-type.enum.js';
import { FieldMongoDB } from '../../types/field-mongodb.enum.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate(FieldMongoDB.UserId);
  }

  public async findByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({filmId})
      .limit(COMMENT_COUNT)
      .sort({createdAt: SortType.Down})
      .populate(FieldMongoDB.UserId);
  }

  public async deleteByFilmId(filmId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({filmId})
      .exec();

    return result.deletedCount;
  }
}
