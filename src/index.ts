import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "node:path";
import csv from "csv-parser";
import { Transform, Writable } from "node:stream";
import * as fastcsv from "fast-csv";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { FileContentDto } from "./dto/file-content-dto.js";
import { Client } from "./model/client.js";
import { Contract } from "./model/contract-value.js";
import { FinalData } from "./model/final-data.js";

function getDataFromFile(file: string) {
  return fs.createReadStream(path.resolve(__dirname, "data", file));
}

function getContractValuesInfo() {
  return new Transform({
    objectMode: true,
    transform(chunk: FileContentDto, _, callback) {
      try {
        const client = new Client({
          code: chunk.cdClient,
          name: chunk.nmClient,
          document: chunk.nrCpfCnpj,
        });
        const contract = new Contract({
          vlAtual: chunk.vlAtual,
          vlDescon: chunk.vlDescon,
          vlIof: chunk.vlIof,
          vlMora: chunk.vlMora,
          vlMult: chunk.vlMulta,
          vlOutAcr: chunk.vlOutAcr,
          vlPresta: chunk.vlPresta,
          vlTotal: chunk.vlTotal,
          qtPrestacoes: chunk.qtPrestacoes,
          client: client,
        });
        this.push([chunk, contract]);
      } catch (err) {
        this.push([chunk, null]);
      }
      callback();
    },
  });
}

function createFinalDataInfo() {
  return new Transform({
    objectMode: true,
    transform(chunk: [FileContentDto, Contract?], _, callback) {
      const [, contract] = chunk;
      if (contract) {
        const data: FinalData = {
          clientCode: contract.client.code,
          clientName: contract.client.name,
          clientDocument: contract.client.document,
          isVlTotalCorrect: contract.validateInstallments(),
          vlTotal: contract.formattedVlTotal,
          vlPrest: contract.formattedVlPresta,
          qtPrestacoes: contract.qtPrestacoes,
        };
        this.push(data);
      }
      callback();
    },
  });
}

/* Show data in console */
function showData() {
  return new Writable({
    objectMode: true,
    write(chunk: [FinalData | null], _, callback) {
      console.log(chunk + "\n");
      callback();
    },
  });
}

function saveTransformedInfo(file: string) {
  return fs.createWriteStream(path.resolve(__dirname, "data", file));
}

function run({
  inDataFile,
  outDataFile,
}: {
  inDataFile: string;
  outDataFile: string;
}) {
  const readFileStream = getDataFromFile(inDataFile);
  const transformContractValuesStream = getContractValuesInfo();
  const transformFinalDataStream = createFinalDataInfo();
  const csvWriter = fastcsv.format({ headers: true });
  const saveStream = saveTransformedInfo(outDataFile);

  try {
    readFileStream
      .on("open", () => {
        console.log(chalk.green(`✸ Start reading file ${inDataFile}`));
      })
      .pipe(csv())
      .on("data", () => {
        console.log(chalk.green(`📤 Convert file into object`));
      })
      .pipe(transformContractValuesStream)
      .on("data", () => {
        console.log(chalk.green(`📑 Extract contract values`));
      })
      .pipe(transformFinalDataStream)
      .on("finish", () => {
        console.log(chalk.green(`🤖 Create final contract data`));
      })
      .pipe(csvWriter)
      .on("finish", () => {
        console.log(chalk.green(`🤖 Saving in ${outDataFile}`));
      })
      .pipe(saveStream)
      .on("finish", () => console.log(chalk.green(`🤖 Process finished`)));

    readFileStream.on("error", () => {
      chalk.red(`❌ Error to extract contract values`);
    });
    transformContractValuesStream.on("error", () =>
      chalk.red(`❌ Error to extract contract values`)
    );
    transformFinalDataStream.on("error", () =>
      chalk.red(`❌ Error to create final data`)
    );
    saveStream.on("error", () => {
      chalk.red(`❌ Error to save data`);
    });

    // show data in console
    // const read = showData();
  } catch (err: any) {
    console.log(chalk.red(`❌ Error to process data`));
  }
}

const inFile = "data.csv";
const outFile = "out.csv";
run({ inDataFile: inFile, outDataFile: outFile });
