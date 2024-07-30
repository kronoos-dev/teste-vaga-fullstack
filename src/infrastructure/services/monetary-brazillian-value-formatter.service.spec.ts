import { MonetaryBrazillianValueFormatter } from './monetary-brazillian-value-formatter.service';

describe('MonetaryBrazillianValueFormatterService Unit', () => {
    it('should format value with success', () => {
        const monetaryBrazillianValueFormatterService = new MonetaryBrazillianValueFormatter();

        const value = 72.90;
        const result = monetaryBrazillianValueFormatterService.format(value);

        expect(typeof result).toBe('string');
        expect(result.match(/[R\$]/gi)).toBeTruthy();
    });
});
