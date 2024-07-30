/**
 *  Rode usando o comando `npx ts-node src/index.ts` para testar o código
 *  O código está lendo um arquivo CSV e validando os documentos e o valor total
 *  O código está com um erro na validação do valor total, não encontrei nenhum valor que retornasse true
 *  Descomente a linha 107 para testar a validação de total
 *  Feito por Gustavo Melo
 *  LinkedIn: https://www.linkedin.com/in/gusta-mello-7940961a2/
 */

const fs = require("fs");
const csv = require("csv-parser");

type DocumentData = {
  nrInst: string;
  nrAgencia: string;
  cdClient: string;
  nmClient: string;
  nrCpfCnpj: string;
  nrContrato: string;
  dtContrato: string;
  qtPrestacoes: string;
  vlTotal: string;
  cdProduto: string;
  dsProduto: string;
  cdCarteira: string;
  dsCarteira: string;
  nrProposta: string;
  nrPresta: string;
  tpPresta: string;
  nrSeqPre: string;
  dtVctPre: string;
  vlPresta: string;
  vlMora: string;
  vlMulta: string;
  vlOutAcr: string;
  vlIof: string;
  vlDescon: string;
  vlAtual: string;
  idSituac: string;
  idSitVen: string;
};

const getReadDocuments = async (): Promise<DocumentData[]> => {
  const documents: DocumentData[] = [];

  return new Promise<DocumentData[]>((resolve, reject) => {
    fs.createReadStream("data.csv")
      .pipe(csv())
      .on("data", (row: DocumentData) => {
        if (!getDocumentValidator(row.nrCpfCnpj)) {
          return;
        }

        // Essa validação não está correta, não encontrei nenhum valor que retornasse true
        // Descomente a linha abaixo para testar a validação de total
        // if (!getTotalValidator(row.vlTotal, row.qtPrestacoes, row.vlPresta)) {
        //   return;
        // }

        documents.push({
          nrInst: row.nrInst,
          nrAgencia: row.nrAgencia,
          cdClient: row.cdClient,
          nmClient: row.nmClient,
          nrCpfCnpj: row.nrCpfCnpj,
          nrContrato: row.nrContrato,
          dtContrato: row.dtContrato,
          qtPrestacoes: row.qtPrestacoes,
          vlTotal: setCurrency(row.vlTotal),
          cdProduto: row.cdProduto,
          dsProduto: row.dsProduto,
          cdCarteira: row.cdCarteira,
          dsCarteira: row.dsCarteira,
          nrProposta: row.nrProposta,
          nrPresta: row.nrPresta,
          tpPresta: row.tpPresta,
          nrSeqPre: row.nrSeqPre,
          dtVctPre: row.dtVctPre,
          vlPresta: setCurrency(row.vlPresta),
          vlMora: setCurrency(row.vlMora),
          vlMulta: setCurrency(row.vlMulta),
          vlOutAcr: setCurrency(row.vlOutAcr),
          vlIof: setCurrency(row.vlIof),
          vlDescon: setCurrency(row.vlDescon),
          vlAtual: setCurrency(row.vlAtual),
          idSituac: row.idSituac,
          idSitVen: row.idSitVen,
        });
      })
      .on("end", () => {
        resolve(documents);
      })
      .on("error", (error: Error) => {
        reject(error);
      });
  });
};

const setCurrency = (value: string) => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
};

const getDocumentValidator = (document: string): boolean => {
  const CPFRegex = /^\d{3}\d{3}\d{3}\d{2}$/;
  const CNPJRegex = /^\d{2}\d{3}\d{3}\d{4}\d{2}$/;

  if (document.length === 11) {
    return CPFRegex.test(document);
  } else if (document.length === 14) {
    return CNPJRegex.test(document);
  } else {
    return false;
  }
};

const getTotalValidator = (
  vltotal: string,
  qtprestacoes: string,
  vlpresta: string
): boolean => {
  const total = Number(vltotal);
  const prestacoes = Number(qtprestacoes);
  const prestacao = Number(vlpresta);

  const division = total / prestacoes;

  return division === prestacao;
};

getReadDocuments()
  .then((documents) => {
    console.log(documents);
  })
  .catch((error) => {
    console.error(error);
  });
