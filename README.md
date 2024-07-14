# Teste Prático para Desenvolvedor Full Stack Kronoos

Você foi designado para desenvolver uma aplicação que deve lidar com grandes volumes de dados. Você deve rodar as seguintes validações e tratativas para cada um dos dados do arquivo e mostrar um retorno ao concluir a rotina. A aplicação será responsável por fornecer uma massa de dados considerável (cerca de 30GB) e deve ser capaz de lidar com dados fornecidos.

*Observação Importante:*
1. Pedimos extremo comprometimento com o teste, e utilizamos IA para validar se os testes foram gerados por alguma IA (ChatGPT, LhamaGPT, Bard, Jasper, entre outras). Sua dedicação será crucial para uma avaliação justa.
2. Pedimos que clonem o repo ou façam um fork para o github pessoal e nos sinalizem quando finalizarem, pois não será possível abrir PR neste repositório do teste.

## Manipulação de Dados de CSV e Conversão para Array

- Os dados são fornecidos em formato CSV.
- Utilizaremos a biblioteca fs (File System) para ler o arquivo CSV e a biblioteca csv-parser para processar os dados e convertê-los em um array de objetos JavaScript.

## Conversão de Dados para Moeda Real Brasileira

- Valores monetários, como vlTotal, vlPresta, vlMora, etc., precisam ser formatados como moeda brasileira (BRL).
- Utilizaremos a biblioteca intl do JavaScript para formatar os valores numéricos como moeda BRL, incluindo o símbolo de real (R$), separador de milhar e precisão de duas casas decimais.

## Validação de CPF ou CNPJ

- Implementaremos uma função para validar o campo nrCpfCnpj e verificar se ele é um CPF ou CNPJ válido, seguindo as regras de validação apropriadas para cada formato.
- Parte de todos os CPF e CNPJ sao invalidos, usamos um script para gerar dados fictícios. 

## Validação de Valor Total e Prestações

- Dividiremos o valor de vlTotal pela quantidade de prestações (qtPrestacoes).
- Verificaremos se o resultado dessa divisão é igual ao valor de vlPresta para cada prestação, garantindo que os cálculos estejam corretos e consistentes.
- Essa função deve retornar um valor true ou false.
- Para chegar a um valor aproximado, devera converter o valor total para um numero inteiro, ignorando as dezenas quebradas, e calculando a data de pagamento para verificar se existe juros acumulado, e o valor de mora, caso o valor do movimento(vlMovimento) seja maior que o valor do pagamento (vlPag), devera construir uma trataviva adequada dizendo que o pagamento está inconsistente.

---

A conclusão bem-sucedida deste teste será avaliada com base na implementação eficiente de conceitos como tratamento de dados em larga escala, comunicação assíncrona, gerenciamento de estado, manipulação de CSV, escolha adequada de tecnologias e boas práticas de desenvolvimento.

Boa sorte!

## Instruções

- Executar o comando na raiz do projeto: npm i ou yarn install
- Após fazer toda a instalação executar o comando:
  - npm run start:dev ou yarn start:dev

## Observações

- No ultimo trecho do teste, na qual foi pedido para validar o valor pago considerando a multa e o juros de mora, nao ficou muito claro as instrucoes, pois os campos 'vlMovimento' e 'vlPag' nao existem no arquivo .CSV. Condiderei as informacoes que estavam no proprio arquivo.
