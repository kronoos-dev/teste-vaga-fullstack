function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  for (let i = 9; i < 11; i++) {
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += parseInt(cpf.charAt(j), 10) * (i + 1 - j);
    }
    let remainder = sum % 11;
    let digit = remainder < 2 ? 0 : 11 - remainder;
    if (parseInt(cpf.charAt(i), 10) !== digit) {
      return false;
    }
  }

  return true;
}

function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]/g, "");

  if (cnpj.length !== 14) {
    return false;
  }

  const calcDigit = (str, weights) => {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += parseInt(str[i], 10) * weights[i];
    }
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const weightsForFirstDigit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weightsForSecondDigit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstDigit = calcDigit(cnpj.substring(0, 12), weightsForFirstDigit);
  const secondDigit = calcDigit(
    cnpj.substring(0, 12) + firstDigit,
    weightsForSecondDigit
  );

  return cnpj.substring(12) === `${firstDigit}${secondDigit}`;
}

function verifyTypeDocument(doc) {
  const result = doc.replace(/[^\d]/g, "");

  if (result.length === 11) {
    return 'CPF';
  } else if (result.length === 14) {
    return 'CNPJ';
  }

  return '';
}

module.exports = {
  validateCPF,
  validateCNPJ,
  verifyTypeDocument,
};
