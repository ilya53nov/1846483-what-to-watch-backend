import CreateCommentDto from "../../dto/comment/create-comment.dto";
import CreateFilmDto from "../../dto/film/create-film.dto";
import { NewFilm } from "../../types/new-film";
import { NewReview } from "../../types/new-review";

export const adaptCommentToServer = 
  (comment: NewReview): CreateCommentDto => ({
    rating: comment.rating,
    text: comment.comment
  });

export const adaptFilmToServer =
  (film: NewFilm): CreateFilmDto => ({
    actors: film.starring,
    backgroundColor: film.backgroundColor,
    backgroundImage: film.backgroundImage,
    description: film.description,
    director: film.director,
    genre: film.genre,
    posterImage: film.posterImage,
    previewVideoLink: film.previewVideoLink,
    runTime: film.runTime,
    title: film.name,
    videoLink: film.videoLink,
    year: film.released
  })
