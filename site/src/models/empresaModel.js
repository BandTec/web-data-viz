/**
 * Imports de dependências utilizadas pela empresaModel
 */
var database = require("../database/config");

/**
 * Busca uma empresa pelo id
 * @param {int} id - Id da empresa que será buscado 
 * @returns {*} - Retorna um objeto com a empresa
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

/**
 * Busca todas as empresas
 * @returns {*} - Retorna um objeto com as empresas
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

/**
 * Busca uma empresa pelo cnpj
 * @param {string} cnpj - Cnpj da empresa que será buscado 
 * @returns Retorna um objeto com a empresa
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

/** 
 * Cadastra uma empresa
 * @param {string} razaoSocial - Razão social da empresa que será cadastrada
 * @param {string} cnpj - Cnpj da empresa que será cadastrada
 * @returns {*} - Retorna um objeto com a empresa cadastrada
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function cadastrar(razaoSocial, cnpj) {
  var query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;

  return database.executar(query);
}

// Exporta as funções para serem utilizadas em outros módulos
module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
