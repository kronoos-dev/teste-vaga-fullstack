const csv = require("csv-parser");
const fs = require("fs");

const lerArquivo = (caminho_arquivo, funcao_validadora) => {
  return new Promise((resolve) => {
    fs.createReadStream(caminho_arquivo)
      .pipe(csv())
      .on("data", (dados) => funcao_validadora(dados))
      .on("end", () => {
        resolve();
      });
  });
};

module.exports = {
  lerArquivo,
};
