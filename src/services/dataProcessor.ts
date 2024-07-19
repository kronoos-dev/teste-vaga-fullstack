import { CsvRow } from '../interfaces/DataTypes';
import { formatCurrency } from '../utils/currencyFormatter';
import { validateCpfCnpj } from '../utils/cpfCnpjValidator';
import { validateTotalAndInstallments } from '../utils/valueValidator';

export function processData(data: CsvRow[]): {
  processedCount: number;
  invalidCpfCnpj: number;
  invalidValues: number;
} {
  let processedCount = 0;
  let invalidCpfCnpj = 0;
  let invalidValues = 0;

  for (const row of data) {
    processedCount++;

    if (!validateCpfCnpj(row.nrCpfCnpj)) {
      invalidCpfCnpj++;
    }

    if (!validateTotalAndInstallments(row.vlTotal, row.qtPrestacoes, row.vlPresta)) {
      invalidValues++;
    }

    row.vlTotal = formatCurrency(row.vlTotal);
    row.vlPresta = formatCurrency(row.vlPresta);
    row.vlMora = formatCurrency(row.vlMora);
    row.vlMulta = formatCurrency(row.vlMulta);
    row.vlOutAcr = formatCurrency(row.vlOutAcr);
    row.vlIof = formatCurrency(row.vlIof);
    row.vlDescon = formatCurrency(row.vlDescon);
    row.vlAtual = formatCurrency(row.vlAtual);
  }

  return { processedCount, invalidCpfCnpj, invalidValues };
}
