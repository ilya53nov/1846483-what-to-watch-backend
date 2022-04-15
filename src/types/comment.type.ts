import { User } from './user.type.js';

export type Comment = {
  description: string;
  rating: number;
  publicationDate: Date;
  author: User;
}
