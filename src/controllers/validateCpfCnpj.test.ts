import { validateCpf, validateCnpj, validateCpfCnpj } from './validateCpfCnpj';

describe('validateCpf', () => {
  it('should return true for a valid CPF', () => {
    const validCpf = '53707476448';
    expect(validateCpf(validCpf)).toBe(true);
  });

  it('should return false for an invalid CPF', () => {
    const invalidCpf = '12345678900';
    expect(validateCpf(invalidCpf)).toBe(false);
  });

  it('should return false for CPF with all same digits', () => {
    const sameDigitsCpf = '11111111111';
    expect(validateCpf(sameDigitsCpf)).toBe(false);
  });
});

describe('validateCnpj', () => {
  it('should return true for a valid CNPJ', () => {
    const validCnpj = '18354207000120';
    expect(validateCnpj(validCnpj)).toBe(true);
  });

  it('should return false for an invalid CNPJ', () => {
    const invalidCnpj = '11222333000180';
    expect(validateCnpj(invalidCnpj)).toBe(false);
  });

  it('should return false for CNPJ with all same digits', () => {
    const sameDigitsCnpj = '11111111111111';
    expect(validateCnpj(sameDigitsCnpj)).toBe(false);
  });
});

describe('validateCpfCnpj', () => {
  it('should return true for a valid CPF', () => {
    const validCpf = '53707476448';
    expect(validateCpfCnpj(validCpf)).toBe(true);
  });

  it('should return false for an invalid CPF', () => {
    const invalidCpf = '12345678900';
    expect(validateCpfCnpj(invalidCpf)).toBe(false);
  });

  it('should return true for a valid CNPJ', () => {
    const validCnpj = '73826298000167';
    expect(validateCpfCnpj(validCnpj)).toBe(true);
  });

  it('should return false for an invalid CNPJ', () => {
    const invalidCnpj = '11222333000180';
    expect(validateCpfCnpj(invalidCnpj)).toBe(false);
  });

  it('should return false for invalid input', () => {
    const invalidInput = '123456';
    expect(validateCpfCnpj(invalidInput)).toBe(false);
  });
});
