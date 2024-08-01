const fs = require('fs');
const csv = require('csv-parser');

interface Data {
  nrCpfCnpj: string;
  vlTotal: string;
  qtPrestacoes: string;
  vlPresta: string;
  vlMora: string;
}

interface ProcessedData {
  nrCpfCnpj: string;
  isCpfCnpjValid: boolean;
  vlTotal: string;
  qtPrestacoes: string;
  vlPresta: string;
  vlMora: string;
  isValueValid: boolean;
}

/**
 * Formatação de um número no formado de moeda brasileira (BRL).
 */
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

/**
 * Valida um número de CPF
 */
const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cpf.charAt(10));
};

/**
 * Valida um número de CNPJ.
 */
const isValidCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj.length !== 14) return false;

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
};

/**
 * Aqui estou verificando se uma string e valida como CPF ou CNPJ
 *
 */
const isValidCPFOrCNPJ = (nrCpfCnpj: string): boolean => {
  if (nrCpfCnpj.length === 11) return isValidCPF(nrCpfCnpj);
  if (nrCpfCnpj.length === 14) return isValidCNPJ(nrCpfCnpj);
  return false;
};

/**
 * Aqui eu chamo todas as funções criadas acima para processar o arquivo CSV
 * @param filePath - O caminho para o arquivo CSV, no caso esta na pasta raiz do projeto.
 */
const processCSV = (filePath: string): void => {
  const results: ProcessedData[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data: Data) => {
      const { nrCpfCnpj, vlTotal, qtPrestacoes, vlPresta, vlMora } = data;

      const isCpfCnpjValid = isValidCPFOrCNPJ(nrCpfCnpj);
      const totalPrestacoes = Number(vlPresta) * Number(qtPrestacoes);
      const isValueValid = Number(vlTotal) === totalPrestacoes;

      const formattedTotal = formatCurrency(Number(vlTotal));
      const formattedPresta = formatCurrency(Number(vlPresta));
      const formattedMora = formatCurrency(Number(vlMora));

      results.push({
        nrCpfCnpj,
        isCpfCnpjValid,
        vlTotal: formattedTotal,
        qtPrestacoes,
        vlPresta: formattedPresta,
        vlMora: formattedMora,
        isValueValid,
      });
    })
    .on('end', () => {
      console.log('Dados Processados:', results);
    });
};

/**
 * Aqui eu apenas executo a função processCSV e passo onde esta localizado o arquivo de excel.
 */
processCSV('./data.csv');
