var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idComposteira", function (req, res) {
    medidaController.buscarUltimasDeteccoes(req, res);
});

router.get("/tempo-real/:idComposteira", function (req, res) {
    medidaController.buscarDeteccaoEmTempoReal(req, res);
});

module.exports = router;