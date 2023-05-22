<img src="https://user-images.githubusercontent.com/46379117/192358781-9ca879e4-e55e-4d0d-b876-f9a4a2ed9ae8.png" width="600px">

_Web Data Visualization = Visualização de Dados na Web_

_Implementação de Referência para o seu Projeto de Primeiro Semestre_

<hr>

# Como usar

1. Clone este repositório em sua máquina.


1. Crie, no Banco de Dados, as tabelas necessárias para o funcionamento deste projeto.
- Siga as instruções no arquivo **/site/src/database/script-tabelas.sql**


3. Acesse o arquivo **/site/app.js** e parametrize o ambiente.
- Se você estiver utilizando o Ambiente de Produção (SQL Server na nuvem Azure, remoto), comente a linha 1 e deixe habilitada a linha 2 onde está o valor **process.env.AMBIENTE_PROCESSO = "producao";**
- Se você estiver utilizando o Ambiente de Desenvolvimento (MySQL Workbench, local), comente a linha 2 e deixe habilitada a linha 1 onde está o valor **process.env.AMBIENTE_PROCESSO = "desenvolvimento";**

4. Adicione as credenciais de Banco de Dados no arquivo **/site/src/database/config.js**, seguindo as instruções neste.

5. Acesse o local do diretório **/site** presente neste repositório no seu terminal (GitBash ou VSCode) e execute os comandos abaixo:

```
npm i
``` 
_O comando acima irá instalar as bibliotecas necessárias para o funcionamento do projeto. As bibliotecas a serem instaladas estão listadas no arquivo **package.json** então é muito importante que este não seja alterado. Será criada uma nova pasta/diretório chamado **node_modules** quando o comando for finalizado, que é onde as bibliotecas estão localizadas. Não altere a pasta/diretório._

```
npm start
``` 

_O comando acima irá iniciar seu projeto e efetuar os comandos de acordo com a sua parametrização feita nos passos anteriores._

6. Para "ver" seu projeto funcionando, acesse em seu navegador o caminho **informado no terminal**.

7. Caso queira parar a execução, tecle **CTRL+C** no terminal em que o projeto está rodando.

## Adicionar novo recurso ao projeto

**"Recurso? O que é?"** Enquanto no Banco de Dados chamamos as tabelas de "entidades", quando tratamos de desenvolvimento WEB usamos a palavra "recurso" para se referir a algo que podemos criar, ler, atualizar ou deletar [1]. Estas ações são conhecidas como CRUD: Create, Read, Update e Delete. Para acessar cada ação, usamos os métodos HTTP: POST, GET, PUT e DELETE [2]. (Há outros verbos, porém com estes já conseguimos efetuar CRUDs). 

**Tabela para ajudar a fazer a associação**

<table>
  <tr>
    <th>C.R.U.D</th>
    <th>Ação</th>
    <th>Tradução</th>
    <th>Verbo HTTP *</th>
    <th>Comando BD</th>
  </tr>
  <tr>
    <td>C</td>
    <td>Create</td>
    <td>Criar</td>
    <td>POST</td>
    <td>INSERT</td>
  </tr>
  <tr>
    <td>R</td>
    <td>Read</td>
    <td>Ler</td>
    <td>GET</td>
    <td>SELECT</td>
  </tr>
  <tr>
    <td>U</td>
    <td>Update</td>
    <td>Atualizar</td>
    <td>PUT</td>
    <td>UPDATE</td>
  </tr>
  <tr>
    <td>D</td>
    <td>Delete</td>
    <td>Deletar</td>
    <td>DELETE</td>
    <td>DELETE</td>
  </tr>
</table>

_* Você verá o verbo HTTP sendo apontado nos arquivos em /routes_

**"E no meu projeto, o que seria um recurso?"** Em web-data-viz manipulamos os recursos **usuário**, **aviso** e **medida**. Podemos conferir isso vendo para quais entidades foram criados os caminhos de inserção e captura de dados, que envolve os diretórios **routes**, **controllers** e **models**.

Abaixo, uma figura que ajuda a compreender o caminho percorrido para, por exemplo, efetuar o cadastro de um usuário:

