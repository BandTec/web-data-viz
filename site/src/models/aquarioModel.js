var database = require("../database/config");

function buscarAquariosPorUsuario(idUsuario) {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `select * from aquario a where fk_usuario = ${idUsuario}`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `select * from aquario a where fk_usuario = ${idUsuario}`;
  } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idUsuario, descricao) {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `insert into (descricao, fk_usuario) aquario values (${descricao}, ${idUsuario})`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `insert into (descricao, fk_usuario) aquario values (${descricao}, ${idUsuario})`;
  } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarAquariosPorUsuario,
  cadastrar
}
