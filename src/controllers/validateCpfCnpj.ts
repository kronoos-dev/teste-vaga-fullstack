import _ from 'lodash';

/**
 * Valida um número de CPF.
 *
 * @param cpf - O número de CPF como uma string de 11 dígitos.
 * @returns Um booleano indicando se o CPF é válido ou não.
 */
export function validateCpf(cpf: string): boolean {
  /**
   * Função interna para validar os dígitos verificadores do CPF.
   *
   * @param arr - Array de números representando os dígitos do CPF.
   * @param position - Indica qual dígito verificador está sendo validado (1 ou 2).
   * @returns Um booleano indicando se o dígito verificador é válido ou não.
   */
  const validateDigit = (arr: number[], position: number): boolean => {
    const factor = position === 1 ? 10 : 11;
    const arrayDigit = position === 1 ? 9 : 10;

    // Calcula a soma dos produtos dos dígitos pelos fatores correspondentes usando lodash.
    const sum = _.sumBy(_.range(arrayDigit), (i) => arr[i] * (factor - i));

    // Calcula o resto da divisão da soma por 11.
    const division = sum % 11;
    const verifyingDigit = division > 1 ? 11 - division : 0;

    // Verifica se o dígito calculado é igual ao dígito verificador no CPF.
    return arr[arrayDigit] === verifyingDigit;
  };

  const arrCpf = cpf.split('').map(Number);

  // Verifica se todos os dígitos do CPF são iguais.
  if (_.every(arrCpf, (num) => num === arrCpf[0])) {
    return false;
  }

  // Valida os dois dígitos verificadores.
  const firstDigit = validateDigit(arrCpf, 1);
  const secondDigit = validateDigit(arrCpf, 2);

  return firstDigit && secondDigit;
}

/**
 * Valida um número de CNPJ.
 *
 * @param cnpj - O número de CNPJ como uma string de 14 dígitos.
 * @returns Um booleano indicando se o CNPJ é válido ou não.
 */
export function validateCnpj(cnpj: string): boolean {
  const validateDigit = (arr: number[], position: number): boolean => {
    const weights =
      position === 1
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const arrayItems = position === 1 ? 12 : 13;

    // Calcula a soma dos produtos dos dígitos pelos fatores correspondentes usando lodash.
    const sum = _.sumBy(_.range(arrayItems), (i) => weights[i] * arr[i]);

    const division = sum % 11;
    const verifyingDigit = division >= 2 ? 11 - division : 0;

    // Verifica se o dígito calculado é igual ao dígito verificador no CNPJ.
    return arr[arrayItems] === verifyingDigit;
  };

  const arrCnpj = cnpj.split('').map(Number);

  // Verifica se todos os dígitos do CNPJ são iguais.
  if (_.every(arrCnpj, (num) => num === arrCnpj[0])) {
    return false;
  }

  // Valida os dois dígitos verificadores.
  const firstDigit = validateDigit(arrCnpj, 1);
  const secondDigit = validateDigit(arrCnpj, 2);

  return firstDigit && secondDigit;
}

/**
 * Valida um número de CPF ou CNPJ.
 *
 * @param nrCpfCnpj - O número de CPF ou CNPJ como uma string que pode conter caracteres não numéricos.
 * @returns Um booleano indicando se o CPF ou CNPJ é válido ou não.
 */
export function validateCpfCnpj(nrCpfCnpj: string): boolean {
  // Remove todos os caracteres não numéricos da entrada.
  const formattedValue = nrCpfCnpj.replace(/\D/g, '');

  // Verifica se o valor formatado tem 11 dígitos (CPF).
  if (formattedValue.length === 11) {
    return validateCpf(formattedValue);
  }
  // Verifica se o valor formatado tem 14 dígitos (CNPJ).
  else if (formattedValue.length === 14) {
    return validateCnpj(formattedValue);
  }

  return false;
}
