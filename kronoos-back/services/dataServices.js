const Papa = require('papaparse');
const { validateCpfCnpj, validateValues, formatCurrency } = require('../utils/validationUtils.js'); 

const BATCH_SIZE = 1000;

const processData = (csvData) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        const totalData = results.data;
        const processedData = [];

        let batchIndex = 0;
        const processBatch = () => {
          const batch = totalData.slice(batchIndex, batchIndex + BATCH_SIZE);
          const processedBatch = batch.map((item) => {
            const isValidCpfCnpj = validateCpfCnpj(item.nrCpfCnpj);
            const isValidValues = validateValues(
              parseFloat(item.vlTotal),
              parseInt(item.qtPrestacoes),
              parseFloat(item.vlPresta)
            );
            return {
              ...item,
              vlTotal: formatCurrency(parseFloat(item.vlTotal)),
              vlPresta: formatCurrency(parseFloat(item.vlPresta)),
              isValidCpfCnpj,
              isValidValues,
            };
          });
          processedData.push(...processedBatch);
          batchIndex += BATCH_SIZE;
          if (batchIndex < totalData.length) {
            setTimeout(processBatch, 0);
          } else {
            resolve(processedData);
          }
        };

        processBatch();
      },
      error: (error) => reject(error),
    });
  });
};

module.exports = { processData };
