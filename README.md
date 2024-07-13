# Teste Prático para Desenvolvedor Full Stack Kronoos

![Code Analysis](https://github.com/guligon90/teste-vaga-fullstack/actions/workflows/code-analysis.yml/badge.svg)

Avaliação técnica para a posição de desenvolvedor full-stack na [Kronoos](https://www.github.com/kronoos-dev). Solução de _Guilherme Gonçalves_ - [guligon90](https://www.github.com/guligon90)

## Sumário

<!-- TOC -->

- [Teste Prático para Desenvolvedor Full Stack Kronoos](#teste-pr%C3%A1tico-para-desenvolvedor-full-stack-kronoos)
  - [Sumário](#sum%C3%A1rio)
  - [Preliminares](#preliminares)
  - [O projeto](#o-projeto)
    - [Entradas](#entradas)
    - [Configuração](#configura%C3%A7%C3%A3o)
    - [Resultados](#resultados)
  - [Manipulação](#manipula%C3%A7%C3%A3o)

<!-- /TOC -->

## Preliminares

Esse projeto foi desenvolvido utilizando as seguintes ferramentas:

- [Node Version Manager - `nvm`](https://github.com/nvm-sh/nvm#installing-and-updating): v2.2.13 ou acima. É recomendado esse gerenciador para a instalação local das seguintes dependências;
  - [Node.js](https://nodejs.org/dist/v20.11.1/node-v20.11.1.tar.gz): versão LTS (v20.11.1) ou acima;
  - [Yarn Package Manager - `yarn`](https://yarnpkg.com/getting-started): v1.22.21 ou acima.

## O projeto

Em linhas gerais, o projeto consiste de uma aplicação Node.js, escrita em TypeScript, que realiza a análise de uma arquivo CSV (_comma-separated values_), aplicando validações e formatações específicas em certas categorias de dados (colunas).

### Entradas

A aplicação é executada, via linha de comando, via Yarn, da seguinte forma:

```bash
yarn start:prod \
  [ -d | --debug ] \                              # Opcional. Flag que ativa mensagens de depuração da pipeline de análise do CSV.
  [ -S | --statistics ] \                         # Opcional. Flag que ativa a exportação da estatísticas de análise em um CSV dedicado.
  [ -h | --help ] \                               # Opcional. Documentação dos argumentos e utilização do programa em linha de comando.
  [ -i data.csv | --inputcsv=data.csv ] \         # Nome do arquivo CSV a ser analisado.
  [ -o output.csv | --outputcsv=output.csv ] \    # Opcional. Nome do arquivo CSV contendo as linhas válidas e formatadas.
  [ -r report.csv | --reportcsv=report.csv ] \    # Opcional. Nome do arquivo CSV contendo o relatórios de erros.
  [ -s statistics.csv | --stats=statistics.csv ]  # Opcional. Nome do arquivo CSV contendo as estatísticas da análise do arquivo original.  
```

Ao ser executado, o programa verifica, na raíz do projeto, se existe já criada a seguinte estrutura de pastas:

```bash
./teste-vaga-fullstack
├── # ...
├── csv
│   ├── input # Deverá conter o CSV de entrada, e.g. data.csv.
│   └── output # Pasta onde serão exportados os arquivos CSV resultantes da análise.
```

Caso a mesma não exista, o programa a criará automaticamente, em seguida informando ao usuário que a pasta `./csv/input` deverá ser manualmente populada com o arquivo CSV de entrada, de modo a iniciar a análise do mesmo:

![Peek 2024-07-13 09-04](https://github.com/user-attachments/assets/058da9b8-e467-44dc-a61c-cf07f89eecc1)

### Configuração

De modo que o programa saiba onde criar a estrutura de diretórios e, ultimamente, os arquivos CSV de saída, existem algumas variáveis de ambiente que contém esses parâmetros de configuração. Essas variáveis devem ser declaradas em um arquivo `.env`, na raíz do projeto, da seguinte forma:

```bash
NODE_ENV=development # Valores suportados: development | dev | production | prod | test
INPUT_CSV_BASE_PATH=/caminho/valido/para/pasta/csv/de/entrada/ # Opcional. Pode ser deixado em branco
OUTPUT_CSV_BASE_PATH=/caminho/valido/para/pasta/csvs/de/saida/ # Opcional. Pode ser deixado em branco
```

> **Observação**: Caso as variáveis `INPUT_CSV_BASE_PATH` e `OUTPUT_CSV_BASE_PATH` não sejam especificadas, será criada a estrutura de pastas especificada [anteriormente](#entradas), apenas para os ambientes `development` e `test`. Para o ambiente `production, a população dessas variáveis se é obrigatória.

### Resultados

Da análise do CSV de entrada, resultam:

- Um arquivo CSV, por padrão nomeado `output.csv`, contendo os dados válido do arquivo CSV original, devidamente formatados, Possui a mesma estrutura do CSV de entrada;
- Um arquivo CSV, por padrão nomeado `report.csv`, contendo o relatório de validação das linhas do CSV, com as descrições de erros;

| **Campo**      | **Descrição**                                                                               | **Tipo** |
| -------------- | ------------------------------------------------------------------------------------------- | -------- |
| `lineNumber`   | Número da linha do arquivo CSV de entrada, onde existem erros.                              | `number` |
| `header`       | O nome da série de dados do CSV original, e.g. `vlTotal`                                    | `string` |
| `errorCode`    | O código de erro associado à validação do valor de uma série, e.g. `custom`, `invalid_date` | `string` |
| `errorMessage` | Descrição detalhada do erro.                                                                | `string` |

> **Observação**: Uma linha poderá apresentar vários erros. Com efeito, poderão existir várias linhas no CSV em questão, com o mesmo valor de `lineNumber`. com as suas respectivas descrições de erros.

- Um arquivo CSV, por padrão nomeado `statistics.csv`, contendo informações úteis acerca da validação das linhas do CSV de entrada. Segue abaixo a estrutura das suas séries de dados:

| **Campo**             | **Descrição**                                                   | **Tipo** |
| --------------------- | --------------------------------------------------------------- | -------- |
| `totalLinesProcessed` | Número total de linhas processadas                              | `number` |
| `totalInvalidLines`   | Número total de linhas contendo erros em alguns de seus campos  | `number` |
| `totalValidLines`     | Número total de linhas sem nenhuma inconsistência               | `number` |
| `outputCsvPath`       | Caminho completo do arquivo CSV gerado com as linhas válidas    | `string` |
| `reportCsvPath`       | Caminho completo do arquivo CSV gerado com o relatório de erros | `string` |
| `statsCsvPath`        | Caminho completo do arquivo CSV gerado com estatísticas         | `string` |

Todos serão criados na pasta `./csv/output`.

## Manipulação

Com as dependências básicas devidamente instaladas, e o projeto clonado localmente, é hora de conduzir a análise do [CSV](./data.csv) fornecido para testes. Com efeito, a seguinte sequência de comandos do Yarn deve ser executada:

- Instalação de packages Node.js:

    ```bash
    yarn install
    ```

- Transpilação da base de código TypeScript (não incluindo testes unitários):

    ```bash
    yarn build:prod
    ```

- Execução do código JavaScript, gerado na pasta `build`, passando como parâmetro obrigatório o nome do arquivo CSV de entrada. Como dito anteriormente, o mesmo deve estar na diretório `./csv/input`:

  - Sem flag de depuração:

    ```bash
    yarn start:prod -i data.csv
    ```

    ![Peek 2024-07-13 09-28](https://github.com/user-attachments/assets/a41677ec-8700-4a79-85ae-3b4bad13cc64)

  - Com flag de depuração:

    ```bash
    yarn start:prod -i data.csv -d
    ```

    ![Peek 2024-07-13 09-28--](https://github.com/user-attachments/assets/4e89533d-328a-4a91-a73c-3e7d6f5c7c35)

Considerando `data.csv` como arquivo de entrada, ao final da execução desse comando, serão criados na pasta `./csv/output` os arquivos `output.csv`, `report.csv` e `statistics.csv`.

O conteúdo de `output.csv` será similar à:

```csv
nrInst,nrAgencia,cdClient,nmClient,nrCpfCnpj,nrContrato,dtContrato,qtPrestacoes,vlTotal,cdProduto,dsProduto,cdCarteira,dsCarteira,nrProposta,nrPresta,tpPresta,nrSeqPre,dtVctPre,vlPresta,vlMora,vlMulta,vlOutAcr,vlIof,vlDescon,vlAtual,idSituac,idSitVen
1898,15,38194,CLIENTE 244,79135538473,424541,20220906,5,"R$ 73.713,27",821,CDC PESSOA JURIDICA,3,CRÉDITO DIRETO AO CONSUMIDOR,135355,2,Original,0,20220825,"R$ 37.525,92","R$ 49.695,96","R$ 40.513,07","R$ 0,00","R$ 0,00","R$ 0,00","R$ 127.734,95",Aberta,Vencida
1898,15,38194,CLIENTE 244,79135538473,424541,20220906,5,"R$ 73.713,27",821,CDC PESSOA JURIDICA,3,CRÉDITO DIRETO AO CONSUMIDOR,135355,3,Original,0,20220726,"R$ 57.691,97","R$ 72.862,34","R$ 42.427,50","R$ 0,00","R$ 0,00","R$ 0,00","R$ 172.981,81",Aberta,Vencida
...
```

Analogamente, o conteúdo de `report.csv` será similar à:

```csv
lineNumber,header,errorCode,errorMessage
1,nrCpfCnpj,custom,CNPJ ou CPF inválido
2,nrCpfCnpj,custom,CNPJ ou CPF inválido
3,nrCpfCnpj,custom,CNPJ ou CPF inválido
4,nrCpfCnpj,custom,CNPJ ou CPF inválido
...
```

Por fim, o conteúdo de `statistics.csv` será similar à:

```csv
totalLinesProcessed,totalInvalidLines,totalValidLines,outputCsvPath,reportCsvPath,statsCsvPath
10086,10073,13,/some/path/teste-vaga-fullstack/csv/output/output.csv,/some/path/teste-vaga-fullstack/csv/output/report.csv,/some/path/teste-vaga-fullstack/csv/output/statistics.csv
...
```

---

[Voltar para índice](#sum%C3%A1rio)
