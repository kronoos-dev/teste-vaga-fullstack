import { validateInstallments } from "./validate-installments";

describe("validateInstallments", () => {
  it("should return true when all conditions are met", () => {
    const vlTotal = 1000;
    const qtPrestacoes = 5;
    const vlPresta = 200;
    const vlMovimento = 500;
    const vlPag = 500;
    const dtPag = "2022-01-01";
    const dtMovimento = "2021-12-01";

    const result = validateInstallments(
      vlTotal,
      qtPrestacoes,
      vlPresta,
      vlMovimento,
      vlPag,
      dtPag,
      dtMovimento
    );

    expect(result).toBe(true);
  });

  it("should return false and log error message when vlInstallments is not equal to vlPresta", () => {
    const vlTotal = 1000;
    const qtPrestacoes = 5;
    const vlPresta = 300;
    const vlMovimento = 500;
    const vlPag = 500;
    const dtPag = "2022-01-01";
    const dtMovimento = "2021-12-01";

    const consoleSpy = jest.spyOn(console, "log");

    const result = validateInstallments(
      vlTotal,
      qtPrestacoes,
      vlPresta,
      vlMovimento,
      vlPag,
      dtPag,
      dtMovimento
    );

    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Erro de cálculo: o resultado da divisão não é igual a vlPresta. "
    );

    consoleSpy.mockRestore();
  });

  it("should return false and log error message when vlMovimento is greater than vlPag", () => {
    const vlTotal = 1000;
    const qtPrestacoes = 5;
    const vlPresta = 200;
    const vlMovimento = 600;
    const vlPag = 500;
    const dtPag = "2022-01-01";
    const dtMovimento = "2021-12-01";

    const consoleSpy = jest.spyOn(console, "log");

    const result = validateInstallments(
      vlTotal,
      qtPrestacoes,
      vlPresta,
      vlMovimento,
      vlPag,
      dtPag,
      dtMovimento
    );

    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      "O valor do movimento é maior que o valor do pagamento. "
    );

    consoleSpy.mockRestore();
  });

  it("should return false and log error message when dtPag is later than dtMovimento", () => {
    const vlTotal = 1000;
    const qtPrestacoes = 5;
    const vlPresta = 200;
    const vlMovimento = 500;
    const vlPag = 500;
    const dtPag = "2022-01-02";
    const dtMovimento = "2022-01-01";

    const consoleSpy = jest.spyOn(console, "log");

    const result = validateInstallments(
      vlTotal,
      qtPrestacoes,
      vlPresta,
      vlMovimento,
      vlPag,
      dtPag,
      dtMovimento
    );

    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      "O pagamento está atrasado em 1 dias. A taxa de atraso é de 5. "
    );

    consoleSpy.mockRestore();
  });
});
