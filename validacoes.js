// Função para validar CPF
export function validateCpf(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    // Primeiro dígito
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf[i - 1]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;

    // Segundo dígito
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf[i - 1]) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[10])) return false;

    return true;
}

// Função para validar CNPJ
export function validateCnpj(cnpj) {
    cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cnpj.length !== 14) return false;

    const validateDigit = (base, multiplicators) => {
        let sum = 0;
        for (let i = 0; i < base.length; i++) {
            sum += parseInt(base[i]) * multiplicators[i];
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const base = cnpj.slice(0, 12);
    const firstDigit = validateDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const secondDigit = validateDigit(
        base + firstDigit,
        [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    );

    return (
        parseInt(cnpj[12]) === firstDigit && parseInt(cnpj[13]) === secondDigit
    );
}

// Função para validar o valor total dividido pelas prestações
export function validatePresta(vlTotal, qtPrestacoes, vlPresta) {
    const valorCalculado = parseFloat(vlTotal) / parseInt(qtPrestacoes, 10);
    return Math.abs(valorCalculado - parseFloat(vlPresta)) < 0.01; // Margem para ponto flutuante
}

// Função para formatar valores monetários
export function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(parseFloat(value));
}
