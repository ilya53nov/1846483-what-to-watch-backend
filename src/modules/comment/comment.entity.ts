import typegoose, { getModelForClass, Ref, defaultClasses } from '@typegoose/typegoose';

import { UserEntity } from '../user/user.entity.js';
import { FilmEntity } from '../film/film.entity.js';
import { Collection } from '../../types/collection.enum.js';
import { CommentsValidation } from '../../validation/comment.validation.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends  defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: Collection.Comments
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
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
