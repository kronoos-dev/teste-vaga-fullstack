import csv from "csv-parser";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import xlsx from 'xlsx';


import {
  formatCurrency,
  validateCnpj,
  validateCpf,
  validatePresta,
} from "./validacoes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", async (req, res) => {
  const arquivo_csv = "data.csv";
  const resultados = [];

  try {
    fs.createReadStream(path.resolve(__dirname, arquivo_csv)) 
      .pipe(csv())
      .on("data", (data) => {
        const {
          nrCpfCnpj,
          vlTotal,
          qtPrestacoes,
          vlPresta,
          vlMora,
          vlMulta,
          vlOutAcr,
        } = data;

        const isValidCpfCnpj = nrCpfCnpj.length === 11
          ? validateCpf(nrCpfCnpj)
          : validateCnpj(nrCpfCnpj);

        const isPrestaCorrect = validatePresta(vlTotal, qtPrestacoes, vlPresta);

        const formattedTotal = formatCurrency(vlTotal);
        const formattedPresta = formatCurrency(vlPresta);
        const formattedMora = formatCurrency(vlMora);
        const formattedMulta = formatCurrency(vlMulta);
        const formattedOutAcr = formatCurrency(vlOutAcr);

        resultados.push({
          ...data,
          validCpfCnpj: isValidCpfCnpj,
          isPrestaCorrect,
          formattedTotal,
          formattedPresta,
          formattedMora,
          formattedMulta,
          formattedOutAcr,
        });
      })
      .on("end", () => {
        const ws = xlsx.utils.json_to_sheet(resultados);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Dados Processados");

        const filePath = path.resolve(__dirname, "dados_processados.xlsx");
        xlsx.writeFile(wb, filePath);

        res.json({
          message: "Processamento concluído e arquivo XLSX gerado!",
          downloadUrl: `/download/dados_processados.xlsx`,
        });
      })
      .on("error", (err) => {
        console.error(err);
        res.status(500).send("Erro ao processar o arquivo CSV.");
      });
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    res.status(500).send("Erro interno do servidor.");
  }
});

app.use('/download', express.static(__dirname)); 

app.listen(8080, () => {
  console.log("O servidor está rodando na porta: http://localhost:8080");
});
