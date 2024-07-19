import { processData } from '../src/services/dataProcessor';
import { CsvRow } from '../src/interfaces/DataTypes';

describe('Data Processor', () => {
  const testData: CsvRow[] = [
    {
      nrInst: '533',
      nrAgencia: '32',
      cdClient: '56133',
      nmClient: 'CLIENTE TESTE 1',
      nrCpfCnpj: '12345678901',
      nrContrato: '733067',
      dtContrato: '20221227',
      qtPrestacoes: '5',
      vlTotal: '10000.00',
      cdProduto: '777',
      dsProduto: 'CDC PESSOA FISICA',
      cdCarteira: '17',
      dsCarteira: 'CRÉDITO DIRETO AO CONSUMIDOR',
      nrProposta: '798586',
      nrPresta: '1',
      tpPresta: 'Original',
      nrSeqPre: '0',
      dtVctPre: '20230406',
      vlPresta: '2000.00',
      vlMora: '0',
      vlMulta: '0',
      vlOutAcr: '0',
      vlIof: '0',
      vlDescon: '0',
      vlAtual: '2000.00',
      idSituac: 'Aberta',
      idSitVen: 'A Vencer'
    },
    {
      nrInst: '1150',
      nrAgencia: '25',
      cdClient: '81045',
      nmClient: 'CLIENTE TESTE 2',
      nrCpfCnpj: '98765432000199',
      nrContrato: '273134',
      dtContrato: '20240804',
      qtPrestacoes: '3',
      vlTotal: '15000.00',
      cdProduto: '1708',
      dsProduto: 'CDC PESSOA JURIDICA',
      cdCarteira: '2',
      dsCarteira: 'CRÉDITO DIRETO AO CONSUMIDOR',
      nrProposta: '826965',
      nrPresta: '1',
      tpPresta: 'Original',
      nrSeqPre: '0',
      dtVctPre: '20240624',
      vlPresta: '5000.00',
      vlMora: '0',
      vlMulta: '0',
      vlOutAcr: '0',
      vlIof: '0',
      vlDescon: '0',
      vlAtual: '5000.00',
      idSituac: 'Aberta',
      idSitVen: 'A Vencer'
    }
  ];

  it('should process data correctly', () => {
    const result = processData(testData);

    expect(result.processedCount).toBe(testData.length);
    expect(result.invalidCpfCnpj).toBe(0);
    expect(result.invalidValues).toBe(0);
    expect(result.errors.length).toBe(0);
  });

  it('should identify invalid CPF/CNPJ', () => {
    const invalidData = [
      {...testData[0], nrCpfCnpj: '11111111111'},
      {...testData[1], nrCpfCnpj: '11111111111111'}
    ];
    const result = processData(invalidData);

    expect(result.invalidCpfCnpj).toBe(2);
    expect(result.errors.length).toBe(2);
  });

  it('should identify inconsistent values', () => {
    const inconsistentData = [
      {...testData[0], vlTotal: '10000.00', qtPrestacoes: '5', vlPresta: '1000.00'},
    ];
    const result = processData(inconsistentData);

    expect(result.invalidValues).toBe(1);
    expect(result.errors.length).toBe(1);
  });

  it('should format currency values correctly', () => {
    const result = processData(testData);

    expect(result.processedCount).toBe(testData.length);
    const processedItem = result.processedData ? result.processedData[0] : null;

    if (processedItem) {
      expect(processedItem.vlTotal).toBe('R$ 10.000,00');
      expect(processedItem.vlPresta).toBe('R$ 2.000,00');
    }
  });
});
