// Função para validar CPF
export const isValidCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica se tem 11 dígitos e se todos os dígitos são iguais

  const calcCheckDigit = (base, length) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(base.charAt(i)) * (length + 1 - i);
    }
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const checkDigit1 = calcCheckDigit(cpf, 9);
  const checkDigit2 = calcCheckDigit(cpf, 10);

  return (
    checkDigit1 === parseInt(cpf.charAt(9)) &&
    checkDigit2 === parseInt(cpf.charAt(10))
  );
};

// Função para validar CNPJ
export const isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (cnpj.length !== 14) return false;

  const calcCheckDigit = (base, length) => {
    let sum = 0;
    let pos = length - 7;
    for (let i = 0; i < length; i++) {
      sum += parseInt(base.charAt(i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const checkDigit1 = calcCheckDigit(cnpj, 12);
  const checkDigit2 = calcCheckDigit(cnpj, 13);

  return (
    checkDigit1 === parseInt(cnpj.charAt(12)) &&
    checkDigit2 === parseInt(cnpj.charAt(13))
  );
};

// Função para validar CPF ou CNPJ
export const validateCpfCnpj = (value) => {
  if (value.length === 11) {
    return isValidCPF(value);
  } else if (value.length === 14) {
    return isValidCNPJ(value);
  }
  return false;
};

// Função para validar valores (exemplo de validação)
export const validateValues = (vlTotal, qtPrestacoes, vlPresta) => {
  // Exemplo de validação: verifique se vlPresta multiplicado por qtPrestacoes é igual a vlTotal
  return vlPresta * qtPrestacoes === vlTotal;
};

// Função para formatar valores como moeda
export const formatCurrency = (value) => {
  return `$${value.toFixed(2)}`;
};
