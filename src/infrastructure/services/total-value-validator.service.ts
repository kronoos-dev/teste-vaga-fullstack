import { IValidatorService } from '../../application/services/validator.service';

export class TotalValueValidatorService implements IValidatorService {
    public validate(totalValue: number, quantity: number, expected: number): boolean {
        return totalValue / quantity === expected;
    }
}