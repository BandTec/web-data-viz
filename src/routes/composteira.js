var express = require("express");
var router = express.Router();

var composteriaController = require("../controllers/composteiraController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/selecionarPorId/:id", function (req, res) {
    composteriaController.selecionarPorIdController(req, res);
})
router.post("/criar", function (req, res) {
    composteriaController.criarComposteiraController(req, res);
})
router.put("/atualizar", function (req, res) {
    composteriaController.atualizarComposteiraController(req, res);
})
router.delete("/deletar", function (req, res) {
    composteriaController.deletarComposteiraController(req, res);
})

module.exports = router;