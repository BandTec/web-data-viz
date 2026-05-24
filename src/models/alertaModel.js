var database = require("../database/config");

function buscarUltimos50DoProdutor(idProdutor) {
    var instrucaoSql = `
        SELECT 
            a.id as alerta_id,
            a.tipo,
            a.prioridade,
            a.enviado_em,
            c.id as composteira_id,
            c.modelo,
            c.descricao
        FROM alerta a
        INNER JOIN composteira c
        ON a.composteira_id = c.id
        WHERE c.produtor_id = ${idProdutor}
        ORDER BY a.enviado_em DESC limit 50;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimos5DaComposteira(idComposteira) {
    var temperaturaMinima = 20;
    var temperaturaMaxima = 35;
    var umidadeMinima = 40;
    var umidadeMaxima = 70;

    var instrucaoSql = `
      SELECT
			a.id as alerta_id,
            a.tipo,
            a.prioridade,
            a.enviado_em
			FROM alerta a
            JOIN composteira c
            ON a.composteira_id = c.id
            WHERE a.composteira_id = ${idComposteira}
            order by a.enviado_em DESC LIMIT 5;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimos50DoProdutor,
    buscarUltimos5DaComposteira
};
