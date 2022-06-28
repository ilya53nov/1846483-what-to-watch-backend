import * as jose from 'jose';
import crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';

import { DECIMAL_NUMBER_SYSTEM, EXPIRATION_TIME, LINE_BREAK_CHARACTER, TAB_CHARACTER, UTF_8 } from '../const.js';
import { Film } from '../types/film.type.js';
import { Genre } from '../types/genre.enum.js';
import { UnknownObject } from '../types/unknown-object.type.js';
import { DEFAULT_STATIC_IMAGES } from '../app/application.constant.js';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ValidationError } from 'class-validator/types/validation/ValidationError.js';
import { ServiceError } from '../types/service-error.enum.js';

export const createCard = (row: string) => {
  const tokens = row.replace(LINE_BREAK_CHARACTER, ''). split(TAB_CHARACTER);

  const [
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
    commentCount,
    name,
    email,
    avatarPath,
    password,
    posterImage,
    backgroundImage,
    backgroundColor
  ] = tokens;

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    genre: genre as Genre,
    year: Number.parseInt(year, DECIMAL_NUMBER_SYSTEM),
    rating: Number.parseInt(rating, DECIMAL_NUMBER_SYSTEM),
    previewVideoLink,
    videoLink,
    actors: actors.split(';'),
    director,
    runTime: Number.parseInt(runTime, DECIMAL_NUMBER_SYSTEM),
    commentCount: Number.parseInt(commentCount, DECIMAL_NUMBER_SYSTEM),
    user: {name, email, avatarPath, password},
    posterImage,
    backgroundImage,
    backgroundColor,
  } as Film;
};

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);

  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime(EXPIRATION_TIME)
    .sign(crypto.createSecretKey(jwtSecret, UTF_8));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    }));
};

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
