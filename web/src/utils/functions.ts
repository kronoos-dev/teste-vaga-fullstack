export function verifyCPF(value: string) {
  const cpf = value.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  let soma = 0;

  for (let i = 1; i <= 9; i++) {
    soma += Number(cpf.substring(i - 1, i)) * (11 - i);
  }

  let resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== Number(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += Number(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  return resto === Number(cpf.substring(10, 11));
}

export function verifyCNPJ(value: string): boolean {
  const cnpj = value.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const validateDigits = (cnpj: string, length: number) => {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights[i + (weights.length - length)];
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = validateDigits(cnpj, 12);
  const secondDigit = validateDigits(cnpj, 13);

  return (
    firstDigit === parseInt(cnpj.charAt(12)) &&
    secondDigit === parseInt(cnpj.charAt(13))
  );
}
