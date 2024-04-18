import fs from "fs";
import csv from "csv-parser";
import Finance from "../models/finance-model.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { formatarMoedaBRL } from "../utils/convert-money-pt-br.js";
import { validateInstallments } from "../utils/validate-installments.js";

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
              const valorTotal = (data.vlTotal = formatarMoedaBRL(
                data.vlTotal
              ));
              const statusParcela = validateInstallments(data);
              try {
                await Finance.create({
                  nrInst: data.nrInst,
                  nrAgencia: data.nrAgencia,
                  cdClient: data.cdClient,
                  nmClient: data.nmClient,
                  nrCpfCnpj: data.nrCpfCnpj,
                  nrContrato: data.nrContrato,
                  dtContrato: data.dtContrato,
                  qtPrestacoes: data.qtPrestacoes,
                  ValorTotal: valorTotal,
                  vlTotal: data.vlTotal,
                  cdProduto: data.cdProduto,
                  dsProduto: data.dsProduto,
                  cdCarteira: data.cdCarteira,
                  dsCarteira: data.dsCarteira,
                  nrProposta: data.nrProposta,
                  nrPresta: data.nrPresta,
                  tpPresta: data.tpPresta,
                  nrSeqPre: data.nrSeqPre,
                  dtVctPre: data.dtVctPre,
                  vlPresta: data.vlPresta,
                  vlMora: data.vlMora,
                  vlMulta: data.vlMulta,
                  vlOutAcr: data.vlOutAcr,
                  vlIof: data.vlIof,
                  vlDescon: data.vlDescon,
                  vlAtual: data.vlAtual,
                  idSituac: data.idSituac,
                  idSitVen: data.idSitVen,
                  status: statusParcela,
                });
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

async function index(req, res) {
  const { page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;

  try {
    const finances = await Finance.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    return res.status(200).json(finances);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados do Banco de Dados" });
  }
}

export default { store, index };
