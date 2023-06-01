var database = require("../database/config");

function buscarAquariosPorUsuario(idUsuario) {

  instrucaoSql = `select * from aquario a where fk_usuario = ${idUsuario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idUsuario, descricao) {
  
  instrucaoSql = `insert into (descricao, fk_usuario) aquario values (${descricao}, ${idUsuario})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarAquariosPorUsuario,
  cadastrar
}
