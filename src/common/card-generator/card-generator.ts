import dayjs from 'dayjs';
import { TAB_CHARACTER } from '../../const.js';

import { Genre } from '../../types/genre.enum.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { FIRST_WEEK_DAY, LAST_WEEK_DAY } from './card-generator.constant.js';
import { CardGeneratorInterface } from './card-generator.interface.js';

export class CardGenerator implements CardGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genre = getRandomItem(Object.values(Genre));
    const year = getRandomItem<number>(this.mockData.years);
    const rating = getRandomItem<number>(this.mockData.ratings);
    const previewVideoLink = getRandomItem<string>(this.mockData.previewVideoLinks);
    const videoLink = getRandomItem<string>(this.mockData.videoLinks);
    const actors = getRandomItems<string>(this.mockData.actors).join(';');
    const director = getRandomItem<string>(this.mockData.directors);
    const runTime = getRandomItem<number>(this.mockData.runTimes);
    const commentsCount = getRandomItem<number>(this.mockData.commentsCount);
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const posterImage = getRandomItem<string>(this.mockData.posterImages);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImages);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColors);

    return [
      title, description, publicationDate, genre, year, rating,
      previewVideoLink, videoLink, actors, director, runTime,
      commentsCount, name, email, avatarPath, password,
      posterImage, backgroundImage, backgroundColor
    ].join(TAB_CHARACTER);
  }
}
