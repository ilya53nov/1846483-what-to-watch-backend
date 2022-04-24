import { CliCommandInterface } from '../cli-command/cli-command.interface.js';
import { COMMAND_START_SYMBOL } from '../const.js';
import { Command } from '../types/command.enum.js';

type ParsedCommand = {
  [key: string]: string[];
}

export default class CLIApplication {
  private commands: {[propertyName: string]: CliCommandInterface} = {};
  private defaultCommand = `${COMMAND_START_SYMBOL}${Command.Help}`;

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith(COMMAND_START_SYMBOL)) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public registerCommands(commandList: CliCommandInterface[]): void {
    this.commands = commandList.reduce((acc, command) => {
      const cliCommand = command;

      acc[cliCommand.name] = cliCommand;

      return acc;
    }, this.commands);
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
