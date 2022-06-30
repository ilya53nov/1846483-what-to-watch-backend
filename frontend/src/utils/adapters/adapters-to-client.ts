import CommentDto from "../../dto/comment/comment.dto";
import FilmDto from "../../dto/film/film.dto";
import UserDto from "../../dto/user/user.dto";
import { Film } from "../../types/film";
import { Review } from "../../types/review";
import { User } from "../../types/user";

const DEFAULT_TOKEN = '';

export const adaptUserToClient = 
  (user: UserDto): User => ({
    avatarUrl: user.avatarPath,
    email: user.email,
    name: user.name,
    token: DEFAULT_TOKEN
  });

export const adaptFilmsToClient = 
  (films: FilmDto[]): Film[] =>
    films
      .filter((film: FilmDto) =>
        film.user !== null,
      )
      .map((film: FilmDto) => ({
        id: film.id,
        name: film.title,
        posterImage: film.posterImage,
        backgroundImage: film.backgroundImage,
        backgroundColor: film.backgroundColor,
        videoLink: film.videoLink,
        previewVideoLink: film.previewVideoLink,
        description: film.description,
        rating: film.rating,
        director: film.director,
        starring: film.actors,
        runTime: film.runTime,
        genre: film.genre,
        released: film.year,
        isFavorite: false,
        user: adaptUserToClient(film.user),
      }));

export const adaptFilmTolient = 
  (film: FilmDto): Film => ({
    id: film.id,
    name: film.title,
    posterImage: film.posterImage,
    backgroundImage: film.backgroundImage,
    backgroundColor: film.backgroundColor,
    videoLink: film.videoLink,
    previewVideoLink: film.previewVideoLink,
    description: film.description,
    rating: film.rating,
    director: film.director,
    starring: film.actors,
    runTime: film.runTime,
    genre: film.genre,
    released: film.year,
    isFavorite: false,
    user: adaptUserToClient(film.user),
  });

export const adaptCommentToClient =
  (comment: CommentDto): Review => ({
    comment: comment.text,
    date: comment.postDate,
    id: comment.id,
    rating: comment.rating,
    user: comment.user
  });

export const adaptCommentsToClient =
  (comments: CommentDto[]): Review[] =>
  comments
      .filter((comment: CommentDto) =>
        comment.user !== null,
      )
      .map((comment: CommentDto) => ({
        comment: comment.text,
        date: comment.postDate,
        id: comment.id,
        rating: comment.rating,
        user: adaptUserToClient(comment.user)
      }));