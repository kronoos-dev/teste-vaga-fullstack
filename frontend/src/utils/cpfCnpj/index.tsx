export function validateCpfCnpj(cpfCnpj: string) {

    cpfCnpj = cpfCnpj.replace(/\D/g, '');

    if (cpfCnpj.length === 11) {
        return 'CPF Válido';
    } else if (cpfCnpj.length === 14) {
        return 'CNPJ Válido';
    } else if (cpfCnpj.length > 0 && cpfCnpj.length < 11) {
        return 'CPF Inválido';
    } else if (cpfCnpj.length > 11 && cpfCnpj.length < 14) {
        return 'CNPJ Inválido';
    } else {
        return 'Número Inválido';
    }
}
