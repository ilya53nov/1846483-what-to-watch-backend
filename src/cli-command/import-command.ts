import { EmitEvent } from '../common/file-reader/emit-event.enum.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { COMMAND_START_SYMBOL } from '../const.js';
import { Command } from '../types/command.enum.js';
import { createCard, getErrorMessage } from '../utils/common.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = `${COMMAND_START_SYMBOL}${Command.Import}`;

  private onLine(line: string) {
    const card = createCard(line);

    console.log(card);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }

  public async execute(filepath: string): Promise<void> {
    const fileReader = new TSVFileReader(filepath.trim());

    fileReader.on(EmitEvent.Line, this.onLine);
    fileReader.on(EmitEvent.End, this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
