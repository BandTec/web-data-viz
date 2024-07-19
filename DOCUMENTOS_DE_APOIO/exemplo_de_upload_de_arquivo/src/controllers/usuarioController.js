const usuarioModel = require('../models/usuarioModel');


function salvar(req, res) {
  const imagem = req.file.filename;

  const {nome, email} = req.body

  const usuario = { nome, email, imagem }
  
  usuarioModel.salvar(usuario)
  .then(resultado => {
    res.status(201).send("Usuario criado com sucesso");
  }).catch(err => {
    res.status(500).send(err);
  });
}

function buscarUsuarioPeloId(req, res) {
  console.log(req.params.id);
  usuarioModel.buscarUsuarioPeloId(req.params.id)
  .then(resultado => {
    res.json(resultado);
  }).catch(err => {
    res.status(500).send(err);
  });
}

module.exports = { salvar, buscarUsuarioPeloId }