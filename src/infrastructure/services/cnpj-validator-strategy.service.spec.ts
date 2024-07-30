import { CNPJValidatorStrategyService } from './cnpj-validator-strategy.service';

describe('CNPJValidatorStrategyService Unit', () => {
    it('should validate document with success', () => {
        const cnpjValidatorStrategyService = new CNPJValidatorStrategyService();

        const document = '03966640000149';
        const result = cnpjValidatorStrategyService.validate(document);

        expect(result).toBeTruthy();
    });

    it('should validate an invalid document', () => {
        const cnpjValidatorStrategyService = new CNPJValidatorStrategyService();

        const document = '1'.repeat(14);
        const result = cnpjValidatorStrategyService.validate(document);

        expect(result).toBeFalsy();
    });
});
