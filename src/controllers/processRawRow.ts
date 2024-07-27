import _ from 'lodash';

import { RawRow } from '../models/RawRow';

import { parseCurrencyBRL } from './parseCurrencyBRL';
import { validateCpfCnpj } from './validateCpfCnpj';
import { validateTotalValueAndInstallments } from './validateTotalValueAndInstallments';

export function processRawRow(row: RawRow): {
  validCpfCnpj: number;
  invalidCpfCnpj: number;
  validValues: number;
  invalidValues: number;
} {
  // Aplica a validação de CPF/CNPJ à linha atual.
  const isCpfCnpjValid = validateCpfCnpj(row.nrCpfCnpj);

  // Aplica a validação de valor total e número de parcelas à linha atual.
  const isValuesValid = validateTotalValueAndInstallments(
    row.vlTotal,
    row.qtPrestacoes,
    row.vlPresta
  );

  // Converte os valores monetários da linha para o formato de moeda brasileira (BRL).
  row.vlTotal = parseCurrencyBRL(row.vlTotal);
  row.vlPresta = parseCurrencyBRL(row.vlPresta);
  row.vlMora = parseCurrencyBRL(row.vlMora);
  row.vlMulta = parseCurrencyBRL(row.vlMulta);
  row.vlOutAcr = parseCurrencyBRL(row.vlOutAcr);
  row.vlIof = parseCurrencyBRL(row.vlIof);
  row.vlDescon = parseCurrencyBRL(row.vlDescon);
  row.vlAtual = parseCurrencyBRL(row.vlAtual);

  return {
    validCpfCnpj: isCpfCnpjValid ? 1 : 0,
    invalidCpfCnpj: isCpfCnpjValid ? 0 : 1,
    validValues: isValuesValid ? 1 : 0,
    invalidValues: isValuesValid ? 0 : 1,
  };
}
