var database = require("../database/config")

function buscarPorIdComposteira(id) {
  var instrucaoSql = `SELECT * FROM composteira WHERE produtor_id=${id} and desativado_em is null order by criado_em desc;`
  return database.executar(instrucaoSql);
}

function desativarComposteira(id) {
  var instrucaoSql = `UPDATE composteira SET desativado_em = CURRENT_TIMESTAMP WHERE id = ${id};`
  return database.executar(instrucaoSql)
}

function cadastrarComposteira(modelo, descricao, capacidade, produtor_id) {
  var instrucaoSql = `INSERT INTO composteira (produtor_id, modelo, descricao, capacidade_kg) VALUES (${produtor_id}, '${modelo}', '${descricao}', ${capacidade});`
  return database.executar(instrucaoSql)
}

function alterarDadosUsuarioComum(modelo, descricao, capacidade, id) {
  var instrucaoSql = `UPDATE composteira SET modelo='${modelo}', descricao='${descricao}', capacidade_kg='${capacidade}', atualizado_em=CURRENT_TIMESTAMP WHERE id=${id};`

  return database.executar(instrucaoSql);
}

function alterarDados(modelo, descricao, capacidade, id) {
  var instrucaoSql = `UPDATE composteira SET modelo='${modelo}', descricao='${descricao}', capacidade_kg='${capacidade}', atualizado_em=CURRENT_TIMESTAMP WHERE id=${id};`

  return database.executar(instrucaoSql);
}

function buscarUltimaDeteccao (id, userId) {
  const instrucaoSql = `SELECT round(d.temperatura, 1) as temperatura, round(d.umidade, 1) as umidade, d.criado_em FROM deteccao d JOIN sensor s ON d.sensor_id = s.id JOIN composteira c ON s.composteira_id = c.id WHERE c.id = ${id} ORDER BY d.criado_em DESC LIMIT 1`

  return database.executar(instrucaoSql)
}

function buscarHistorico (id, dtInicio, tmpInicio, dtFim, tmpFim, userId) {
  const instrucaoSql = `SELECT d.temperatura, d.umidade, d.criado_em FROM deteccao d JOIN sensor s ON d.sensor_id = s.id JOIN composteira c ON s.composteira_id = c.id WHERE c.id = ${id} AND d.criado_em BETWEEN '${dtInicio} ${tmpInicio}' AND '${dtFim} ${tmpFim}' ORDER BY d.criado_em DESC LIMIT 100`

  return database.executar(instrucaoSql)
}

function buscarTaxaEstabilidade (id, userId) {
  const instrucaoSql =  `select
  truncate((
      (
      select count(*) 
          from composteira c
      join sensor s on s.composteira_id = c.id
      join deteccao d on d.sensor_id = s.id
      where d.criado_em >= date_sub(current_timestamp(), interval 24 hour)
          and temperatura between 20 and 25
          and umidade between 70 and 85
      and c.id = ${id}
      ) / count(*)) * 100, 1) as tempo,
    count(*) as qntTotal,
    (
      select count(*) 
          from composteira c
      join sensor s on s.composteira_id = c.id
      join deteccao d on d.sensor_id = s.id
      where d.criado_em >= date_sub(current_timestamp(), interval 24 hour)
          and temperatura between 20 and 25
          and umidade between 70 and 85
      and c.id = ${id}
      ) as qntDentro
  from composteira c
  join sensor s on s.composteira_id = c.id
  join deteccao d on d.sensor_id = s.id
  where d.criado_em >= date_sub(current_timestamp(), interval 24 hour)
  and c.id = ${id};`

  return database.executar(instrucaoSql)
}

function buscarDadosComposteira (id, userId) {
  const instrucaoSql = `SELECT modelo, descricao, round(capacidade_kg) as capacidade_kg FROM composteira WHERE id = ${id} and desativado_em is null`
  return database.executar(instrucaoSql);
}

function buscarDadosGraficoTempoReal (id, userId) {
  const instrucaoSql = `select 
	  temperatura,
    umidade,
    time(d.criado_em) hora_registro
    from composteira c
    join sensor s on s.composteira_id = c.id
    join deteccao d on d.sensor_id = s.id
    where c.id = ${id} and c.desativado_em is null
    order by d.criado_em desc
    limit 15; `
  return database.executar(instrucaoSql);
}

function buscarDadosGraficoHoje (id, userId) {
  const instrucaoSql = `select temperatura, umidade, hora_registro from vw_media_por_hora where id_composteira = ${id} order by hora_registro desc`
  return database.executar(instrucaoSql);
}

function buscarDadosGraficoSeteDias (id, userId) {
  const instrucaoSql = `select temperatura, umidade, hora_registro from vw_media_por_dia where id_composteira = ${id} order by hora_registro desc`
  return database.executar(instrucaoSql);
}

function buscarDadosGraficoMensal (id, userId) {
  const instrucaoSql = `select temperatura, umidade, hora_registro from vw_media_por_mes where id_composteira = ${id} order by hora_registro desc`
  return database.executar(instrucaoSql);
}

function buscarTodasComposteiras(id_user){
  let instrucao = `SELECT c.id, c.produtor_id, modelo AS nome, c.descricao, c.capacidade_kg, c.criado_em FROM composteira c JOIN produtor p ON c.produtor_id = p.id JOIN usuario u ON u.produtor_id = p.id WHERE u.id = ${id_user} AND c.desativado_em IS NULL AND p.desativado_em IS NULL AND u.desativado_em IS NULL`;

  return database.executar(instrucao)
}

module.exports = {
  buscarPorIdComposteira,
  desativarComposteira,
  cadastrarComposteira,
  alterarDados,
  alterarDadosUsuarioComum,

  buscarUltimaDeteccao,
  buscarHistorico,
  buscarTaxaEstabilidade,
  buscarDadosComposteira,
  buscarDadosGraficoTempoReal,
  buscarDadosGraficoHoje,
  buscarDadosGraficoSeteDias,
  buscarDadosGraficoMensal,
  buscarTodasComposteiras
};