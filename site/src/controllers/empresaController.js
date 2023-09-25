/**
 * Importa as dependências da empresaController
 */
var empresaModel = require("../models/empresaModel");

/**
 * Função que busca uma empresa pelo cnpj
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function buscarPorCnpj(req, res) {
  // Variáveis criadas através das informações recebidas do cliente.
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

/**
 * Lista todas as empresas cadastradas
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}


/**
 * Busca uma empresa pelo id
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function buscarPorId(req, res) {
  // Variáveis criadas através das informações recebidas do cliente.
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

/**
 * Cadastra uma empresa no banco de dados
 * @param {*} req 
 * @param {*} res 
 */
function cadastrar(req, res) {
  // Variáveis criadas através das informações recebidas do cliente
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

// Exportando as funções de empresa
module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
