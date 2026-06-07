var medidaModel = require("../models/medidaModel");

function buscarUltimasDeteccoes(req, res) {

    const limite_linhas = 7;

    var idComposteira = req.params.idComposteira;

    console.log(`Recuperando as ultimas ${limite_linhas} detecções`);

    medidaModel.buscarUltimasDeteccoes(idComposteira, limite_linhas)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as últimas detecções.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarDeteccaoEmTempoReal(req, res) {

    var idComposteira = req.params.idComposteira;

    console.log("Recuperando detecção em tempo real");

    medidaModel.buscarDeteccaoEmTempoReal(idComposteira)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a detecção em tempo real.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarUltimasDeteccoes,
    buscarDeteccaoEmTempoReal
};