import got from 'got';

import { CardGenerator } from '../common/card-generator/card-generator.js';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';
import { COMMAND_START_SYMBOL } from '../const.js';
import { Command } from '../types/command.enum.js';
import { MockData } from '../types/mock-data.type.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = `${COMMAND_START_SYMBOL}${Command.Generate}`;
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const cardCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }

    const cardGeneratorString = new CardGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < cardCount; i++) {
      await tsvFileWriter.write(cardGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
