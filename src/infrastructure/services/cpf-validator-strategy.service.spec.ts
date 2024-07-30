import { CPFValidatorStrategyService } from './cpf-validator-strategy.service';

describe('CPFValidatorStrategyService Unit', () => {
    it('should validate document with success', () => {
        const cpfValidatorStrategyService = new CPFValidatorStrategyService();

        const document = '79898301082';
        const result = cpfValidatorStrategyService.validate(document);

        expect(result).toBeTruthy();
    });

    it('should validate an invalid document', () => {
        const cpfValidatorStrategyService = new CPFValidatorStrategyService();

        const document = '12345678910';
        const result = cpfValidatorStrategyService.validate(document);

        expect(result).toBeFalsy();
    });
});
