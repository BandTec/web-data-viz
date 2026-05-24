var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/listar-composteira/:idComposteira", function (req, res) {
    alertaController.listarPorComposteira(req, res);
});

router.get("/listar-produtor/:idProdutor", function (req, res) {
    alertaController.listarPorProdutor(req, res);
});

module.exports = router;
