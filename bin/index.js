#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { mainFunctions } from './mainApp.js';

// Setando as configurações da CLI.
const argv = yargs(hideBin(process.argv))
  .usage('Uso: csvApp <command> [options]')
  .command('$0', 'Gera um novo arquivo com a validação dos dados.')
  .command('generateMockup', 'Gerar um arquivo grande para teste.')
  .command('count', 'Contar quantidade de linhas do arquivo.')
  .nargs('f', 1)
  .alias('f', 'file')
  .describe('f', 'Arquivo a ser carregado')
  .nargs('o', 1)
  .alias('o', 'output')
  .describe('o', 'Nome do arquivo a ser criado')
  .nargs('n', 1)
  .alias('n', 'number')
  .describe('n', 'Número de linhas que serão geradas no arquivo de teste')
  .demandOption(['f'])
  .help('h')
  .alias('h', 'help').argv


// Iniciando os comandos da aplicação
const handleCommand = async (command) => {
  if (command != 'count' && !argv.output) return console.error('É necessário passar um caminho de destino com a flag -o')

  const newApp = new mainFunctions(argv.file, argv.output);
  await newApp.count();

  if (command == 'count') return console.log(newApp.numLines);
  if (command == 'generateMockup') return newApp.generateMockup(argv.n || 1000000);
 
  newApp.main();
}

handleCommand(argv['_'][0])