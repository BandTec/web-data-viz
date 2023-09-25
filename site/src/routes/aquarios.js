/**
 * Imports de dependências do aquarios.js.
 */
var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/aquarioController");

/**
 * Recebendo os dados do html e direcionando para a função cadastrar de aquarioController.js
 * @param {string} caminho - Caminho da rota disponibilizada para o cliente.
 * @param {*} router - Chamada da função que contem a lógica de execução para entregar o resultado.
 * Este comentario é válido para todos os métodos abaixo 👇.
 */
router.get("/:empresaId", function (req, res) {
  aquarioController.buscarAquariosPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

/**
  * Exportando o módulo de rotas de aquario, caso esse passo não seja executado não será possível utilizar
  * em outros arquivos. Como por exemplo em app.js
  * @module routes/aquarios
  */
module.exports = router;