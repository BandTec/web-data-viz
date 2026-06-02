var database = require("../database/config");

function buscarPorId() {
  var instrucaoSql = `SELECT IFNULL(nome, razao_social) as nome, id FROM produtor;`;

  return database.executar(instrucaoSql);
}

function desativarComposteira(id){
var instrucaoSql = `UPDATE composteira SET desativado_em = CURRENT_TIMESTAMP WHERE id = ${id};` 
return database.executar(instrucaoSql)
}


function cadastrarComposteira(modelo, descricao, capacidade, produtor_id){
  var instrucaoSql = `INSERT INTO composteira (produtor_id, modelo, descricao, capacidade_kg) VALUES (${produtor_id}, '${modelo}', '${descricao}', ${capacidade});`
return database.executar(instrucaoSql)
}

function alterarDados(modelo, descricao, capacidade, id){
  var instrucaoSql = `UPDATE composteira SET modelo='${modelo}', descricao='${descricao}', capacidade_kg='${capacidade}', atualizado_em=CURRENT_TIMESTAMP WHERE id=${id};` 

  return database.executar(instrucaoSql);
}


function buscarPorIdComposteira(id){
  
  var instrucaoSql = `SELECT * FROM composteira WHERE produtor_id=${id} and desativado_em is null order by criado_em desc;`
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

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar, buscarPorIdComposteira, desativarComposteira, cadastrarComposteira, alterarDados};
