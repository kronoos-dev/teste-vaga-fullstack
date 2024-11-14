// Função de conversão de dados para Moeda Real
function formatToBRL(value){
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value)
}

module.exports = { formatToBRL };
