# Introdução
Agradeço a oportunidade de participar do desafio e espero que gostem! O desafio foi simples, mas me dediquei ao máximo em entregar o que está no enunciado sem "reinventar a roda" e comprir com o propósito do desafio e entregar a rotina de validação e formatação dos dados da planilha em CSV. Toda a rotina se resume em ler o CSV de entrada, validar e formatar os dados da linha e se bem sucedida, então vai ser adicionada ao CSV final.

# Começo rápido
Na pasta do projeto use o comando abaixo para instalação de dependências do projeto:
```sh
npm install
```

Use o comando a baixo executar a rotina
```sh
npm run start
```

# CSV de entrada
Coloque o arquivo de entrada para executar na rotina na pasta `db`; O nome do arquivo não importa contanto que só tenha ele na pasta.

*Observação Importante:*\
Como não foi mencionada se haveria mais arquivos, executei a rotina seguindo o exemplo do repositório com um único arquivo.

# CSV de saída
Este CSV é gerado automaticamente com base no resultado da rotina em validar e formatar as linhas do CSV de entrada.

*Observação Importante:*\
Todas as linhas que não apresentam informações consistentes não permanecem no arquivo CSV de saída.

# Libs que eu desenvolvi
Eu tenho duas libs que eu mesmo criei e inclusive simplifica os cenários de trabalhar com preços ou máscaras cobrindo os cenarios até mesmo com o uso de input no front-end. Mas aqui no cenário do backend quis ao menos fazer o importante e comentar como seria simples o uso com ela e mostrar minhas habilidades, no entanto estou destacando o solicitado no teste e retornando o que de fato está no enunciado.

*Minhas libs próprias utilizadas são:*
1. make-currency
> Trata facilmente preços em javascript cobrindo os cenários de entradas seja "number > string" ou "string > number" no back-end ou front-end.
2. make-mask
> Trata facilmente padrões de texto para o uso de máscaras e isso tanto no back-end ou front-end.

# Feedback
Acredito que seja interessante destacar melhor no enunciado o que se espera após a formatação e validação do CSV e apresentar se deseja somente um console.log ou gerar um novo CSV com o resultado, etc.
