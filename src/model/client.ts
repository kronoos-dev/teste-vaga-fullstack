export class Client {
  #document: string;
  #name: string;
  #code: string;

  constructor({
    code,
    name,
    document,
  }: {
    code: string;
    name: string;
    document: string;
  }) {
    this.#code = code;
    this.#name = name;
    this.#document = this.validateDocument(document);
  }

  get document() {
    return this.#document;
  }

  get name() {
    return this.#name;
  }

  get code() {
    return this.#code;
  }

  private validateCPF(cpf: string) {
    var soma = 0;
    var resto;

    var strCPF = cpf.replace(/[^\d]/g, "");

    if (strCPF.length !== 11) return false;

    if (
      [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
      ].indexOf(strCPF) !== -1
    )
      return false;

    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;

    if (resto != parseInt(strCPF.substring(9, 10))) return false;

    soma = 0;

    for (i = 1; i <= 10; i++)
      soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;

    if (resto != parseInt(strCPF.substring(10, 11))) return false;

    return true;
  }

  private validateCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
    )
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != +digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != +digitos.charAt(1)) return false;

    return true;
  }

  private removeSpecialCaracters(document: string) {
    return document.replace(/\D/g, "");
  }

  private validateDocument(document: string) {
    if (this.validateCPF(document) || this.validateCNPJ(document)) {
      return this.removeSpecialCaracters(document);
    }
    // throw new Error("Documento inválido");
    return this.removeSpecialCaracters(document);
  }
}
