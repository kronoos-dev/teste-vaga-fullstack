export function validateCpfCnpj(number) {
  const digits = number.replace(/\D/g, "");

  if (digits.length === 11) {
    return validateCpf(digits);
  } else if (digits.length === 14) {
    return validateCnpj(digits);
  } else {
    return "Número inválido";
  }
}

export function validateCpf(cpf) {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) {
    return false;
  }
  if (/^(\d)\1{10}$/.test(digits)) {
    return false;
  }
  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(digits.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(digits.substring(9, 10))) {
    return false;
  }
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(digits.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(digits.substring(10, 11))) {
    return false;
  }
  return true;
}

export function validateCnpj(cnpj) {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) {
    return false;
  }
  if (/^(\d)\1{13}$/.test(digits)) {
    return false;
  }
  let sum = 0;
  let length = digits.length - 2;
  let position = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(digits.charAt(length - i)) * position--;
    if (position < 2) {
      position = 9;
    }
  }
  let remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (remainder !== parseInt(digits.charAt(length))) {
    return false;
  }
  sum = 0;
  length = length + 1;
  position = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(digits.charAt(length - i)) * position--;
    if (position < 2) {
      position = 9;
    }
  }
  remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (remainder !== parseInt(digits.charAt(length))) {
    return false;
  }
  return true;
}
