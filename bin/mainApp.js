import fs, { createWriteStream } from 'fs'
import path from 'path'
import cliProgress from 'cli-progress';
import csvParser from 'csv-parser'
import { createInterface } from 'readline';
import { formatCashValue, validateDocument } from './utils.js'
import { nextTick } from 'process';

// Create My Main functions;
export class mainFunctions {
  constructor(filePath, outputPath) {
    this.filePath = path.resolve(process.cwd(), filePath);
    this.outputPath = outputPath ? path.resolve(process.cwd(), outputPath) : null;
    this.numLines = 1;
    this.progressBar = new cliProgress.SingleBar({  }, cliProgress.Presets.shades_classic);
  }

  async count () {
    const readStream = fs.createReadStream(this.filePath);
    return await new Promise(resolve => {
      readStream.on('data', buf => this.numLines += buf.toString().match(/\n/g).length );
      readStream.on('end', resolve );
    })
  }

  // @n é o número de linhas que vamos gerar com a nossa aplicação...
  generateMockup (n) {
    this.progressBar.start(n, 1);

    const readStream = fs.createReadStream(this.filePath);
    const writeStream = fs.createWriteStream(this.outputPath);

    let headers = '', dataToWrite = '';
    readStream.on('data', (chunk) => {
      let lines = chunk.toString().split('\n');
      headers = lines[0];
      dataToWrite = lines[1];
      readStream.pause();
    });

    readStream.on('pause', async () => {
      writeStream.write(`${headers}\n`);
      for (let i = 1; i < n; i++) {
        const overWatermark = writeStream.write(`${dataToWrite}\n`);

        if (!overWatermark) {
          await new Promise(resolve => {
            writeStream.once('drain', resolve)
          })
        }

        this.progressBar.increment()
      }

      writeStream.end();
    });

    writeStream.on('finish', () => {
      nextTick(() => {
        writeStream.close();
        readStream.close();
        this.progressBar.stop();
      })
    });
  }

  async main () {
    this.progressBar.start(this.numLines, 1);

    const readStream = fs.createReadStream(this.filePath);
    const parsedStream = readStream.pipe(csvParser());
    const writeStream = fs.createWriteStream(this.outputPath);

    let validDocuments = 0, validInstallments = 0;
    writeStream.write('[');
    parsedStream.on('data', row => {
      const installmentValidation = (parseFloat(row['vlTotal']) / parseInt(row['qtPrestacoes'])) == parseFloat(row['vlPresta']);
      const documentValidation = validateDocument(row['nrCpfCnpj']);
      this.progressBar.increment();

      Object.keys(row).map(key => key.indexOf('vl') == 0 ? row[key] = formatCashValue(row[key]) : null );


      const jsonToWrite = {
        ...row,
        "Parcela é Valida": installmentValidation,
        "CPF/CNPJ é Válido": documentValidation
      }

      if (installmentValidation) validInstallments++;
      if (documentValidation) validDocuments++;

      const overWatermark = writeStream.write(JSON.stringify(jsonToWrite)+',');
      if (!overWatermark) {
        parsedStream.pause();
        writeStream.once('drain', () => parsedStream.resume());
      }
    });

    writeStream.on('finish', () => {
      nextTick(() => {
        writeStream.close();
        readStream.close();
        this.progressBar.stop();
      })
    });

    // Infelizmente a biblioteca csv-parser não detecta o real fim 
    // do parsing de todos os chunks ao emitir o Event 'end' assim como é previsto na documentação deles.
    parsedStream.on('end', () => {
      setTimeout(() => {
        writeStream.write(`{"validDocuments":"${validDocuments}","validInstallments":"${validInstallments}"}]`);
        writeStream.end();
        this.progressBar.stop();
        process.exit(0);
      }, 1000)
    });

    // Não consegui implementar uma solução que le-se arquivos com mais de 1GB usando o csv-parser
    // No entanto segue uma solução onde cada linha é lida, válidada e escrita individualmente, usando o createInterface
    // da biblioteca readline;
    // const rl = createInterface({
    //   input: readStream,
    // })
    // rl.on('line', (line) => {
    //   writeStream.write(line + '\n');
    //   this.progressBar.increment();
    // })
  }
}