import { parseCsv } from './utils/csvParser';
import { processData } from './services/dataProcessor';

async function main() {
  try {
    console.log('Iniciando processamento do arquivo CSV...');
    const data = await parseCsv('./data/data.csv');
    console.log(`Leitura concluída. ${data.length} registros encontrados.`);

    console.log('Processando dados...');
    const result = processData(data);

    console.log('Processamento concluído.');
    console.log(`Total de registros processados: ${result.processedCount}`);
    console.log(`CPF/CNPJ inválidos: ${result.invalidCpfCnpj}`);
    console.log(`Valores inválidos: ${result.invalidValues}`);
  } catch (error) {
    console.error('Erro durante o processamento:', error);
  }
}

main();
