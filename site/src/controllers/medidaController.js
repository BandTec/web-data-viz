/**
 * Imports de dependências utilizadas pela medidaController
 */
var medidaModel = require("../models/medidaModel");

/**
 * Retorna as ultimas medidas coletadas do aquario
 * @param {*} req - requisição feita pelo cliente
 * @param {*} res - resposta que será devolvida para o cliente 
 */
function buscarUltimasMedidas(req, res) {

    const LIMITE = 7;

    // Variáveis criadas através das informações recebidas do cliente.
    // Quando utilizamos params o valor é passado na URL. Por exemplo: http://localhost:3000/medidas/ultimas/7
    // Esse valor é capturado através do routes/medidas.js e repassado para o controller.
    var idAquario = req.params.idAquario;

    medidaModel.buscarUltimasMedidas(idAquario, LIMITE).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

/**
 * Metodo que busca a última medida coletada do aquario
 * @param {*} req - requisição feita pelo cliente
 * @param {*} res - resposta que será devolvida para o cliente
 */
function buscarMedidasEmTempoReal(req, res) {

    // Variáveis criadas através das informações recebidas do cliente.
    // Quando utilizamos params o valor é passado na URL. Por exemplo: http://localhost:3000/medidas/ultimas/7
    // Esse valor é capturado através do routes/medidas.js e repassado para o controller.
    var idAquario = req.params.idAquario;

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

/** Exportando as funções de medida
 * @module src/controllers/medidaController
 */
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal

}