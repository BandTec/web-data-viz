var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
  });
  
  router.get("/buscarNomesProdutor", function (req, res) {
  empresaController.buscarPorId(req, res);
});

  router.get("/buscarPorIdComposteira/:id", function (req, res) {
    empresaController.buscarPorIdComposteira(req, res)
  });

  router.put("/desativarComposteira/:id", function (req, res){
    empresaController.desativarComposteira(req, res)
  });
  
  router.post("/cadastrarComposteira", function (req, res) {
      empresaController.cadastrarComposteira(req, res);
  });  
  
router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

router.put("/alterarDados", function(req, res){
  empresaController.alterarDados(req, res);
})

module.exports = router;