var database = require("../database/config");

async function pegarMediaDasMedidasFeitasPorHoraTodasComposteiras(id_usuario) {
    let instrucao = `SELECT * FROM vw_media_por_hora WHERE id_usuario = ${id_usuario} ORDER BY id_composteira ASC`;


    return database.executar(instrucao)
}

async function pegarQuantidadeComposteira(id_usuario) {
    let instrucao = `SELECT id_composteira FROM vw_media_por_hora WHERE id_usuario = ${id_usuario} GROUP BY id_composteira ORDER BY id_composteira ASC`;

    return database.executar(instrucao)
}

async function pegarUltimoRegistro(id_usuario, id_composteira) {
    let instrucao = `
SELECT id_composteira, registro_temperatura, registro_umidade, TIME(data_registro) AS hora, 
                                                            CASE
                                                                WHEN (registro_temperatura < 10 OR registro_umidade <= 60) OR (registro_temperatura >= 35 OR registro_umidade >= 95) THEN "Risco Alto"
                                                                WHEN (registro_temperatura >= 10 AND registro_temperatura <= 15 OR registro_umidade > 60 AND registro_umidade <= 65) OR (registro_temperatura > 30 AND registro_temperatura < 35 OR registro_umidade > 90 AND registro_umidade < 95) THEN "Risco moderado"
                                                                WHEN  (registro_temperatura > 25 AND registro_temperatura <= 30 OR registro_umidade > 65 AND registro_umidade <= 70) OR (registro_temperatura > 15 AND registro_temperatura < 20 OR registro_umidade > 85 AND registro_umidade < 90) THEN "Risco Baixo"
                                                                WHEN (registro_temperatura >= 20 AND registro_temperatura <= 25) AND (registro_umidade > 70 AND registro_umidade <= 85) THEN "Dentro do ideal"
                                                                END AS estado
FROM  vw_grafico
WHERE id_composteira = ${id_composteira} AND id_usuario = ${id_usuario}
ORDER BY data_registro DESC LIMIT 1`;

    return database.executar(instrucao);
}

async function pegaMediaDasMedidasFeitasPorHoraComposteira(id_user, id_composteira) {
    let instrucao = `SELECT * FROM vw_media_por_hora WHERE id_usuario = ${id_user} AND id_composteira = ${id_composteira}`

    return database.executar(instrucao);
}

async function pegarTaxaEstabilidade(id_usuario) {
    let instrucao =
        `
        SELECT TRUNCATE(((
        SELECT COUNT(*)
        FROM vw_grafico
        WHERE DAY(data_registro) = DAY(CURDATE()) AND id_usuario = ${id_usuario} AND registro_temperatura > 19 AND registro_temperatura < 25 AND registro_umidade < 85 AND registro_umidade > 70)/COUNT(*)  ) * 100, 0)  AS quantidade_deteccoes_faixa_ideal FROM vw_grafico WHERE id_usuario = ${id_usuario} AND DAY(data_registro) = DAY(CURDATE())
        `;

    return database.executar(instrucao)
}

async function pegarComposteirasAlerta(id_user) {
    let instrucao = `
    SELECT COUNT(composteira_id) AS composteira_em_alerta FROM vw_ultimos_alertas
    WHERE id_usuario = ${id_user} AND DAY(data_alerta) = DAY(CURDATE()) AND data_alerta > DATE_SUB(NOW(), INTERVAL 4 HOUR);
    `;

    return database.executar(instrucao)
}



module.exports = {
    pegarMediaDasMedidasFeitasPorHoraTodasComposteiras,
    pegarQuantidadeComposteira,
    pegarUltimoRegistro,
    pegaMediaDasMedidasFeitasPorHoraComposteira,
    pegarTaxaEstabilidade,
    pegarComposteirasAlerta
};
