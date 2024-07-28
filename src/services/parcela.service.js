const validaValorParcela = (valor_total, quantidade_parcela, valor_parcela) => {
  if (
    typeof valor_total !== "number" ||
    typeof quantidade_parcela !== "number" ||
    typeof valor_parcela !== "number"
  )
    return false;

  return valor_total / quantidade_parcela === valor_parcela;
};

module.exports = {
    validaValorParcela
}