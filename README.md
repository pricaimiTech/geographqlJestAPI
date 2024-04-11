## Automação de Serviço

### Tecnologias utilizadas

node version v18.16.1

### Como configurar o projeto

- Acesse a pasta do repositório que deseja rodar os testes

```
    cd geographqlJestAPI/
```

- Rode os testes com o comando abaixo

```
 yarn test
```

### Organização dos testes

Dentro da pasta de `__Test__` se encontra as validações e requisições para realizar testes de contrato e serviço da aplicação.

A pasta `environemnt` armazena dados fixos a serem usados nos testes

A pasta `graphql/query` armazena as querys e variabels

A pasta `graphql/schema` armazena os schemas

Na parta `helpers/utils` são funções utilitarias daquele serviço que poderão ser utilizadas em outros repositórios.

Com o arquivo `babel.config.js` irá realizar a "tradução" do ECS6 para o javascript.

Com o arquivo `jest.config.mjs` será feito a configuração dos testes.

```
├── __Test__
├── environment
├── graphql
    ├── query/
    ├── schema/
├── helpers
    ├── utils/
├── README.md
```
