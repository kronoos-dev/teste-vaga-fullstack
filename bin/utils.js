const formatNumber = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatCashValue = (value) => formatNumber.format(value);

const validateCPF = (value) => {
  // Estou reservando os 9 primeiros dígitos.
  let firstDigits = value.substring(0, 9);

  // Calculando o dígito verificador.
  let sum = 0;
  for (let i = 10; i > 1; i--) sum += firstDigits[10-i] * i;
  let rest = sum % 11;
      
  // Validando o dígito verificador. 
  let vrfDigit = rest < 2 ? 0 : 11 - rest;
  if (value[9] != vrfDigit) return false;
  
  firstDigits += vrfDigit;

  // Segundo cálculo.
  sum = 0;
  for (let i = 11; i > 1; i--) sum += firstDigits[11-i] * i;
  
  rest = sum % 11;
  
  // Segunda validação
  vrfDigit = rest < 2 ? 0 : 11 - rest;
  if (vrfDigit != value[10]) return false;

  return true;
}

const validateCNPJ = (value) => {
  // Estou reservando os 12 primeiros dígitos.
  let firstDigits = value.substring(0, 12);

  // Calculando o primeiro dígito verificador
  // Usei um indíce decrescente pois achei mais fácil de fazer a lógica da variável pos.
  let sum = 0;
  let initIdx = 0;
  for (let i = 12; i > 0; i--) {
    let pos = i < 9 ? i+1 : i-7;
    sum += firstDigits[initIdx++] * pos;
  }

  // Validando primeiro dígito
  let rest = sum % 11;
  let vrfDigit = rest < 2 ? 0 : 11 - rest;
  if (value[12] != vrfDigit) return false;

  firstDigits += vrfDigit;

  // Calculando segundo dígito
  sum = 0;
  initIdx = 0;
  for (let i = 13; i > 0; i--) {
    let pos = i < 9 ? i+1 : i-7;
    sum += firstDigits[initIdx++] * pos;
  }

  // Validando segundo dígito
  rest = sum % 11;
  vrfDigit = rest < 2 ? 0 : 11 - rest;
  if (value[13] != vrfDigit) return false;

  return true;
}

export const validateDocument = (value) => {
  // Removendo todos os valores não númericos. 
  value = value.replace(/[^\d]+/g, '');

  // Verificação por tamanho
  if (value.length == 11) return validateCPF(value);
  if (value.length == 14) return validateCNPJ(value);
  
  return false;
}