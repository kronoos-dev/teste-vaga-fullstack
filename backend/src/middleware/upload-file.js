import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import crypto from "crypto";

const upload = multer({ dest: "./uploads/" });

const uploadFileMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Erro ao fazer upload do arquivo" });
    } else if (err) {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    if (req.file.mimetype !== "text/csv") {
      return res.status(400).json({
        error:
          "Formato de arquivo inválido. Apenas arquivos CSV são permitidos",
      });
    }

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("headers", (headers) => {
        const requiredHeaders = [
          "nrInst",
          "nrAgencia",
          "cdClient",
          "nmClient",
          "nrCpfCnpj",
          "nrContrato",
          "dtContrato",
          "qtPrestacoes",
          "vlTotal",
          "cdProduto",
          "dsProduto",
          "cdCarteira",
          "dsCarteira",
          "nrProposta",
          "nrPresta",
          "tpPresta",
          "nrSeqPre",
          "dtVctPre",
          "vlPresta",
          "vlMora",
          "vlMulta",
          "vlOutAcr",
          "vlIof",
          "vlDescon",
          "vlAtual",
          "idSituac",
          "idSitVen",
        ];

        const missingHeaders = requiredHeaders.filter(
          (header) => !headers.includes(header)
        );

        if (missingHeaders.length > 0) {
          return res.status(400).json({
            error:
              "Cabeçalho inválido. Certifique-se de que o arquivo CSV contenha as colunas corretas",
          });
        }

        // Generate a unique filename using current date, time, and a hash
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        const randomHash = crypto.randomBytes(5).toString("hex");
        const filename = `${timestamp}-${randomHash}-data.csv`;

        // Move the file to the desired directory with the new filename
        const newPath = `./uploads/${filename}`;
        fs.renameSync(req.file.path, newPath);
        req.file.path = newPath;

        next();
      })
      .on("error", (error) => {
        return res
          .status(500)
          .json({ error: "Erro ao processar o arquivo CSV" });
      });
  });
};

export default uploadFileMiddleware;
