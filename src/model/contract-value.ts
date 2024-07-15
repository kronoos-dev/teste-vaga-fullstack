import { Client } from "./client.js";

export class Contract {
  #client: Client;
  #vlTotal: number;
  #vlPresta: number;
  #vlMora: number;
  #vlMult: number;
  #vlOutAcr: number;
  #vlIof: number;
  #vlDescon: number;
  #vlAtual: number;
  #qtPrestacoes: number;

  constructor({
    vlTotal,
    vlPresta,
    vlMora,
    vlMult,
    vlOutAcr,
    vlIof,
    vlDescon,
    vlAtual,
    qtPrestacoes,
    client,
  }: {
    vlTotal: string;
    vlPresta: string;
    vlMora: string;
    vlMult: string;
    vlOutAcr: string;
    vlIof: string;
    vlDescon: string;
    vlAtual: string;
    qtPrestacoes: string;
    client: Client;
  }) {
    this.#vlTotal = Number(vlTotal);
    this.#vlPresta = Number(vlPresta);
    this.#vlMora = Number(vlMora);
    this.#vlMult = Number(vlMult);
    this.#vlOutAcr = Number(vlOutAcr);
    this.#vlIof = Number(vlIof);
    this.#vlDescon = Number(vlDescon);
    this.#vlAtual = Number(vlAtual);
    this.#qtPrestacoes = Number(qtPrestacoes);
    this.#client = client;
  }

  private formatCurrency(value: string) {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatter.format(+value);
  }

  validateInstallments() {
    return this.#vlTotal / this.#qtPrestacoes == this.#vlPresta;
  }

  get client() {
    return this.#client;
  }

  get vlTotal() {
    return this.#vlTotal;
  }

  get qtPrestacoes() {
    return this.#qtPrestacoes;
  }

  get formattedVlTotal() {
    return this.formatCurrency(String(this.#vlTotal));
  }

  get formattedVlPresta() {
    return this.formatCurrency(String(this.#vlPresta));
  }
}
