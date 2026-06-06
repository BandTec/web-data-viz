const codigoController = require("../controllers/codigoController")
const express = require("express")
const router = express.Router()

router.post("/gerar", (res, req) => {
  codigoController.gerarCodigo(res, req)
})

router.get("/buscar/:userId", (res, req) => {
  codigoController.buscarCodigos(res, req)
})

router.get("/buscarPorId/:id", (res, req) => {
  codigoController.buscarProdutorPorIdCodigo(res, req)
})

router.delete("/desativar/:id", (res, req) => {
  codigoController.desativarCodigo(res, req)
})
module.exports = router