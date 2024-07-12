# Teste Prático para Desenvolvedor Full Stack Kronoos

![Code Analysis](https://github.com/guligon90/teste-vaga-fullstack/actions/workflows/code-analysis.yml/badge.svg)

Avaliação técnica para a posição de desenvolvedor full-stack na [Kronoos](https://www.github.com/kronoos-dev).  Solução de _Guilherme Gonçalves_ - [guligon90](https://www.github.com/guligon90)

<!-- TOC -->

- [Teste Prático para Desenvolvedor Full Stack Kronoos](#teste-pr%C3%A1tico-para-desenvolvedor-full-stack-kronoos)
  - [Preliminares](#preliminares)
  - [O projeto](#o-projeto)
  - [Manipulação](#manipula%C3%A7%C3%A3o)

<!-- /TOC -->
## Preliminares

Esse projeto foi desenvolvido utilizando as seguintes ferramentas:

- [Node Version Manager - `nvm`](https://github.com/nvm-sh/nvm#installing-and-updating): v2.2.13 ou acima. É recomendado esse gerenciador para a instalação local das seguintes dependências;
  - [Node.js](https://nodejs.org/dist/v20.11.1/node-v20.11.1.tar.gz): versão LTS (v20.11.1) ou acima;
  - [Yarn Package Manager - `yarn`](https://yarnpkg.com/getting-started): v1.22.21 ou acima.

## O projeto

Em linhas gerais, o projeto consiste de uma aplicação Node.js, escrita em TypeScript, que realiza a análise de uma arquivo CSV (_comma-separated values_), aplicando validações e formatações específicas em certas categorias de dados (colunas). Desta análise, resultam:

- Um arquivo de texto, contendo os dados válido do arquivo CSV original, devidamente formatados;
- Um arquivo de texto, contendo o relatório de validação das linhas do CSV, com as descrições de erros.

Na [documentação](./ORIGINAL.md) original do projeto, existem elencados os requisitos funcionais que foram implementados.

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

- Execução do código JavaScript em `build`, passando como parâmetro o nome do arquivo CSV. O mesmo deve estar na raíz do projeto:

    ```bash
    yarn start:prod \
      [-i data.csv | --inputcsv=data.csv] \       # Arquivo CSV a ser analisado
      [-o output.csv | --outputcsv=output.csv] \  # Opcional. Arquivo CSV contendo as linhas válidas e formatadas
      [-r report.csv | --reportcsv=report.csv]    # Opcional. Arquivo CSV contendo o relatórios de erros
    ```

Considerando `data.csv` como arquivo de entrada, ao final da execução desse comando, serão criados os arquivos `output.csv` e `report.csv` na raíz do projeto.

![csv-analysis-output](https://github.com/user-attachments/assets/27d3f3cb-bbfb-4523-a24c-d85e22286e47)

O conteúdo de `report.csv` será similar à:

```csv
lineNumber,header,errorCode,errorMessage
1,nrCpfCnpj,custom,CNPJ ou CPF inválido
2,nrCpfCnpj,custom,CNPJ ou CPF inválido
3,nrCpfCnpj,custom,CNPJ ou CPF inválido
4,nrCpfCnpj,custom,CNPJ ou CPF inválido
...
```

Analogamente, o conteúdo de `output.csv` será similar à:

```csv
nrInst,nrAgencia,cdClient,nmClient,nrCpfCnpj,nrContrato,dtContrato,qtPrestacoes,vlTotal,cdProduto,dsProduto,cdCarteira,dsCarteira,nrProposta,nrPresta,tpPresta,nrSeqPre,dtVctPre,vlPresta,vlMora,vlMulta,vlOutAcr,vlIof,vlDescon,vlAtual,idSituac,idSitVen
1898,15,38194,CLIENTE 244,79135538473,424541,20220906,5,"R$ 73.713,27",821,CDC PESSOA JURIDICA,3,CRÉDITO DIRETO AO CONSUMIDOR,135355,2,Original,0,20220825,"R$ 37.525,92","R$ 49.695,96","R$ 40.513,07","R$ 0,00","R$ 0,00","R$ 0,00","R$ 127.734,95",Aberta,Vencida
1898,15,38194,CLIENTE 244,79135538473,424541,20220906,5,"R$ 73.713,27",821,CDC PESSOA JURIDICA,3,CRÉDITO DIRETO AO CONSUMIDOR,135355,3,Original,0,20220726,"R$ 57.691,97","R$ 72.862,34","R$ 42.427,50","R$ 0,00","R$ 0,00","R$ 0,00","R$ 172.981,81",Aberta,Vencida
...
```
