# CRIAR ROTA NA API

No contexto de Programação WEB, uma "rota" será o nome que daremos aos nossos Endpoints.
Endpoints são as funções disponíveis em nossa API, que aceitam parâmetros e devolvem dados ao cliente que os requisitou. [1]

Para criar uma nova rota na API, siga esse caminho:

### Para esse exemplo, irei criar um cadastro e consulta de carros.

### Importando arquivo que contém as rotas

Abra o arquivo app.js, que fica na raiz diretório **site** e adicione uma linha que contenha uma variável que vai receber o caminho do arquivo da rota que você irá usar! No meu caso vai ficar da seguinte forma: 

```jsx
var carrosRouter = require("./src/routes/carros");
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

```jsx
var express = require("express");
var router = express.Router();
```

**Importando a controller que vai ser criada posteriormente:**

```jsx
var carroController = require("../controllers/carroController");
```

**Criando a rota que vai indicar /carros/cadastrar ao ser acessada pelo front-end. O /cadastrar é do tipo post e o /listar é do tipo get:**

```jsx
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

```jsx
module.exports = router;
```

Ao final de tudo, teremos o arquivo com essa estrutura:

```jsx
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

```jsx
var carroModel = require("../models/carroModel");
```

Cria a função que vai ser chamada no passo de cima e exporta ela. No final ficará assim:

```jsx
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

```jsx
var database = require("../database/config")
```

Aqui podemos criar a função que fará a comunicação com o banco de dados, onde ela recebe o paramêtro nome e executa uma query de insert com o valor desse nome:

```jsx
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

```jsx
module.exports = {
    cadastrar,
    listar
};
```

E por fim teremos o arquivo completo com isso:

```jsx
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

### Fontes bibliográficas

[1] https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/
