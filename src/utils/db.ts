import { MONGO_DB } from '../const.js';

export const getURI = (
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string,
): string => `${MONGO_DB}://${username}:${password}@${host}:${port}/${databaseName}?authSource=${username}`;
