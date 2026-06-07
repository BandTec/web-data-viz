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

function buscarSensoresPorComposteira(composteiraId) {
  var instrucaoSql = `SELECT * FROM sensor WHERE composteira_id = ${composteiraId}`;
  return database.executar(instrucaoSql);
}

function buscarSensorAtivoPorComposteira(composteiraId) {
  var instrucaoSql = `SELECT * FROM sensor WHERE composteira_id = ${composteiraId} AND desativado_em IS NULL`;
  return database.executar(instrucaoSql);
}

function desativarSensor(idSensor) {
  var instrucaoSql = `UPDATE sensor SET desativado_em = CURRENT_TIMESTAMP WHERE id = ${idSensor};`
  return database.executar(instrucaoSql)
}

function cadastrarSensor(composteiraId, modelo) {
  var instrucaoSql = `INSERT INTO sensor (composteira_id, modelo_sensor) VALUES (${composteiraId}, '${modelo}');`
  return database.executar(instrucaoSql)
}
function alterarSensor(idSensor, composteiraId, modelo) {
  var instrucaoSql = `UPDATE sensor SET composteira_id='${composteiraId}', modelo_sensor='${modelo}' WHERE id=${idSensor};`
  return database.executar(instrucaoSql)
}

function deletarSensor(idSensor) {
  var instrucaoSql = `DELETE FROM sensor WHERE id = ${idSensor};`
  return database.executar(instrucaoSql)
}


module.exports = {
  buscarSensoresPorComposteira,
  buscarSensorAtivoPorComposteira,
  desativarSensor,
  cadastrarSensor,
  alterarSensor,
  deletarSensor
};

