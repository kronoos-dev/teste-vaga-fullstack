import { IDocumentValidatorStrategyService } from '../../application/services/document-validator-strategy.service';

enum CNPJValidationStage {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
}

export class CNPJValidatorStrategyService implements IDocumentValidatorStrategyService {
    public validate(document: string, stage: CNPJValidationStage = CNPJValidationStage.FIRST): boolean {
        if (document.length !== 14) return false;

        let digit = 0;
        let rest = this.calculateDocumentDigitsAndGetRest(document, stage);
        if (rest !== 0 && rest !== 1) {
            digit = 11 - rest;
        }

        if (!this.compareDigit(document, digit, stage)) return false;
        if (stage === CNPJValidationStage.SECOND) return true;

        return this.validate(document, CNPJValidationStage.SECOND);
    }

    private verifyIfIsFirstStage(stage: CNPJValidationStage) {
        return stage === CNPJValidationStage.FIRST;
    }

    private calculateDocumentDigitsAndGetRest(document: string, stage: CNPJValidationStage) {
        let isFirstStage = this.verifyIfIsFirstStage(stage);
        let numbers = (isFirstStage) ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        let total = 0;
        for (let index = 0; index < numbers.length; index++) {
            total += +document[index] * numbers[index];
        }

        return total % 11;
    }

    private compareDigit(document: string, digit: number, stage: CNPJValidationStage) {
        const index = this.verifyIfIsFirstStage(stage) ? document.length - 2 : document.length - 1;
        return document[index] === digit + '';
    }
}
