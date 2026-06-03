var database = require("../database/config")

// function selecionarPorId(id){
//     let instrucaoSql = `SELECT id, modelo, descricao, capacidade_kg FROM composteira WHERE produtor_id = ${id}`

//     return database.executar(instrucaoSql);
// }

// function atualizarComposteira(descricao, capacidade, id){
//     if (descricao && capacidade){
//         let instrucaoSql = `UPDATE composteira SET descricao = "${descricao}", capacidade_kg = ${capacidade}, atualizado_em = NOW() WHERE id = ${id}`;

//         return database.executar(instrucaoSql);
//     } else if (descricao){
//         let instrucaoSql = `UPDATE composteira SET descricao = "${descricao}", atualizado_em = NOW() WHERE id = ${id}`;

//         return database.executar(instrucaoSql);
//     } else if (capacidade){
//         let instrucaoSql = `UPDATE composteira SET capacidade_kg = ${capacidade}, atualizado_em = NOW() WHERE id = ${id}`;

//         return database.executar(instrucaoSql);
//     }
// }

// function criarComposteira(produtor_id, modelo, descricao, capacidade){
//     let instrucaoSql = `INSERT INTO composteira (produtor_id, modelo, descricao, capacidade_kg) VALUES (${produtor_id}, "${modelo}", "${descricao}", ${capacidade})`;

//     return database.executar(instrucaoSql);
// }

// function deletarComposteira(id){
//     let instrucaoSql = `DELETE FROM composteira WHERE id = ${id}`

//     return database.executar(instrucaoSql);
// }


function buscarPorIdComposteira(id){
  var instrucaoSql = `SELECT * FROM composteira WHERE produtor_id=${id} and desativado_em is null order by criado_em desc;`
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


module.exports = {
 buscarPorIdComposteira,
 desativarComposteira,
 cadastrarComposteira,
 alterarDados
};