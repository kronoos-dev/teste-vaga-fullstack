import { parseCurrencyBRL } from './parseCurrencyBRL';

describe('parseCurrencyBRL', () => {
  it('should format a valid numeric string as BRL currency', () => {
    const result = parseCurrencyBRL('1234.56');
    expect(result.replace(/\s/g, '')).toBe('R$1.234,56');
  });

  it('should handle integer values correctly', () => {
    const result = parseCurrencyBRL('1000');
    expect(result.replace(/\s/g, '')).toBe('R$1.000,00');
  });

  it('should handle values with commas as decimal separator', () => {
    const result = parseCurrencyBRL('1000,50');
    expect(result.replace(/\s/g, '')).toBe('R$1.000,50');
  });

  it('should handle values with leading or trailing spaces', () => {
    const result = parseCurrencyBRL(' 1000.50 ');
    expect(result.replace(/\s/g, '')).toBe('R$1.000,50');
  });

  it('should return "R$ NaN" for invalid numeric strings', () => {
    const result = parseCurrencyBRL('invalid');
    expect(result).toBe('R$ NaN');
  });

  it('should handle very large numbers correctly', () => {
    const result = parseCurrencyBRL('1000000000');
    expect(result.replace(/\s/g, '')).toBe('R$1.000.000.000,00');
  });

  it('should handle negative numbers correctly', () => {
    const result = parseCurrencyBRL('-1234.56');
    expect(result.replace(/\s/g, '')).toBe('-R$1.234,56');
  });

  it('should return "R$ NaN" for empty strings', () => {
    const result = parseCurrencyBRL('');
    expect(result).toBe('R$ NaN');
  });
});
