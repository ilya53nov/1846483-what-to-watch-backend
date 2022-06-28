import { createWriteStream, WriteStream } from 'fs';

import { LINE_BREAK_CHARACTER, UTF_8 } from '../../const.js';
import { HIGH_WATER_MARK } from './file-writer.constant.js';
import { FileWriterInterface } from './file-writer.interface.js';
import { Flag } from './flag.enum.js';


export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      flags: Flag.W,
      encoding: UTF_8,
      highWaterMark: HIGH_WATER_MARK,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}${LINE_BREAK_CHARACTER}`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }

    return Promise.resolve();
  }
}
