import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csvParser from 'csv-parser';
import { formatDate } from '../../utils/dateUtils';

const prisma = new PrismaClient();

export async function processCSV() {
    const fileCSV = '../../data.csv';
    const data: any[] = []; 

    fs.createReadStream(fileCSV)
        .pipe(csvParser())
        .on('data', async (row: any) => {
            try {

                const contractData = {
                    nrInst: parseInt(row.nrInst),
                    nrAgencia: parseInt(row.nrAgencia),
                    cdClient: parseInt(row.cdClient),
                    nmClient: row.nmClient,
                    nrCpfCnpj: row.nrCpfCnpj,
                    nrContrato: parseInt(row.nrContrato),
                    dtContrato: formatDate(row.dtContrato),
                    qtPrestacoes: parseInt(row.qtPrestacoes),
                    vlTotal: parseInt(row.vlTotal),
                    cdProduto: parseInt(row.cdProduto),
                    dsProduto: row.dsProduto,
                    cdCarteira: parseInt(row.cdCarteira),
                    dsCarteira: row.dsCarteira,
                    nrProposta: parseInt(row.nrProposta),
                    nrPresta: parseInt(row.nrPresta),
                    tpPresta: row.tpPresta,
                    nrSeqPre: parseInt(row.nrSeqPre),
                    dtVctPre: formatDate(row.dtVctPre),
                    vlPresta: parseInt(row.vlPresta),
                    vlMora: parseInt(row.vlMora),
                    vlMulta: parseInt(row.vlMulta),
                    vlOutAcr: parseInt(row.vlOutAcr),
                    vlIof: parseInt(row.vlIof),
                    vlDescon: parseInt(row.vlDescon),
                    vlAtual: parseInt(row.vlAtual),
                    idSituac: row.idSituac,
                    idSitVen: row.idSitVen,
                };

                data.push(contractData);

                console.log('Dados convertidos com sucesso:', contractData);
            } catch (error) {
                console.error('Erro ao converter dados:', error);
            }
        })
        .on('end', async () => {
            try {
                await prisma.contrato.createMany({
                    data: data,
                });
                console.log('Todos os dados inseridos com sucesso no banco de dados.');
            } catch (error) {
                console.error('Erro ao inserir dados no banco de dados:', error);
            }

            await prisma.$disconnect();
        });
}

processCSV();
