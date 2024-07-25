import { validateTotalValueAndInstallments } from './validateTotalValueAndInstallments';

describe('validateTotalValueAndInstallments', () => {
  it('should return true for valid and consistent values', () => {
    const result = validateTotalValueAndInstallments('1000', '10', '100');
    expect(result).toBe(true);
  });

  it('should return false for inconsistent values', () => {
    const result = validateTotalValueAndInstallments('1000', '10', '90');
    expect(result).toBe(false);
  });

  it('should handle decimal values correctly', () => {
    const result = validateTotalValueAndInstallments('1000.50', '10', '100.05');
    expect(result).toBe(true);
  });

  it('should return false for invalid total value', () => {
    const result = validateTotalValueAndInstallments('invalid', '10', '100');
    expect(result).toBe(false);
  });

  it('should return false for invalid installments quantity', () => {
    const result = validateTotalValueAndInstallments('1000', 'invalid', '100');
    expect(result).toBe(false);
  });

  it('should return false for invalid installment value', () => {
    const result = validateTotalValueAndInstallments('1000', '10', 'invalid');
    expect(result).toBe(false);
  });

  it('should return false for zero installments quantity', () => {
    const result = validateTotalValueAndInstallments('1000', '0', '100');
    expect(result).toBe(false);
  });

  it('should handle large numbers correctly', () => {
    const result = validateTotalValueAndInstallments(
      '1000000000',
      '10000',
      '100000'
    );
    expect(result).toBe(true);
  });

  it('should handle negative values correctly', () => {
    const result = validateTotalValueAndInstallments('-1000', '10', '-100');
    expect(result).toBe(true);
  });

  it('should handle leading and trailing spaces in input', () => {
    const result = validateTotalValueAndInstallments(' 1000 ', ' 10 ', ' 100 ');
    expect(result).toBe(true);
  });
});
