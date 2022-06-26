import typegoose, { getModelForClass, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses.js';

import { UserEntity } from '../user/user.entity.js';
import { FilmEntity } from '../film/film.entity.js';
import { Collection } from '../../types/collection.enum.js';
import { CommentsValidation } from '../../validation/comment.validation.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: Collection.Comments
  }
})
export class CommentEntity extends TimeStamps {
  @prop(CommentsValidation.text)
  public text!: string;

  @prop(CommentsValidation.filmId)
  public filmId!: Ref<FilmEntity>;

  @prop(CommentsValidation.userId)
  public userId!: Ref<UserEntity>;

  @prop(CommentsValidation.rating)
  public rating!: number;
}

export const CommentModel = getModelForClass(CommentEntity);
