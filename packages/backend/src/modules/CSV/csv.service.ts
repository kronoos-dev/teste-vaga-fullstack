import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { parse } from 'date-fns';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { IContract } from 'src/dtos/contract.dto';

@Injectable()
export class CSVService {
  async parseCsvToJson(filePath: string): Promise<IContract[]> {
    const results = [];

    const data: IContract[] = await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results)
        })
        .on('error', (error) => {
          reject(error)
        });
    });

    const formatValues = data.map(val => ({
        ...val,
        vlTotal: this.formatBRL(Number(val.vlTotal)),
        vlPresta: this.formatBRL(Number(val.vlPresta)),
        vlMora: this.formatBRL(Number(val.vlMora)),
        dtContrato: parse(String(val.dtContrato), 'yyyyMMdd', new Date()),
        dtVctPre: parse(String(val.dtVctPre), 'yyyyMMdd', new Date()),
        vlMovimento: this.timeDifference(parse(String(val.dtVctPre), 'yyyyMMdd', new Date())),
        nrTypeDocument: this.typeDocument(val.nrCpfCnpj),
        vlInstallmentValue: this.expectedInstallmentAmount(val.vlTotal, val.qtPrestacoes, val.vlPresta)
    }))

    return formatValues
  }

  expectedInstallmentAmount(vlTotal, qtPrestacoes, vlPresta ) {
    const calc = Number(vlTotal) / Number(qtPrestacoes)
    return calc.toFixed(2) === Number(vlPresta).toFixed(2)
  }

  timeDifference(dueDate) {
    const formatDate = new Date(dueDate)
    const currentDate = new Date()

    const getDifference = formatDate.getTime() - currentDate.getTime()
    const daysDiff = Math.round(
        getDifference / (24 * 60 * 60 * 1000)
    );

    return daysDiff > 0 ? true : false
  }

  formatBRL(number: number) {
    return new Intl.NumberFormat("pt-BR", { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(number)
  }

  typeDocument(doc: string) {
    if (cpf.isValid(doc)) {
        return "CPF"
    } 
    if (cnpj.isValid(doc)) {
        return 'CNPJ'
    }

    return "Invalid"
  }
}