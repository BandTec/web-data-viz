var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.get("/pegarTodosSensores/:id", function (req, res) {
    sensorController.pegarTodoSensoresController(req, res);
});
router.get("/pegarSensor/:id", function (req, res) {
    sensorController.pegarSensorContorller(req, res);
});
router.post("/criar", function (req, res) {
    sensorController.adicionarSensorController(req, res);
});
router.put("/editar", function (req, res) {
    sensorController.atualizarSensorController(req, res);
});
router.delete("/deletar", function (req, res) {
    sensorController.deletarSensorController(req, res);
});



module.exports = router;