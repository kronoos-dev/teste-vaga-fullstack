import { IDocumentValidatorService } from '../../application/services/document-validator.service';
import { IDocumentValidatorStrategyService } from '../../application/services/document-validator-strategy.service';

export enum StrategyAlias {
    CPF = 'CPF',
    CNPJ = 'CNPJ',
}

export class DocumentValidatorService implements IDocumentValidatorService {
    constructor(
        private readonly strategies: Map<StrategyAlias, IDocumentValidatorStrategyService>,
    ) {}

    public validate(document: string): boolean {
        let strategy: StrategyAlias = StrategyAlias.CPF;
        if (document.length !== 11) strategy = StrategyAlias.CNPJ;

        return this.strategies.get(strategy)!.validate(document);
    }
}
