import fs from 'node:fs';
import csvParser from 'csv-parser';
import _ from 'lodash';

import { RawRow } from '../models/RawRow';
import { processRawRow } from './processRawRow';

type ProcessRawRowReturn = ReturnType<typeof processRawRow>;

interface ParseCsvReturn extends ProcessRawRowReturn {
  rowsProcessed: number;
}

/**
 * Lê um arquivo CSV, aplica validações a cada linha, acumula resultados e salva no banco de dados.
 *
 * @param csvFilePath - O caminho do arquivo CSV.
 * @returns Um objeto contendo o total de linhas processadas e os resultados acumulados das validações.
 */
export async function parseCSV(csvFilePath: string): Promise<ParseCsvReturn> {
  // Inicializa o objeto de retorno.
  const result = {
    rowsProcessed: 0,
  } as ParseCsvReturn;

  await new Promise((resolve) => {
    // Cria um stream de leitura para o arquivo CSV e o passa pelo parser CSV.
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', async (rawRow: RawRow) => {
        const rawRowResult = processRawRow(rawRow);

        // Atualiza os resultados acumulados.
        Object.keys(rawRowResult).forEach((key) => {
          result[key as keyof typeof result] =
            _.get(result, key, 0) +
            rawRowResult[key as keyof typeof rawRowResult];
        });

        result.rowsProcessed++;
      })
      .on('end', resolve);
  });

  return result;
}
