/**
 * Imports de dependências do aquario.js.
 */
var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");


/**
 * Recebendo os dados do html e direcionando para a função cadastrar de aquarioController.js
 * @param {string} caminho - Caminho da rota disponibilizada para o cliente.
 * @param {*} router - Chamada da função que contem a lógica de execução para entregar o resultado.
 * Este comentario é válido para todos os métodos abaixo 👇.
 */
router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});

/**
  * Exportando o módulo de rotas de aquario, caso esse passo não seja executado não será possível utilizar
  * em outros arquivos. Como por exemplo em app.js
  * @module routes/avisos
  */
module.exports = router;