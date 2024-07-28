const { escreveUmaLinha } = require("./services/escrita.service");
const { lerArquivo } = require("./services/leitura.service");
const { validaValorParcela } = require("./services/parcela.service");
const { validaCPFOuCNPJ } = require("./utils/documento.util");
const { formatarBrl } = require("./utils/moeda.util");

const { join } = require("path");

const validador = (dados) => {
  const { nrCpfCnpj, vlTotal, qtPrestacoes, vlPresta } = dados;

  const vlTotalFormatado = formatarBrl(vlTotal);
  const vlPrestaFormatado = formatarBrl(vlPresta);

  const documentoValido = validaCPFOuCNPJ(nrCpfCnpj) ? "valido" : "invalido";
  const valorParcelaValido = validaValorParcela(vlTotal, qtPrestacoes, vlPresta)
    ? "valido"
    : "invalido";

  const texto = `Valor contrato: ${vlTotalFormatado}, Valor da parcela: ${vlPrestaFormatado} O contrato possui um valor de parcela ${valorParcelaValido}, documento do cliente encontra-se ${documentoValido}`;

  escreveUmaLinha(join(__dirname, "/data/resposta.txt"), texto);
};

function setup() {
  lerArquivo(join(__dirname, "../data.csv"), validador);
}

setup();
