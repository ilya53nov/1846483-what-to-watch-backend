import EventEmitter from 'events';
import { createReadStream } from 'fs';

import { LINE_BREAK_CHARACTER, UTF_8 } from '../../const.js';
import { EmitEvent } from './emit-event.enum.js';
import { END_LINE_POSITION_DEFAULT, HIGH_WATER_MARK, IMPORTED_ROW_COUNT_DEFAULT, LINE_READ_DEFAULT } from './file-reader.constant.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public filename: string) {
    super();
  }

  public async read():Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: HIGH_WATER_MARK,
      encoding: UTF_8,
    });

    let lineRead = LINE_READ_DEFAULT;
    let endLinePosition = END_LINE_POSITION_DEFAULT;
    let importedRowCount = IMPORTED_ROW_COUNT_DEFAULT;

    for await (const chunk of stream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf(LINE_BREAK_CHARACTER)) >= 0) {
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit(EmitEvent.Line, completeRow, resolve);
        });

      }
    }

    this.emit(EmitEvent.End, importedRowCount);
  }

}
