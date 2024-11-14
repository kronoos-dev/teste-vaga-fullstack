// Função para calcular o digito
function calculeDigitCNPJ(digits, weights){
    const total = digits.reduce((total, value, index) => {
        return total + value * weights[index]
    }, 0);
    const remainder = total % 11
    return remainder < 2 ? 0 : 11 - remainder
}

// Função para validar CNPJ
function validateCNPJ(cnpj){
    if (cnpj === "00000000000000") return false
    const digits = cnpj.slice(0, 12).split('')

    const weightsDigit1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const weightsDigit2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    const digit1 = calculeDigitCNPJ(digits, weightsDigit1)
    const digit2 = calculeDigitCNPJ([...digits, digit1], weightsDigit2)


    if(digit1 !== parseInt(cnpj.substring(12, 13))){
        return false
    }
    if(digit2 !== parseInt(cnpj.substring(13, 14))){
        return false
    }

    return true
}

module.exports = { validateCNPJ };


