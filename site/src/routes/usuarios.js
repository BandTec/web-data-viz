/**
 * Imports de dependências do aquario.js.
 */
var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");


/**
 * Recebendo os dados do html e direcionando para a respectiva função requisitada.
 * @param {string} caminho - Caminho da rota disponibilizada para o cliente.
 * @param {*} controller - Chamada da função que contem a lógica de execução para entregar o resultado.
 * Este comentario é válido para todos os métodos que utilizam o router.
 */
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

/**
  * Exportando o módulo de rotas de aquario, caso esse passo não seja executado não será possível utilizar
  * em outros arquivos. Como por exemplo em app.js
  * @module routes/usuarios
  */
module.exports = router;