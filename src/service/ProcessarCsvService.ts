import csv from "csv-parser"
import { MultipartFile } from "fastify-multipart";
import { Utils } from '../utils/Utils'
import fs from 'fs';
import path from "path";

class ProcessarCsvService {

    utils = new Utils();

    async execute(dados: MultipartFile) {

        if (!dados) {
            throw new Error("Arquivo csv não foi enviado, ou está corrompido.")
        }
        
        console.log("Criação de diretorio temporário")

        const localTemporario = path.join(__dirname, 'temp', `${Date.now()}-${dados.filename}`);
        if (!fs.existsSync(path.dirname(localTemporario))) {
            fs.mkdirSync(path.dirname(localTemporario), { recursive: true });
        }

        console.log("Criação de arquivo temporario para manipulação.");

        await new Promise((resolve, reject) =>{
            const salvarArquivoTemp =  fs.createWriteStream(localTemporario);
            dados.file.pipe(salvarArquivoTemp);

            salvarArquivoTemp.on('finish', resolve)
            salvarArquivoTemp.on('error', (err) => {
                reject(err);
              throw new Error("Erro na criação do arquivo temporário.")
            })
        })

        const results: string[] = [];

        return new Promise((resolve, reject) => {

            fs.createReadStream(localTemporario).pipe(csv()).on('data', (dados) => {
                try{
                        dados.cpfCnpjValido = this.utils.validarDocumento(dados.nrCpfCnpj);
                        dados.calculoValido = this.utils.validarValorPrestacao(dados.vlTotal, dados.qtPrestacoes, dados.vlPresta);
                        dados.vlTotal = this.utils.formatarBRL(dados.vlTotal);
                        dados.vlPresta = this.utils.formatarBRL(dados.vlPresta);
                        dados.vlMora = this.utils.formatarBRL(dados.vlMora);
                        dados.vlMulta = this.utils.formatarBRL(dados.vlMulta);
                        dados.vlOutAcr = this.utils.formatarBRL(dados.vlOutAcr);
                        dados.vlIof = this.utils.formatarBRL(dados.vlIof);
                        dados.vlDescon = this.utils.formatarBRL(dados.vlDescon);
                        dados.vlAtual = this.utils.formatarBRL(dados.vlAtual);

                        results.push(dados);
                }
                catch(err){
                    throw new Error("Erro ao validar os dados do arquivo.")
                }
            }).on("end", () => {
            fs.unlink(localTemporario, (err) => {
                if (err) {
                    console.error("Erro ao deletar o arquivo temporário", err)
                }
            })
                resolve(results);
            })
            .on("error", reject)
        })
    }
}

export { ProcessarCsvService }
