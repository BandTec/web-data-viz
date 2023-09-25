/**
 * Imports de dependências do app.js.
 */
var express = require("express");
var cors = require("cors");
var path = require("path");
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var aquariosRouter = require("./src/routes/aquarios");
var empresasRouter = require("./src/routes/empresas");

/**
 * Variável que define o ambiente de processo da aplicação.
 */
process.env.AMBIENTE_PROCESSO = "desenvolvimento";

let mensagem = "";

if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    mensagem = "\t\tVocê está rodando sua aplicação em Ambiente de DESENVOLVIMENTO \n" +
                "\t\tBanco de dados sendo utilizado: MySQL Server (local) \n" +
                "\t\t\t\tCaso queira utilizar o ambiente de produção (SQL Server), troque o valor da linha 16\n" +
                "\t\t\t\tpara 'producao' e reinicie a aplicação.\n";
} else if (process.env.AMBIENTE_PROCESSO == "producao") {
    mensagem = "\t\tVocê está rodando sua aplicação em Ambiente de PRODUÇÃO \n" +
                "\t\tBanco de dados sendo utilizado: SQL Server (nuvem) \n" +
                "\t\t\t\tCaso queira utilizar o ambiente de desenvolvimento (MySQL Server), troque o valor da linha 16\n" +
                "\t\t\t\tpara 'desenvolvimento' e reinicie a aplicação.\n";
}

var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());


/**
 * Rotas expostas pela aplicação.
 * Parametros de app.use():
 * @param {string} caminho - Caminho da rota disponibilizada para o cliente.
 * @param {*} router - Arquivo que contém as funções da respectiva rota.
 */
app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/aquarios", aquariosRouter);
app.use("/empresas", empresasRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    ${mensagem}`);
});
