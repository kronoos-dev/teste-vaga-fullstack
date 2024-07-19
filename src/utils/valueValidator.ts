export function validateTotalAndInstallments(total: string, installments: string, installmentValue: string): boolean {
  const totalValue = parseFloat(total);
  const installmentCount = parseInt(installments, 10);
  const singleInstallmentValue = parseFloat(installmentValue);

  const calculatedInstallmentValue = totalValue / installmentCount;
  return Math.abs(calculatedInstallmentValue - singleInstallmentValue) < 0.01;
}
