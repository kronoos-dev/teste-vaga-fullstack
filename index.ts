import fs from 'fs';
import csv from 'csv-parser';
import {formatCurrency, isValidCPFOrCNPJ} from './utils' 
import { ProcessedData, Data } from './interfaces'

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
