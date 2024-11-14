const { formatToBRL } = require('./validate/format.js');
const { validateCPF } = require('./validate/cpf.js');
const { validateCNPJ } = require('./validate/cnpj.js');
const { validatePayment } = require('./validate/payment.js');

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path')


// Função para processar arquivo CSV
function processFile(file){
    fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
        const {vlTotal, vlPresta, qtPrestacoes, nrCpfCnpj} = row

        const vlTotalNum = parseFloat(vlTotal)
        const vlPrestaNum = parseFloat(vlPresta)
        const qtPrestacoesNum = parseFloat(qtPrestacoes)
        const nrCpfCnpjvalid = nrCpfCnpj.length === 11 ? validateCPF(nrCpfCnpj) : validateCNPJ(nrCpfCnpj)
        
        // validação Valor Total e Prestações
        if(!validatePayment(vlTotalNum, qtPrestacoesNum, vlPrestaNum)){
            console.log(`Incorrect calculation of the value of vlPresta to vlTotal ${formatToBRL(vlTotalNum)}`)
        }

        // conversão para real
        row.vlTotal = formatToBRL(vlTotalNum)
        row.vlPresta = formatToBRL(vlPrestaNum)

        // validação cpf ou cnpj
        if(!nrCpfCnpjvalid){
            console.log(`Invalid CPF or CNPJ: ${nrCpfCnpj}`)
        }
        console.log(row)
    })
    .on('end', () =>{
        console.log('CSV file parsed successfull')

    })

}

// CAMINHO DO ARQUIVO CSV
const file = path.join(__dirname, '..', 'data/data.csv')
processFile(file)




