enum CPFDigitValidationStage {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
}

export class CPFValidatorStrategyService {
    public validate(document: string, stage: CPFDigitValidationStage = CPFDigitValidationStage.FIRST): boolean {
        if (document.length !== 11) return false;

        let digit = this.calculateDocumentDigitsAndGetTargetDigit(document, stage);
        if (digit === 10) digit = 0;

        if (!this.compareDigit(document, digit, stage)) return false;
        if (stage === CPFDigitValidationStage.SECOND) return true;

        return this.validate(document, CPFDigitValidationStage.SECOND);
    }

    private compareDigit(document: string, digit: number, stage: CPFDigitValidationStage) {
        const index = (stage === CPFDigitValidationStage.FIRST) ? document.length - 2 : document.length - 1;
        return document[index] === digit + '';
    }

    private calculateDocumentDigitsAndGetTargetDigit(document: string, stage: CPFDigitValidationStage) {
        let total = 0;
        let isFirstStage = (stage === CPFDigitValidationStage.FIRST);

        for (let index = isFirstStage ? 1 : 0; index <= 9; index++) {
            total += +document[isFirstStage ? (index - 1) : index] * index;
        }

        return total % 11;
    }
}
