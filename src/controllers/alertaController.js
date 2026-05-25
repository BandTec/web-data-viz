var alertaModel = require("../models/alertaModel");

function listarPorComposteira(req, res) {
    var idComposteira = req.params.idComposteira;

    if (idComposteira == undefined) {
        res.status(400).send("O idComposteira está undefined!");
        return;
    }

    alertaModel.buscarUltimos5DaComposteira(idComposteira)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum alerta encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarPorProdutor(req, res) {
    var idProdutor = req.params.idProdutor;

    if (idProdutor == undefined) {
        res.status(400).send("O idProdutor está undefined!");
        return;
    }

    alertaModel.buscarUltimos50DoProdutor(idProdutor)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum alerta encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarPorComposteira,
    listarPorProdutor
};
