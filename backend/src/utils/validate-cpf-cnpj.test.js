import * as validations from "./validate-cpf-cnpj.js";

describe("validateCpfCnpj", () => {
  it("should return 'Número inválido' for invalid input", () => {
    expect(validations.validateCpfCnpj("1234567890")).toBe("Número inválido");
    expect(validations.validateCpfCnpj("123456789012345")).toBe(
      "Número inválido"
    );
  });
});

describe("validateCpf", () => {
  it("should return true for valid CPF", () => {
    expect(validations.validateCpf("330.575.390-09")).toBe(true);
  });

  it("should return false for invalid CPF", () => {
    expect(validations.validateCpf("12345678901")).toBe(false);
  });
});

describe("validateCnpj", () => {
  it("should return true for valid CNPJ", () => {
    expect(validations.validateCnpj("11444777000161")).toBe(true);
  });

  it("should return false for invalid CNPJ", () => {
    expect(validations.validateCnpj("12345678000191")).toBe(false);
  });
});
