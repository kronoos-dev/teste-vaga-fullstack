import fs from 'node:fs';
import csvParser from 'csv-parser';

import { Document } from './domain/entities/document.entity';
import { MainController } from './presentation/controllers/main.controller';

import { DocumentValidatorService } from './infrastructure/services/document-validator.service';
import { TotalValueValidatorService } from './infrastructure/services/total-value-validator.service';
import { MonetaryBrazillianValueFormatter } from './infrastructure/services/monetary-brazillian-value-formatter.service';
import { getDocumentValidationStrategiesFactory } from './infrastructure/factories/get-document-validation-strategies.factory';

const totalValueValidatorService = new TotalValueValidatorService();
const monetaryValueFormatter = new MonetaryBrazillianValueFormatter();
const documentValidatorService = new DocumentValidatorService(getDocumentValidationStrategiesFactory());

const controller = new MainController(
    monetaryValueFormatter,
    documentValidatorService,
    totalValueValidatorService,
);

const result: {
    valid: Array<Document>,
    invalid: Array<Document>,
} = {
    valid: [],
    invalid: [],
};

(() => {
    fs.createReadStream(__dirname + '/../data.csv')
    .pipe(csvParser())
    .on('data', (data: Document) => {
        controller.handle(data);

        if (data.documentIsValid) result.valid.push(data);
        else result.invalid.push(data);
    })
    .on('end', () => {
        console.log(`*** Documentos válidos (${result.valid.length}) ***`);
        console.log(JSON.stringify(result.valid));

        console.log(`*** Documentos inválidos (${result.invalid.length}) ***`);
        console.log(JSON.stringify(result.invalid));
    });
})();
