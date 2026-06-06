var express = require("express");
var router = express.Router();

var composteiraController = require("../controllers/composteiraController");

router.get("/buscarPorIdComposteira/:id", function (req, res) {
  composteiraController.buscarPorIdComposteira(req, res)
});

router.put("/desativarComposteira/:id", function (req, res) {
  composteiraController.desativarComposteira(req, res)
});

router.post("/cadastrarComposteira", function (req, res) {
  composteiraController.cadastrarComposteira(req, res);
});

router.put("/alterarDados", function (req, res) {
  composteiraController.alterarDados(req, res);
})

router.put("/alterarDadosUsuarioComum", function (req, res){
  composteiraController.alterarDadosUsuarioComum(req, res)
} )

router.get("/dashboard/:id", function (req, res) {
  composteiraController.buscarDadosDashboard(req, res);
})

router.get("/grafico/:id", function (req, res) {
  composteiraController.buscarDadosAtualizados(req, res);
})

router.get("/historico/:id", function (req, res) {
  composteiraController.buscarHistorico(req, res);
})

module.exports = router;