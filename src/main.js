import { promisify } from "util";
import { promises, createReadStream, createWriteStream } from "fs";
import csv from "csv-parser";
import jsontocsv from "json-to-csv-stream";
import path from "path";
import { pipeline, Transform } from 'stream'
import * as Tools from './utils.js'

const pipelineAsync = promisify(pipeline)
const { readdir } = promises;

console.time('runtime')

const filesDir = path.join(process.cwd(), 'db')
const output = path.join(process.cwd(), 'final.csv')
const files = (await readdir(filesDir))

const dataLog = {
	rowsWithError: 0,
	rowsSuccessfully: 0
};

const documentSize = {
	CNPJ: 14,
	CPF: 11
}

const combinedStreams = createReadStream(path.join(filesDir, files[0]), 'utf-8')
const finalStream = createWriteStream(output)
const handleStream = new Transform({
	objectMode: true,
	transform: (data, encoding, cb) => {
		const vlTotal = parseFloat(data.vlTotal);
		const qtPrestacoes = parseInt(data.qtPrestacoes);
		const vlPresta = parseFloat(data.vlPresta);
		const resultValue = Tools.convertCurrency((vlTotal / qtPrestacoes).toFixed(2));
		const documentNumber = data.nrCpfCnpj.replace(/\D/g, '')

		const checkIsValid = [
			resultValue === vlPresta,
			Object.values(documentSize).includes(documentNumber.length)
		]
		const isValid = checkIsValid.every(Boolean)

		if (!isValid) {
			dataLog.rowsWithError = dataLog.rowsWithError + 1

			return cb(null, null)
		}

		const documentType = documentNumber.length === 14 ? 'CNPJ' : 'CPF'
		const nrCpfCnpj = documentType === 'CNPJ'
			? Tools.cnpjMask(data.nrCpfCnpj)
			: Tools.cpfMask(data.nrCpfCnpj)

		const output = {
			nrInst: data.nrInst,
			nrAgencia: data.nrAgencia,
			cdClient: data.cdClient,
			nmClient: data.nmClient,
			nrCpfCnpj: nrCpfCnpj,
			nrContrato: data.nrContrato,
			dtContrato: data.dtContrato,
			qtPrestacoes: data.qtPrestacoes,
			vlTotal: Tools.formatCurrency(vlTotal),
			cdProduto: data.cdProduto,
			dsProduto: data.dsProduto,
			cdCarteira: data.cdCarteira,
			dsCarteira: data.dsCarteira,
			nrProposta: data.nrProposta,
			nrPresta: data.nrPresta,
			tpPresta: data.tpPresta,
			nrSeqPre: data.nrSeqPre,
			dtVctPre: data.dtVctPre,
			vlPresta: Tools.formatCurrency(vlPresta),
			vlMora: data.vlMora,
			vlMulta: data.vlMulta,
			vlOutAcr: data.vlOutAcr,
			vlIof: data.vlIof,
			vlDescon: data.vlDescon,
			vlAtual: data.vlAtual,
			idSituac: data.idSituac,
			idSitVen: data.idSitVen,
		}

		dataLog.rowsSuccessfully = dataLog.rowsSuccessfully + 1

		return cb(null, JSON.stringify(output))
	}
})

await pipelineAsync(
	combinedStreams,
	csv(),
	handleStream,
	jsontocsv(),
	finalStream
)

const logs = [
	`Total lines: ${dataLog.rowsWithError + dataLog.rowsSuccessfully}`,
	`Total failed lines: ${dataLog.rowsWithError}`,
	`Total successful lines: ${dataLog.rowsSuccessfully}`,
]

console.log(logs.join('\n'))
console.timeEnd('runtime')
