import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}