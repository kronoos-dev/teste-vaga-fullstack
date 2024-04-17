import Intl from "intl";

export function formatarMoedaBRL(valor) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format(valor);
}
