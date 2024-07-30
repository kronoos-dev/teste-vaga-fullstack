import { IMonetaryValueFormatter } from '../../application/services/monetary-value-formatter.service';

export class MonetaryBrazillianValueFormatter implements IMonetaryValueFormatter {
    private readonly formatterLib = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    public format(value: number): string {
        return this.formatterLib.format(value);
    }
}
