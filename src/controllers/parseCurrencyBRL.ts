import _ from 'lodash';

/**
 * Formata uma string de valor numérico para o formato de moeda brasileira (BRL).
 *
 * @param currency - A string que representa um valor numérico.
 * @returns Uma string formatada como moeda brasileira (BRL).
 */
export function parseCurrencyBRL(currency: string): string {
  // Substitui vírgulas por pontos e remove espaços em branco.
  const formattedCurrency = currency.replace(',', '.').trim();

  // Verifica se a string está vazia.
  if (formattedCurrency.length === 0 || isNaN(parseFloat(formattedCurrency))) {
    return 'R$ NaN';
  }

  // Converte a string para um número de ponto flutuante.
  const value = _.toNumber(formattedCurrency);

  // Formata o valor numérico para o formato de moeda brasileira.
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency', // Define o estilo de formatação como moeda.
    currency: 'BRL', // Define a moeda como Real Brasileiro (BRL).
    maximumFractionDigits: 2, // Define o número máximo de casas decimais a serem exibidas como 2.
    signDisplay: 'auto', // Exibe o sinal de negativo apenas para valores negativos.
  }).format(value);
}
