const codigoModel = require('../models/codigoModel')

async function gerarCodigo (req, res) {
  const produtorId = req.body.produtorId

  if (!produtorId)
    res.status(400).send("Produtor Id inválido")

  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  let codigo = ""
  for (let i = 0; i < 6; i++) 
    codigo += i % 2 !== 0 ? Math.floor(Math.random() * 10) : alfabeto[Math.floor(Math.random() * 26)]
  
  const result = await codigoModel.gerarCodigo(produtorId, codigo)
  .catch(erro => res.status(400).send(erro))

  res.status(201).json(result)
}

async function buscarCodigos (req, res) {
  const { userId } = req.params

  if (!userId)
    res.status(400).send("Usuario Id inválido")

  const result = await codigoModel.buscarCodigos(userId)
  .catch(erro => res.status(400).send(erro))

  res.status(200).json(result)
}

async function desativarCodigo (req, res) {
  const { id } = req.params

  if (!id)
    res.status(400).send("Código Id inválido")

  const result = await codigoModel.desativarCodigo(id)
  .catch(erro => res.status(400).send(erro))

  res.status(200).json(result)
}

module.exports = {
  gerarCodigo,
  buscarCodigos,
  desativarCodigo
}