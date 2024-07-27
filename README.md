## 🚀 Getting started

- Você precisa instalar [Node.js](https://nodejs.org/en/download/) e [NPM](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) ou apenas o [Docker](https://www.docker.com/) para rodar esse projeto.

**Clone o projeto e acesse a pasta**

```bash
$ git clone git@github.com:guiathayde/kronoos-teste-vaga-fullstack.git && cd kronoos-teste-vaga-fullstack
```

**Siga os passos abaixo para rodar apenas com o Node.js**

```bash
# Instale as dependências
$ npm i

# Rode a função principal para ver os resultados do processamento do data.csv
$ npm start

# Para rodar os testes
$ npm test
```

**Siga os passos abaixo para rodar apenas com o Docker**

```bash
# Faça a build do container
$ docker build -t kronoos_test .

# Rode o container criado
$ docker run kronoos_test
```

<p align="center">Feito com 💜 por Guilherme Athayde</p>

# Teste Prático para Desenvolvedor Full Stack Kronoos

Você foi designado para desenvolver uma aplicação que deve lidar com grandes volumes de dados. Você deve rodar as seguintes validações e tratativas para cada um dos dados do arquivo e mostrar um retorno ao concluir a rotina. A aplicação será responsável por fornecer uma massa de dados considerável (cerca de 30GB) e deve ser capaz de lidar com dados fornecidos.

*Observação Importante:*
1. Pedimos extremo comprometimento com o teste, e utilizamos IA para validar se os testes foram gerados por alguma IA (ChatGPT, LhamaGPT, Bard, Jasper, entre outras). Sua dedicação será crucial para uma avaliação justa.
2. Pedimos que não utilize bibliotecas para efetuar a validação do CPF ou CNPJ. Queremos que você desenvolva o seu próprio algoritmo de validação para que possamos entender qual sua dinâmica de raciocínio.
3. Pedimos que clonem o repo ou façam um fork para o github pessoal e nos sinalizem quando finalizarem, pois não será possível abrir PR neste repositório do teste.

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

- Dividiremos o valor de `vlTotal` pela quantidade de prestações (`qtPrestacoes`).
- Verificaremos se o resultado dessa divisão é igual ao valor de `vlPresta` para cada prestação, garantindo que os cálculos estejam corretos e consistentes.

---

A conclusão bem-sucedida deste teste será avaliada com base na implementação eficiente de conceitos como tratamento de dados em larga escala, comunicação assíncrona, gerenciamento de estado, manipulação de CSV, escolha adequada de tecnologias e boas práticas de desenvolvimento.

Boa sorte!
