// Função para validar Valor Total e Prestações
function validatePayment(vlTotal, qtPrestacoes, vlPresta){
    const valuePayment = vlTotal / qtPrestacoes
    return valuePayment.toFixed(2) === vlPresta.toFixed(2)
}

module.exports = { validatePayment };
