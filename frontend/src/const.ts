export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = 'review',
  Player = '/player',
  Register = '/register',
  EditFilm = 'edit',
  AddFilm = '/create',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export const GENRES = ['comedy', 'crime', 'documentary', 'drama', 'horror', 'family', 'romance', 'scifi', 'thriller'];

export const DEFAULT_GENRE = 'All genres';

export enum APIRoute {
  Films = '/films',
  //Similar = '/similar',
  Promo = '/films/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/users/login',
  Logout = '/logout',
  Register = '/users/register',
  //Add = '/add',
  Genres = '/genres',
  SetAvatar = '/avatar'
}

export enum NameSpace {
  Films = 'FILMS',
  Film = 'FILM',
  SimilarFilms = 'SIMILAR FILMS',
  Promo = 'PROMO',
  Reviews = 'REVIEWS',
  User = 'USER',
  FavoriteFilms = 'FAVORITE FILMS',
  Genre = 'GENRE',
}

export type User = {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
};

export enum Genre {
  Comedy = 'comedy',
  Crime = 'crime',
  Documentary = 'documentary',
  Drama = 'drama',
  Horror = 'horror',
  Family = 'family',
  Romance = 'romance',
  Scifi = 'scifi',
  Thriller = 'thriller'
}
