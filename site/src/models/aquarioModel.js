/**
 * Imports de dependências utilizadas pela aquarioModel
 */
var database = require("../database/config");

/**
 * Retorna os aquarios do usuario filtrando pelo id do usuario
 * @param {int} idUsuario 
 * @returns {*} - Retorna um objeto com os aquarios do usuario
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function buscarAquariosPorUsuario(idUsuario) {

  instrucaoSql = `select * from aquario a where fk_usuario = ${idUsuario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

/**
 * 
 * @param {int} idUsuario - id do usuario que esta cadastrando o aquario 
 * @param {*} descricao - descricao do aquario
 * @returns {*} - Retorna um objeto com os aquarios do usuario
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function cadastrar(idUsuario, descricao) {
  
  instrucaoSql = `insert into (descricao, fk_usuario) aquario values (${descricao}, ${idUsuario})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

/**
 * Exporta as funções para serem utilizadas em outros módulos
 * @module src/models/aviso
 */
module.exports = {
  buscarAquariosPorUsuario,
  cadastrar
}
