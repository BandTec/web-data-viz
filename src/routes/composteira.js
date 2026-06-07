var express = require("express");
var router = express.Router();

var composteiraController = require("../controllers/composteiraController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
// router.get("/selecionarPorId/:id", function (req, res) {
//     composteriaController.selecionarPorIdController(req, res);
// })
// router.post("/criar", function (req, res) {
//     composteriaController.criarComposteiraController(req, res);
// })
// router.put("/atualizar", function (req, res) {
//     composteriaController.atualizarComposteiraController(req, res);
// })
// router.delete("/deletar", function (req, res) {
//     composteriaController.deletarComposteiraController(req, res);
// })


  router.get("/buscarPorIdComposteira/:id", function (req, res) {
    composteiraController.buscarPorIdComposteira(req, res)
  });
    
  router.put("/desativarComposteira/:id", function (req, res){
      composteiraController.desativarComposteira(req, res)
    });

  router.post("/cadastrarComposteira", function (req, res) {
      composteiraController.cadastrarComposteira(req, res);
  });  

  router.put("/alterarDados", function(req, res){
    composteiraController.alterarDados(req, res);
  })
  

module.exports = router;

