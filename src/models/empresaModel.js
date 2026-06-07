var database = require("../database/config");

function buscarPorId() { //DEIXA AQUI
  var instrucaoSql = `SELECT IFNULL(nome, razao_social) as nome, id FROM produtor;`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa;`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

function buscarPorUsuario(id) {
  var instrucaoSql = `SELECT p.id as id FROM produtor p JOIN usuario u ON u.produtor_id = p.id WHERE u.id = ${id}`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar, buscarPorUsuario};