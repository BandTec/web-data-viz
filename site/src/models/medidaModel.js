/**
 * Imports de dependências utilizadas pela medidaModel
 */
var database = require("../database/config");

/**
 * 
 * @param {int} idAquario - Id do aquario que será buscado as medidas
 * @param {int} limite_linhas - Quantidade de linhas que serão retornadas
 * @returns {*} - Retorna um objeto com as medidas do aquario
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = '';

    // Teste lógico utilizado para definir qual instrução SQL será executada
    // A instrução que limita os registros retornados é diferente entre os tipos de banco de dados
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/**
 * 
 * @param {int} idAquario - Id do aquario que será buscado as medidas
 * @returns {*} - Retorna um objeto com as medidas do aquario
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = '';

    // Teste lógico utilizado para definir qual instrução SQL será executada
    // A instrução que limita os registros retornados é diferente entre os tipos de banco de dados
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/**
 * Exporta as funções para serem utilizadas em outros módulos
 * @module src/models/medidaModel
 */
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
