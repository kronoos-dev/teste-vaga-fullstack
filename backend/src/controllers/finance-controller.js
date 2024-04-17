import fs from "fs";
import csv from "csv-parser";
import Finance from "../models/finance-model.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function store(req, res) {
  const directoryPath = join(__dirname, "../../uploads");

  try {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Erro ao ler o diretório de upload:", err);
        res.status(500).json({ error: "Erro ao ler o diretório de upload" });
        return;
      }
      files.forEach((file) => {
        if (file.endsWith(".csv")) {
          const filePath = `${directoryPath}/${file}`;
          fs.createReadStream(filePath)
            .pipe(csv()) //caso seja nescessario processar arquivos maiores de 10gb este trecho deve ser mudado para processar com stream fragmentando com chunks
            .on("data", async (data) => {
              try {
                await Finance.create(data);
                console.log(
                  `Dados do arquivo ${file} ${data} salvos no Banco de Dados.`
                );
              } catch (error) {
                console.error(
                  `Erro ao salvar os dados do arquivo ${file} no Banco de Dados:`,
                  error
                );
              }
            })
            .on("end", () => {
              console.log(`Leitura do arquivo ${file} concluída.`);
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.error(`Erro ao remover o arquivo ${file}:`, err);
                } else {
                  console.log(`Arquivo ${file} removido.`);
                }
              });
            });
        }
      });
    });
    return res
      .status(201)
      .json({ message: "Arquivos processados com sucesso" });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    res.status(500).json({ error: "Erro ao conectar ao MongoDB" });
  }
}

export default { store };
