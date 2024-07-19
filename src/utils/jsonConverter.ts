import fs from 'fs';
import path from 'path';
import { parseCsv } from './csvParser';
import { CsvRow } from '../interfaces/DataTypes';

const OUTPUT_DIR = path.join(__dirname, '../../output');
const RECORDS_PER_FILE = 500;

/*
 * Este arquivo tem o intuito de percorrer a base de dados CSV e converter os dados para JSON, dividindo a base inteira em grupos de 500.
 * Não foi implementado devido ao tempo. Trouxe de um outro projeto que desenvolvi.
 *
 *
 * */

export async function convertCsvToJson(inputFilePath: string): Promise<void> {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const data: CsvRow[] = await parseCsv(inputFilePath);
    let fileIndex = 1;

    for (let i = 0; i < data.length; i += RECORDS_PER_FILE) {
      const chunk = data.slice(i, i + RECORDS_PER_FILE);
      const outputFilePath = path.join(OUTPUT_DIR, `output_${fileIndex}.json`);

      fs.writeFileSync(outputFilePath, JSON.stringify(chunk, null, 2));
      console.log(`Arquivo ${outputFilePath} criado com ${chunk.length} registros.`);

      fileIndex++;
    }

    console.log(`Conversão concluída. ${fileIndex - 1} arquivos JSON criados.`);
  } catch (error) {
    console.error('Erro durante a conversão CSV para JSON:', error.message);
    throw error;
  }
}
