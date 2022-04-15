import { readFileSync } from 'fs';
import { UTF_8 } from '../../const.js';
import { FilmGenre } from '../../types/film-genre.enum.js';
import { Film } from '../../types/film.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: UTF_8});
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        publicationDate,
        genre,
        year,
        rating,
        previewVideoLink,
        videoLink,
        actors,
        director,
        runTime,
        commentsCount,
        name,
        email,
        avatarPath,
        password,
        posterImage,
        backgroundImage,
        backgroundColor
      ]) => ({
        title,
        description,
        publicationDate: new Date(publicationDate),
        genre: FilmGenre[genre as FilmGenre] ,
        year: Number.parseInt(year, 10),
        rating: Number.parseInt(rating, 10),
        previewVideoLink,
        videoLink,
        actors: actors.split(';'),
        director,
        runTime: Number.parseInt(runTime, 10),
        commentsCount: Number.parseInt(commentsCount, 10),
        user: {name, email, avatarPath, password},
        posterImage,
        backgroundImage,
        backgroundColor,
      }));
  }
}
