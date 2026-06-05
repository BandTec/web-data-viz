var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/mostrarDados/:id", function (req, res) {
    graficoController.dadosGraficoController(req, res);
})

module.exports = router;