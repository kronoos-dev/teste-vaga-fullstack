const fs = require("fs");

const escreveUmaLinha = (caminho_arquivo, valor_linha) => {
  fs.appendFileSync(caminho_arquivo, `\n${valor_linha}`);
};

module.exports = { escreveUmaLinha };
