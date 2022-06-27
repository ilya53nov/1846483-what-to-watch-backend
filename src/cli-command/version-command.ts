import { readFileSync } from 'fs';

import { UTF_8 } from '../const.js';
import { Command } from '../types/command.enum.js';
import { COMMAND_START_SYMBOL, PACKAGE_JSON_PATH } from './cli-command.constant.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = `${COMMAND_START_SYMBOL}${Command.Version}`;

  private readVersion(): string {
    const contentPageJSON = readFileSync(PACKAGE_JSON_PATH, UTF_8);
    const content = JSON.parse(contentPageJSON);

    return content.version;
  }

  public async execute() {
    const version = this.readVersion();

    console.log(version);
  }
}
