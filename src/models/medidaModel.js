var database = require("../database/config");

function buscarUltimasDeteccoes(idComposteira, limite_linhas) {

    var instrucaoSql = `
        SELECT
            d.temperatura,
            d.umidade,
            d.criado_em AS momento,
            DATE_FORMAT(d.criado_em, '%H:%i:%s') AS momento_grafico
        FROM deteccao d
            INNER JOIN sensor s ON d.sensor_id = s.id
        WHERE s.composteira_id = ${idComposteira}
        ORDER BY d.id DESC LIMIT ${limite_linhas}
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDeteccaoEmTempoReal(idComposteira) {

    var instrucaoSql = `
        SELECT
            d.temperatura,
            d.umidade,
            DATE_FORMAT(d.criado_em, '%H:%i:%s') AS momento_grafico,
            s.composteira_id
        FROM deteccao d
            INNER JOIN sensor s ON d.sensor_id = s.id
        WHERE s.composteira_id = ${idComposteira}
        ORDER BY d.id DESC LIMIT 1
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasDeteccoes,
    buscarDeteccaoEmTempoReal
};