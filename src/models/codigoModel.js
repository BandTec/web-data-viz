const database = require("../database/config")

function gerarCodigo (produtorId, codigo) {
  const instrucaoSql = `insert into codigo_ativacao (produtor_id, codigo) value ('${produtorId}', '${codigo}')`

  return database.executar(instrucaoSql)
}

function buscarCodigos (userId) {
  const instrucaoSql = `select c.id, codigo from codigo_ativacao c join produtor p on c.produtor_id = p.id join usuario u on u.produtor_id = p.id where p.id = 1 and u.id = ${userId} and c.desativado_em is null`

  return database.executar(instrucaoSql)
}

function desativarCodigo (id) {
  const instrucaoSql = `update codigo_ativacao set desativado_em = current_timestamp() where id = ${id}`

  return database.executar(instrucaoSql)
}

function buscarProdutorPorCodigo(codigo){

    var comando = `SELECT produtor_id, id from codigo_ativacao where codigo = "${codigo}" and desativado_em is null`

    return database.executar(comando)

}

function buscarProdutorPorIdCodigo(id){

    var comando = `SELECT codigo from codigo_ativacao where id = ${id} and desativado_em is null`

    return database.executar(comando)

}

module.exports = {
  gerarCodigo,
  buscarCodigos,
  desativarCodigo,
  buscarProdutorPorCodigo,
  buscarProdutorPorIdCodigo
}
