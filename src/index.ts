import path from 'node:path';

import { parseCSV } from './controllers/parseCSV';

async function main() {
  try {
    const csvFilePath = path.resolve(__dirname, './data/data.csv');

    console.log('Iniciando processamento do arquivo CSV...');
    const result = await parseCSV(csvFilePath);

    console.log();

    console.log('Processamento concluído.');
    console.log(`Total de registros processados: ${result.rowsProcessed}`);

    console.log();

    console.log(`CPF/CNPJ válidos: ${result.validCpfCnpj}`);
    console.log(`CPF/CNPJ inválidos: ${result.invalidCpfCnpj}`);

    console.log();

    console.log(`Valores Totais e Prestações válidos: ${result.validValues}`);
    console.log(
      `Valores Totais e Prestações inválidos: ${result.invalidValues}`
    );

    console.log();
  } catch (error) {
    console.error('Erro durante o processamento:', error);
  }
}

main();
