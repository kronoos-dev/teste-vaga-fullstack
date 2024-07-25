import path from 'node:path';

import { parseCSV } from './parseCSV';

describe('parseCSV', () => {
  it('should return an object with the total number of processed rows and the accumulated results of the validations', async () => {
    const csvFilePath = path.resolve(__dirname, '../data/data.csv');
    const result = await parseCSV(csvFilePath);

    expect(result).toEqual({
      rowsProcessed: 10086,
      validCpfCnpj: 13,
      invalidCpfCnpj: 10073,
      invalidValues: 10086,
      validValues: 0,
    });
  });

  it('should return an object with the total number of processed rows and CPF/CNPJ validation invalid', async () => {
    const csvFilePath = path.resolve(__dirname, '../data/cpfCnpjInvalids.csv');
    const result = await parseCSV(csvFilePath);

    expect(result).toEqual({
      rowsProcessed: 7,
      validCpfCnpj: 0,
      invalidCpfCnpj: 7,
      validValues: 0,
      invalidValues: 7,
    });
  });
});
