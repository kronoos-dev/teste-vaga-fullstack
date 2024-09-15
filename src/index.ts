import { Row } from "./common/types.ts";
import { formatMoney, isDocumentValid } from "./common/utils.ts";
import csv from "csv-parser";
import fs from "fs";
import { stringify } from "csv-stringify";

const readFile = async (): Promise<Row[]> => {
  const results: Row[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("src/data/data.csv")
      .pipe(csv())
      .on("data", (data: Row) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", reject);
  });
};

const start = async () => {
  const array = await readFile();
  const formattedArray = array.map((row: Row) => {
    const installmentValue =
      parseFloat(row.vlTotal) / parseFloat(row.qtPrestacoes);
    return {
      ...row,
      vlTotal: formatMoney(parseFloat(row.vlTotal)),
      vlPresta:
        parseFloat(installmentValue.toFixed(2)) === parseFloat(row.vlPresta)
          ? formatMoney(parseFloat(row.vlPresta))
          : formatMoney(parseFloat(installmentValue.toFixed(2))),
      vlMora: formatMoney(parseFloat(row.vlMora)),
      vlMulta: formatMoney(parseFloat(row.vlMulta)),
      vlOutAcr: formatMoney(parseFloat(row.vlOutAcr)),
      vlIof: formatMoney(parseFloat(row.vlIof)),
      vlDescon: formatMoney(parseFloat(row.vlDescon)),
      vlAtual: formatMoney(parseFloat(row.vlAtual)),
      nrCpfCnpj: isDocumentValid(row.nrCpfCnpj) ? row.nrCpfCnpj : "Não válido.",
    };
  });

  stringify(formattedArray, { header: true }, (err, output) => {
    if (err) throw err;
    fs.writeFile(`src/data/formattedData.csv`, output, "utf8", (err) => {
      if (err) throw err;
      console.log(`src/data/formattedData.csv.`);
    });
  });
};

start();
