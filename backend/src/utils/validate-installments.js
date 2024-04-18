export function validateInstallments(
  vlTotal,
  qtPrestacoes,
  vlPresta,
  vlMovimento,
  vlPag,
  dtPag,
  dtMovimento
) {
  const vlInstallments = Math.floor(vlTotal) / qtPrestacoes;
  let message = "";
  let fine = "consistente";

  if (vlInstallments !== vlPresta) {
    message +=
      "Erro de cálculo: o resultado da divisão não é igual a vlPresta. ";
  }

  if (vlMovimento > vlPag) {
    message += "O valor do movimento é maior que o valor do pagamento. ";
  }

  const dtPagDate = new Date(dtPag);
  const dtMovimentoDate = new Date(dtMovimento);

  if (dtPagDate > dtMovimentoDate) {
    const daysLate = Math.ceil(
      (dtPagDate - dtMovimentoDate) / (1000 * 60 * 60 * 24)
    );
    const lateFee = daysLate * 0.01 * vlMovimento; // 1% per day
    message += `O pagamento está atrasado em ${daysLate} dias. A taxa de atraso é de ${lateFee}. `;
  }

  if (message !== "") {
    console.log(message);
    return message;
  }

  return fine;
}
