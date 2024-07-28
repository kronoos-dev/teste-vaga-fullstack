const validaCPF = (string_cpf) => {
  if (typeof string_cpf !== "string") return false;

  const cpf = string_cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  let soma_primeiro_digito = 0,
    soma_segundo_digito = 0;

  for (let i = 0; i < 9; i++) {
    soma_primeiro_digito += (10 - i) * parseInt(cpf.charAt(i), 10);
    soma_segundo_digito += (11 - i) * parseInt(cpf.charAt(i), 10);
  }

  soma_segundo_digito += 2 * parseInt(cpf.charAt(9), 10);

  const primeiro_verificador =
    soma_primeiro_digito % 11 < 2 ? 0 : 11 - (soma_primeiro_digito % 11);
  const segundo_verificador =
    soma_segundo_digito % 11 < 2 ? 0 : 11 - (soma_segundo_digito % 11);

  return (
    primeiro_verificador === parseInt(cpf.charAt(9), 10) &&
    segundo_verificador === parseInt(cpf.charAt(10), 10)
  );
};

function validarCNPJ(cnpj) {
  if (typeof cnpj !== "string") return false;

  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calcularDigito = (base, peso) => {
    const soma = base.reduce(
      (acc, digit, index) => acc + digit * peso[index],
      0
    );
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const base = cnpj.substring(0, 12).split("").map(Number);
  const digito1 = calcularDigito(base, peso1);
  const digito2 = calcularDigito([...base, digito1], peso2);

  return (
    digito1 === parseInt(cnpj.charAt(12), 10) &&
    digito2 === parseInt(cnpj.charAt(13), 10)
  );
}

const validaCPFOuCNPJ = (string_documento) => {
  if (typeof string_documento !== "string") return false;
  const documento = string_documento.replace(/\D/g, "");

  if (documento.length > 11) return validarCNPJ(string_documento);

  return validaCPF(string_documento);
};

module.exports = {
  validaCPF,
  validarCNPJ,
  validaCPFOuCNPJ,
};