![image](https://user-images.githubusercontent.com/46379117/201171649-e9d73663-b341-4035-83bd-885314c26ebb.png)

# CRIAR NOVA ROTA NA API

Para criar uma nova rota na API, siga esse caminho:

### Para esse exemplo, irei criar um cadastro e consulta de carros!

### Importando arquivo que contém as rotas

Abra o arquivo app.js, que fica na raiz diretório **site** e adicione uma linha que contenha uma variável que vai receber o caminho do arquivo da rota que você irá usar! No meu caso vai ficar da seguinte forma: ****

```jsx
**var** **carrosRouter = require("./src/routes/carros");**
```

 Abaixo é como deve ficar o arquivo app.js, importando o arquivo **carros.js** da pasta **routes**:

```jsx
var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var carrosRouter = require("./src/routes/carros");
```

### Criando uma porta de entrada na api

Ainda na app.js, com a importação criada, é possível criarmos uma “rota”! Como seria? Irei descer mais um pouco o arquivo e iremos nos deparar com o seguinte código e irei adicionar uma “rota” nova para a minha API:

```jsx
app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/carros", carrosRouter);
```

**Pode perceber que logo depois de /medidas eu adicionei um /carros e chamei a carrosRouter importada anteriormente!**

### Criando arquivo de rota

Logo após ter feito a primeira “porta de entrada” da nossa API, quando um front-end for acessar essa nossa rota, ele deve colocar /carros/**algumaCoisa**, o que seria esse “alguma coisa”? Dentro de api-site -> src -> routes, irei criar um novo arquivo chamado carros.js que é nesse arquivo que eu importo no [passo 1. Importando arquivo que contém as rotas](about:blank#importando-arquivo-que-cont%C3%A9m-as-rotas)

No arquivo carros.js dentro do diretório routes.

**Configuração padrão para indicar o uso da biblioteca do node para criação:**

```
var express = require("express");
var router = express.Router();
```

**Importando a controller que vai ser criada posteriormente:**

```
var carroController = require("../controllers/carroController");
```

**Criando a rota que vai indicar /carros/cadastrar ao ser acessada pelo front-end. O /cadastrar é do tipo post e o /listar é do tipo get:**

```
router.post("/cadastrar", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    carroController.cadastrar(req, res);
});

router.get("/listar", function (req, res) {
    // função a ser chamada quando acessar /carros/listar
    carroController.listar(req, res);
});
```

**Sempre devemos deixar visível (exportar) para outro que assim outro arquivo consiga importar todas as nossas configurações desse arquivo:**

```
module.exports = router;
```

Ao final de tudo, teremos o arquivo com essa estrutura:

```
var express = require("express");
var router = express.Router();

var carroController = require("../controllers/carroController");

router.post("/cadastrar", function (req, res) {
    // função a ser chamada quando acessar /carros/cadastrar
    carroController.cadastrar(req, res);
});

router.get("/listar", function (req, res) {
    // função a ser chamada quando acessar /carros/listar
    carroController.listar(req, res);
});

module.exports = router;
```

### Criando arquivo controller

Dentro de api-site -> src -> controller, crie um arquivo chamado carroController.js.

Dentro do arquivo carroController.js coloque a **carroModel** que fará a conexão com o banco:

```
var carroModel = require("../models/carroModel");
```

Cria a função que vai ser chamada no passo de cima e exporta ela. No final ficará assim:

```
var carroModel = require("../models/carroModel");

function listar(req, res) {
    carroModel.listar().then(function(resultado){
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) {
    var nome = req.body.nome;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }

    carroModel.cadastrar(nome).then(function(resposta){
        res.status(200).send("Carro criado com sucesso");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    listar,
    cadastrar
}
```

**Sempre exportando a função que eu criar para poder ser “enxergada” por outro arquivo.**

### Criando arquivo models

Dentro de api-site -> src -> models, crie um arquivo chamado carroModel.js

Dentro do arquivo importamos a configuração do banco para fazer consultas futuras no banco:

```
var database = require("../database/config")
```

Aqui podemos criar a função que fará a comunicação com o banco de dados, onde ela recebe o paramêtro nome e executa uma query de insert com o valor desse nome:

```
function listar() {
    var instrucao = `
        SELECT * FROM carro;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome) {
    var instrucao = `
        INSERT INTO carro (nome) VALUES ('${nome}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
```

**Sem esquecer de exportar as funções que criamos para serem vistas por outros arquivos**

```
module.exports = {
    cadastrar,
    listar
};
```

E por fim teremos o arquivo completo com isso:

```
var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT * FROM carro;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome) {
    var instrucao = `
        INSERT INTO carro (nome) VALUES ('${nome}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar
};
```

**Entendi o que é um recurso e gostaria de adicionar um novo ao meu projeto! Como faz?**  
- Primeiro, crie a tabela no Banco de Dados referente a este recurso. Exemplos de recursos comuns de serem adicionados ao projeto no primeiro semestre: Silo, Aquário, Sala, Andar, Endereço, Mercado, Prateleira, Unidade, Carro, Caminhão...  
- Assim que criada a tabela, faça todo o caminho de **front-end → routes → controllers → models** replicando o que já existe!  
- Exemplo, se você quiser a funcionalidade de adicionar um novo Aquário, deve criar arquivos referentes ao aquario nos diretórios e replicar também as funções.  
- Dica: A implementação de AVISO já contém o CRUD completo! :wink:
 
### Fontes bibliográficas

[1] https://datatracker.ietf.org/doc/html/rfc2396  
[2] https://datatracker.ietf.org/doc/html/rfc7231
