import { readFileSync } from 'fs';
import { COMMAND_START_SYMBOL, UTF_8 } from '../const.js';
import { Command } from '../types/command.enum.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = `${COMMAND_START_SYMBOL}${Command.Version}`;

  private readVersion(): string {
    const packageJsonPath = './package.json';
    const contentPageJSON = readFileSync(packageJsonPath, UTF_8);
    const content = JSON.parse(contentPageJSON);

    return content.version;
  }

  public async execute() {
    const version = this.readVersion();

    console.log(version);
  }
}
