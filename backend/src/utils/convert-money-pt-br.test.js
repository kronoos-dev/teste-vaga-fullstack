import { formatarMoedaBRL } from "./convert-money-pt-br";

describe("formatarMoedaBRL", () => {
  it("should format the value as BRL currency", () => {
    const valor = 1234.56;
    const formattedValue = formatarMoedaBRL(valor);
    expect(formattedValue).toBe("R$1.234,56");
  });
});
