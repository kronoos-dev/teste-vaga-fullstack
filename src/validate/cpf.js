// Função para calcular o digito
function calculeDigitCPF(digits, factor) {
    const total = digits.reduce((total, value) => {
        return total + value * factor--
    }, 0);
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder
}

// Função para validar CPF
function validateCPF(cpf){
    if(cpf === "00000000000") return false
    const digits = cpf.slice(0 , 9).split('')

    const digit1 = calculeDigitCPF(digits, 10)
    const digit2 = calculeDigitCPF([...digits, digit1], 11)

    if(digit1 !== parseInt(cpf.substring(9, 10))){
        return false
    }
    if(digit2 !== parseInt(cpf.substring(10, 11))){
        return false
    }
    return true
}

module.exports = { validateCPF };






