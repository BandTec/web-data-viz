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
  empresaController.buscarPorId(req, res);     //DEIXA AQUI
});


router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

router.get("/buscarPorUsuario/:id", function (req, res) {
  empresaController.buscarPorUsuario(req, res);
});


module.exports = router;