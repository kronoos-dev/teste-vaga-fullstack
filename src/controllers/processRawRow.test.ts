import { processRawRow } from './processRawRow';

import { RawRow } from '../models/RawRow';

jest.mock('./parseCurrencyBRL', () => ({
  parseCurrencyBRL: jest.fn((value: string) => `R$ ${value}`),
}));

jest.mock('./validateCpfCnpj', () => ({
  validateCpfCnpj: jest.fn((value: string) => value.length === 11),
}));

jest.mock('./validateTotalValueAndInstallments', () => ({
  validateTotalValueAndInstallments: jest.fn(
    (totalValue, quantity, installmentValue) =>
      parseFloat(totalValue) / parseInt(quantity, 10) ===
      parseFloat(installmentValue)
  ),
}));

const baseRow: RawRow = {
  nrInst: '',
  nrAgencia: '',
  cdClient: '',
  nmClient: '',
  nrCpfCnpj: '',
  nrContrato: '',
  dtContrato: '',
  qtPrestacoes: '',
  vlTotal: '',
  cdProduto: '',
  dsProduto: '',
  cdCarteira: '',
  dsCarteira: '',
  nrProposta: '',
  nrPresta: '',
  tpPresta: '',
  nrSeqPre: '',
  dtVctPre: '',
  vlPresta: '',
  vlMora: '',
  vlMulta: '',
  vlOutAcr: '',
  vlIof: '',
  vlDescon: '',
  vlAtual: '',
  idSituac: '',
  idSitVen: '',
};

describe('processRawRow', () => {
  it('should process a valid row correctly', async () => {
    const row: RawRow = {
      ...baseRow,
      nrCpfCnpj: '12345678901',
      vlTotal: '1000',
      qtPrestacoes: '10',
      vlPresta: '100',
      vlMora: '10',
      vlMulta: '5',
      vlOutAcr: '1',
      vlIof: '0.5',
      vlDescon: '0.2',
      vlAtual: '980',
    };

    const result = await processRawRow(row);

    expect(result).toEqual({
      invalidCpfCnpj: 0,
      invalidValues: 0,
      validCpfCnpj: 1,
      validValues: 1,
    });
    expect(row.vlTotal).toBe('R$ 1000');
    expect(row.vlPresta).toBe('R$ 100');
    expect(row.vlMora).toBe('R$ 10');
    expect(row.vlMulta).toBe('R$ 5');
    expect(row.vlOutAcr).toBe('R$ 1');
    expect(row.vlIof).toBe('R$ 0.5');
    expect(row.vlDescon).toBe('R$ 0.2');
    expect(row.vlAtual).toBe('R$ 980');
  });

  it('should mark invalid CPF/CNPJ correctly', async () => {
    const row: RawRow = {
      ...baseRow,
      nrCpfCnpj: 'invalid_cpf_cnpj',
      vlTotal: '1000',
      qtPrestacoes: '10',
      vlPresta: '100',
      vlMora: '10',
      vlMulta: '5',
      vlOutAcr: '1',
      vlIof: '0.5',
      vlDescon: '0.2',
      vlAtual: '980',
    };

    const result = await processRawRow(row);

    expect(result).toEqual({
      invalidCpfCnpj: 1,
      invalidValues: 0,
      validCpfCnpj: 0,
      validValues: 1,
    });
  });

  it('should mark invalid values correctly', async () => {
    const row: RawRow = {
      ...baseRow,
      nrCpfCnpj: '12345678901',
      vlTotal: '1000',
      qtPrestacoes: '10',
      vlPresta: '90', // This should cause invalidValues to be marked as 1
      vlMora: '10',
      vlMulta: '5',
      vlOutAcr: '1',
      vlIof: '0.5',
      vlDescon: '0.2',
      vlAtual: '980',
    };

    const result = await processRawRow(row);

    expect(result).toEqual({
      validCpfCnpj: 1,
      invalidCpfCnpj: 0,
      validValues: 0,
      invalidValues: 1,
    });
  });

  it('should handle rows with empty values correctly', async () => {
    const row: RawRow = {
      ...baseRow,
      nrCpfCnpj: '',
      vlTotal: '',
      qtPrestacoes: '',
      vlPresta: '',
      vlMora: '',
      vlMulta: '',
      vlOutAcr: '',
      vlIof: '',
      vlDescon: '',
      vlAtual: '',
    };

    const result = await processRawRow(row);

    expect(result).toEqual({
      validCpfCnpj: 0,
      invalidCpfCnpj: 1,
      validValues: 0,
      invalidValues: 1,
    });
  });
});
