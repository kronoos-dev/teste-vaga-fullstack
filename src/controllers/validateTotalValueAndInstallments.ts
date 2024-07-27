import _ from 'lodash';

/**
 * Valida se o valor total dividido pela quantidade de prestações
 * é igual ao valor de cada prestação com uma pequena margem de erro.
 *
 * @param totalValue - O valor total como uma string.
 * @param installmentsQuantity - A quantidade de prestações como uma string.
 * @param installmentValue - O valor de cada prestação como uma string.
 * @returns Um booleano indicando se os valores são consistentes.
 */
export function validateTotalValueAndInstallments(
  totalValue: string,
  installmentsQuantity: string,
  installmentValue: string
): boolean {
  // Converte as entradas para números
  const formattedTotalValue = _.toNumber(totalValue);
  const formattedInstallmentsQuantity = _.toNumber(installmentsQuantity);
  const formattedInstallmentValue = _.toNumber(installmentValue);

  // Calcula o valor de cada prestação
  const calculatedInstallmentValue =
    formattedTotalValue / formattedInstallmentsQuantity;

  // Compara o valor calculado com o valor fornecido
  return calculatedInstallmentValue == formattedInstallmentValue;
}
