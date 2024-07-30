import { StrategyAlias } from '../services/document-validator.service';
import { CPFValidatorStrategyService } from '../services/cpf-validator-strategy.service';
import { CNPJValidatorStrategyService } from '../services/cnpj-validator-strategy.service';

export function getDocumentValidationStrategiesFactory() {
    const cpfValidatorStrategyService = new CPFValidatorStrategyService();
    const cnpjValidatorStrategyService = new CNPJValidatorStrategyService();
    
    const strategies = new Map();
    
    strategies.set(StrategyAlias.CPF, cpfValidatorStrategyService);
    strategies.set(StrategyAlias.CNPJ, cnpjValidatorStrategyService);

    return strategies;
}
