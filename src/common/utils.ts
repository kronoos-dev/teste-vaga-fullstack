export const formatMoney = (num: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(num);
};

export const isDocumentValid = (document: string) => {
  const cleanDocument = document.replace(/[^\d]+/g, "");

  if (cleanDocument.length == 11) return isValidCPF(cleanDocument);
  if (cleanDocument.length == 14) return isValidCNPJ(cleanDocument);

  return false;
};

const isValidCPF = (cpf: string) => {
  const weights = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  const numbersToValidate = cpf.substring(0, 9).split("").map(Number);
  const cpfElements = cpf.split("").map(Number);

  if (!checkCPFVerifier(cpfElements[9], numbersToValidate, weights))
    return false;

  weights.unshift(11);

  numbersToValidate.push(cpfElements[9]);

  if (!checkCPFVerifier(cpfElements[10], numbersToValidate, weights))
    return false;

  return true;
};

const isValidCNPJ = (cnpj: string) => {
  const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const numbersToValidate = cnpj.substring(0, 12).split("").map(Number);
  const cnpjElements = cnpj.split("").map(Number);

  if (!checkCNPJVerifier(cnpjElements[12], numbersToValidate, weights))
    return false;

  weights.unshift(6);

  numbersToValidate.push(cnpjElements[12]);

  if (!checkCNPJVerifier(cnpjElements[13], numbersToValidate, weights))
    return false;

  return true;
};

const checkCNPJVerifier = (
  numToCheck: number,
  numbersToValidate: number[],
  validators: number[]
) => {
  let sum = 0;
  for (let i = 0; i < numbersToValidate.length; i++) {
    sum += numbersToValidate[i] * validators[i];
  }

  const verifier = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return verifier === numToCheck;
};

const checkCPFVerifier = (
  numToCheck: number,
  numbersToValidate: number[],
  validators: number[]
) => {
  let sum = 0;
  for (let i = 0; i < numbersToValidate.length; i++) {
    sum += numbersToValidate[i] * validators[i];
  }

  const verifier = (sum * 10) % 11 === 10 ? 0 : (sum * 10) % 11;

  return verifier === numToCheck;
};
