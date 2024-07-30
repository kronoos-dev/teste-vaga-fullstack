import { Document } from '../../domain/entities/document.entity';

import { IDocumentValidatorService } from '../../application/services/document-validator.service';
import { IMonetaryValueFormatter } from '../../application/services/monetary-value-formatter.service';

export class MainController {
    constructor(
        private readonly monetaryValueFormatter: IMonetaryValueFormatter,
        private readonly documentValidatorService: IDocumentValidatorService,
        private readonly totalValueValidatorService: IDocumentValidatorService,
    ) {}

    public handle(document: Document): void {
        const monetaryKeyRegex = /^vl[A-Z]/;
        const documentKeyRegex = /nrCpfCnpj/gi;

        document.documentIsValid = this.totalValueValidatorService.validate(document.vlTotal, document.qtPrestacoes, document.vlPresta);

        for (const key of Object.keys(document)) {
            if (monetaryKeyRegex.test(key)) document[key] = this.monetaryValueFormatter.format(+document[key]);
            if (documentKeyRegex.test(key)) document.documentIsValid = this.documentValidatorService.validate(document[key]);
        }
    }
}
