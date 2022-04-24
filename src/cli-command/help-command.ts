import chalk from 'chalk';
import { COMMAND_START_SYMBOL } from '../const.js';
import { Command } from '../types/command.enum.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = `${COMMAND_START_SYMBOL}${Command.Help}`;

  public async execute(): Promise<void> {
    console.log(`
      ${chalk.bgRed('Программа для подготовки данных для REST API сервера.')}

      ${chalk.green('Пример:')}
          ${chalk.red('main.js --<command> [--arguments]')}

      ${chalk.green('Команды:')}

          ${chalk.yellow(
    `--version:
              # Выводит информацию о версии приложения. Информация о версии считывается из package.json`
  )}

          ${chalk.red(
    `--help:
              # Выводит список и описание всех поддерживаемых аргументов.`
  )}

          ${chalk.magenta(
    `--import ${chalk.yellow('<filepath>')}:
              # Импортирует в базу данных информацию из tsv-файла. Путь к файлу передаётся в параметре ${chalk.yellow('<filepath>')}.`
  )}

          ${chalk.cyan(
    `--generate ${chalk.red('<n>')} ${chalk.yellow('<filepath>')} ${chalk.white('<url>')}:
              # Создаёт файл в формате tsv с тестовыми данными. Параметр ${chalk.red('<n>')} задаёт количество генерируемых карточек для фильмов. Параметр ${chalk.yellow('<filepath>')} указывает путь для сохранения файла с описанием карточек фильмов. Параметр ${chalk.white('<url>')} задаёт адрес сервера, с которого необходимо взять данные.`
  )}
    `);
  }
}
