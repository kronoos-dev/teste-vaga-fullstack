const formatarBrl = (value = 0) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

module.exports = {
  formatarBrl,
};
