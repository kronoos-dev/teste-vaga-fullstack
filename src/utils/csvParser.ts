import fs from 'fs';
import csvParser from 'csv-parser';
import { CsvRow } from '../interfaces/DataTypes';

export function parseCsv(filePath: string): Promise<CsvRow[]> {
  return new Promise((resolve, reject) => {
    const results: CsvRow[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data: CsvRow) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
