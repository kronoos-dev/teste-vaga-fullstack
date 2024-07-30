import { TotalValueValidatorService } from './total-value-validator.service';

describe('TotalValueValidatorService Unit', () => {
    it('should calculate total with success', () => {
        const totalValueValidatorService = new TotalValueValidatorService();

        const totalValue = 30;
        const quantity = 5;
        const expected = 6;

        const result = totalValueValidatorService.validate(totalValue, quantity, expected);

        expect(result).toBeTruthy();
    });

    it('should return false to invalid expected param', () => {
        const totalValueValidatorService = new TotalValueValidatorService();

        const totalValue = 30;
        const quantity = 5;
        const expected = 7;

        const result = totalValueValidatorService.validate(totalValue, quantity, expected);

        expect(result).toBeFalsy();
    });
});
