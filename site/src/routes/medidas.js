/**
 * Imports de dependências do aquario.js.
 */
var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


/**
 * Recebendo os dados do html e direcionando para a função cadastrar de aquarioController.js
 * @param {string} caminho - Caminho da rota disponibilizada para o cliente.
 * @param {*} router - Chamada da função que contem a lógica de execução para entregar o resultado.
 * Este comentario é válido para todos os métodos abaixo 👇.
 */
router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

/**
  * Exportando o módulo de rotas de aquario, caso esse passo não seja executado não será possível utilizar
  * em outros arquivos. Como por exemplo em app.js
  * @module routes/medidas
  */
module.exports = router;