const fs = require("fs");
const path = require('path');
const csv = require("csv-parser");
const moment = require('moment');

const formatToBRL = require("../utils/formatCurrency");
const { parseDate } = require("../utils/parseDate");
const {
  verifyTypeDocument,
  validateCPF,
  validateCNPJ,
} = require("../utils/documentValidator");

function validateInstallments(vlTotal, qtPrestacoes, vlPresta, dtVctPre, vlMulta, vlMora) {
  if (!vlTotal || !qtPrestacoes || !vlPresta) {
    return false;
  }

  const calculatedPresta = vlTotal / qtPrestacoes;

  const roundedCalculatedPresta = Math.round(calculatedPresta * 100) / 100;
  const roundedVlPresta = Math.round(vlPresta * 100) / 100;
  const roundedVlMulta = Math.round(vlMulta * 100) / 100;

  const today = moment();
  const dtVctPreFormated = moment(dtVctPre);

  let vlPrestaWithMult = today.isAfter(dtVctPreFormated, 'day') && roundedCalculatedPresta + roundedVlMulta;

  if (vlPrestaWithMult) {
    return formatToBRL(vlPrestaWithMult)
  }

  if (vlMora > vlPrestaWithMult || vlMora > roundedVlPresta) {
    return "pagamento está inconsistente!"
  }

  return formatToBRL(roundedCalculatedPresta === roundedVlPresta);
}

function checkTypeDocument(doc) {
  const document = verifyTypeDocument(doc);

  switch (document) {
    case "CPF":
      return validateCPF(doc);
    case "CNPJ":
      return validateCNPJ(doc);
    default:
      return false;
  }
}

function formatMonetaryValues({
  vlPresta,
  vlTotal,
  vlMora,
  vlMulta,
  vlOutAcr,
  vlIof,
  vlDescon,
  vlAtual,
  qtPrestacoes,
  dtContrato,
  dtVctPre,
  nrCpfCnpj,
}) {
  const formatValue = (value) => formatToBRL(value);

  return {
    vlPresta: formatValue(vlPresta),
    vlTotal: formatValue(vlTotal),
    vlMora: formatValue(vlMora),
    vlMulta: formatValue(vlMulta),
    vlOutAcr: formatValue(vlOutAcr),
    vlIof: formatValue(vlIof),
    vlDescon: formatValue(vlDescon),
    vlAtual: formatValue(vlAtual),
    validateInstallments: validateInstallments(
      parseFloat(vlTotal),
      parseInt(qtPrestacoes, 10),
      parseFloat(vlPresta),
      parseDate(dtVctPre),
      parseFloat(vlMulta),
      parseFloat(vlMora)
    ),
    dtContrato: parseDate(dtContrato),
    dtVctPre: parseDate(dtVctPre),
    validDocument: checkTypeDocument(nrCpfCnpj),
  };
}

async function readFile() {
  const filePath = path.resolve(__dirname, '../data/data.csv');

  return new Promise((resolve, reject) => {
    let dataArray = [];

    const stream = fs.createReadStream(filePath).pipe(csv());

    stream.on("data", (row) => {
      dataArray.push({
        ...row,
        ...formatMonetaryValues(row),
      });
    });

    stream.on("end", () => {
      resolve(dataArray);
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = {
  readFile,
  validateInstallments,
  checkTypeDocument,
};
