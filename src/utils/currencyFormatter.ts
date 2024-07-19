export function formatCurrency(value: string): string {
  const numValue = parseFloat(value);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numValue);
}
