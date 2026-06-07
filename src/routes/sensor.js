var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

// router.get("/pegarTodosSensores/:id", function (req, res) {
//     sensorController.pegarTodoSensoresController(req, res);
// });
// router.get("/pegarSensor/:id", function (req, res) {
//     sensorController.pegarSensorContorller(req, res);
// });
// router.post("/criar", function (req, res) {
//     sensorController.adicionarSensorController(req, res);
// });
// router.put("/editar", function (req, res) {
//     sensorController.atualizarSensorController(req, res);
// });
// router.delete("/deletar", function (req, res) {
//     sensorController.deletarSensorController(req, res);
// });

router.get("/buscarSensor/:id", function(req, res){
  sensorController.buscarSensorPorId(req, res)
})

router.put("/desativarSensor/:id", function(req, res){
  sensorController.desativarSensor(req, res)
})

router.post("/cadastrarSensor", function(req, res){
  sensorController.cadastrarSensor(req, res)
})

router.put("/alterarSensor", function(req, res){
  sensorController.alterarSensor(req, res)
})

router.delete("/deletarSensor/:id", function(req, res){
    sensorController.deletarSensor(req, res)
})


module.exports = router;