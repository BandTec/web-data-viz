var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {

  empresaModel.buscarPorId().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorIdComposteira(req, res){
  var id = req.params.id
  console.log('to no controller')
  empresaModel.buscarPorIdComposteira(id).then((resultado)=> {
    res.status(200).json(resultado)
  })
}

function desativarComposteira(req, res){
  var id=req.params.id
  console.log('cheguei no controller (deletar)')
  empresaModel.desativarComposteira(id).then((resultado)=> {
    res.status(200).json(resultado)
  })
}

function cadastrarComposteira(req, res) {
    const modelo = req.body.modelo;
    const descricao = req.body.descricao;
    const capacidade = req.body.capacidade_kg;
    const produtor_id = req.body.produtor_id;

    if (modelo == undefined || capacidade == undefined || produtor_id == undefined) {
        res.status(400).send("Tá faltando coisa");
    } else {
        empresaModel.cadastrarComposteira(modelo, descricao, capacidade, produtor_id)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function alterarDados(req, res){
    const modelo = req.body.modelo;
    const descricao = req.body.descricao;
    const capacidade = req.body.capacidade;
    const id=req.body.id

    if (modelo == undefined || capacidade == undefined || descricao == undefined || id == undefined) {
        res.status(400).send("Tá faltando coisa");
    } else {
      empresaModel.alterarDados(modelo, descricao, capacidade, id)
      .then(function(resultado){
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
}
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  buscarPorIdComposteira,
  desativarComposteira,
  cadastrarComposteira,
  listar,
  alterarDados
};
