## Como rodar a aplicação.

Clone o repositório da aplicação.

`git clone https://github.com/Heinrick-Senna/teste-vaga-fullstack`

Entre na pasta clonada

`cd teste-vaga-fullstack`

Instale as dependências do projeto

`npm i` || `yarn yarn install`

Instale o próprio projeto como uma dependência global

`npm i -g .` || `yarn global add .`

<hr>

Depois de feita a instalação do pacote globalmente você poderá usar o comando csvApp para interagir com a CLI e realizar as ações.

<img src="https://github.com/Heinrick-Senna/teste-vaga-fullstack/blob/main/images/CLI%20Example.png" />

<hr>

## Exemplos de uso

`csvApp count -f .\data.csv` Contar a quantidade de linhas do arquivo data.csv

`csvApp generateMockup -f .\data.csv -o .\resultMockup.csv -n 1000000` Gerar um arquivo de exemplo com 1 milhão de linhas. Ele usará o header e a primeira linha do arquivo de origem.

`csvApp -f .\data.csv -o .\result.json` Por fim o comando default da CLI realiza uma verificação linha a linha de todo o arquivo data.csv e irá gerar como resultado um arquivo result.json que foi tratado conforme solicitado.<br/><b>Vale mencionar que ele também gera um objeto localizado ao final do json que mostra a quantidade de parcelas válidas e a quantidade de documentos válidos.</b>

Ex de um objeto inserido dentro de result.json
```
[
  {
    "nrInst": "533",
    "nrAgencia": "32",
    "cdClient": "56133",
    "nmClient": "CLIENTE 1",
    "nrCpfCnpj": "41854274761",
    "nrContrato": "733067",
    "dtContrato": "20221227",
    "qtPrestacoes": "5",
    "vlTotal": "R$ 83.720,19",
    "cdProduto": "777",
    "dsProduto": "CDC PESSOA JURIDICA",
    "cdCarteira": "17",
    "dsCarteira": "CRÉDITO DIRETO AO CONSUMIDOR",
    "nrProposta": "798586",
    "nrPresta": "2",
    "tpPresta": "Original",
    "nrSeqPre": "0",
    "dtVctPre": "20220406",
    "vlPresta": "R$ 17.524,03",
    "vlMora": "R$ 29.196,96",
    "vlMulta": "R$ 536,40",
    "vlOutAcr": "R$ 0,00",
    "vlIof": "R$ 0,00",
    "vlDescon": "R$ 0,00",
    "vlAtual": "R$ 47.257,39",
    "idSituac": "Aberta",
    "idSitVen": "Vencida",
    "Parcela é Valida": false,
    "CPF/CNPJ é Válido": false
  },
  {
    "validDocuments": "13",
    "validInstallments": "0"
  }
]
```

## Sobre a capacidade da aplicação

### Foram realizados testes de criação e leitura de arquivos, sendo antigido as seguintes métricas.
- Tamanho máximo de arquivo Mockup.csv gravado: <b> 188GB (1 Bilhão de linhas) </b>

- Tamanho máximo de arquivo Mockup.csv lido: <b> 1.32GB (7 Milhões de linhas) </b>

- Tamanho máximo de arquivo Result.json processado: <b> 4.32GB </b>

<img src="https://github.com/Heinrick-Senna/teste-vaga-fullstack/blob/main/images/File%20Sizes.png" />

## Considerações Finais

### Referências usadas no projeto
- https://www.youtube.com/watch?v=O37n35XUxj0

- https://github.com/albertosouza/mini-cursos/blob/master/nodejs/lendo-arquivos-grandes.md

- https://stateful.com/blog/process-large-files-nodejs-streams

- https://stackoverflow.com/questions/44279211/how-to-read-big-files-in-nodejs

- https://www.youtube.com/watch?v=wmLLw3SnPfc

- https://www.youtube.com/watch?v=1a2ADqte1jY&t=132s

### Bibliotecas usadas no projeto
- [cli-progress](https://www.npmjs.com/package/cli-progress) -> Para construir e gerenciar a barra de progresso da aplicação.

- [csv-parsers](https://www.npmjs.com/package/csv-parser) -> Para processar e ler os arquivos .csv.

- [yargs](https://www.npmjs.com/package/yargs) -> Para facilitar a criação da CLI e leitura de seus respectivos comandos e argumentos.

### Perguntas gerais

- <b>Horas de dedicação</b><br/>8 Horas

- <b>Por que não usar Typescript?</b><br/>Complexidade desnecessária para um MVP de um projeto pequeno.

- <b>Oque a aplicação é capaz de fazer?</b><br/>Como foi mencionado ela é capaz de gerar CSVs de até 1 Bilhão de linhas e ler CSVs de até 7 Milhões de linhas, porém estes não são os limites da aplicação, na verdade esse é o máximo que eu cheguei à testar. Considerando também o real uso dessa aplicação, é possível a alteração da regra de negócio atual. A aplicação tem potêncial de expansão e flexibilidade para outras tratativas de dados e vínculo com bancos de dados por exemplo.

- <b>Essa aplicação pode ser usada em um ambiente real?</b><br />Creio que sim, até onde eu testei a aplicação tem consistência nos resultados apresentados e teria sim uma possibilidade de integração num ambiente de trabalho real.
