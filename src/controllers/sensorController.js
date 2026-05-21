var sensorModel = require("../models/sensorModel");

function pegarTodoSensoresController(req, res) {
    let idComposteira = req.params.id;

    if (idComposteira == undefined) {
        res.status().json("id da composteira undefined")
        return console.log("id undefined")
    }

    sensorModel.pegarTodoSensores(idComposteira).then((resposta) => {
        console.log("deu certo: ", resposta)
        res.status(200).json(resposta);
    }).catch((erro) => {
        console.log(erro)
        res.status(400).json("deu erro")
    })
}

function pegarSensorContorller(req, res) {
    let idSensor = req.params.id;

    if (idSensor == undefined) {
        res.status().json("id do sensor undefined")
        return console.log("id undefined")
    }

    sensorModel.pegarSensor(idSensor).then((resposta) => {
        console.log("deu certo: ", resposta)
        res.status(200).json(resposta);
    }).catch((erro) => {
        console.log(erro)
        res.status(400).json("deu erro")
    })
}

function adicionarSensorController(req, res) {
    let idComposteira = req.body.idComposteiraServer;
    let modelo = req.body.modeloServer;

    if (idComposteira == undefined) {
        res.status().json("idComposteira undefined")
        return console.log("idComposteira undefined")
    }else if (modelo == undefined) {
        res.status().json("modelo undefined")
        return console.log("modelo undefined")
    }

    sensorModel.adicionarSensor(idComposteira, modelo).then((resposta) => {
        console.log("deu certo: ", resposta)

        if (resposta.affectedRows > 0 ){
            res.status(200).json(resposta)
            return console.log("deu certo")       
        }else {
            res.status(400).json("Não adicionou")
            return console.log("não deu certo")
        }
    }).catch((erro) => {
        console.log(erro)
        res.status(400).json("deu erro")
    })
}

function atualizarSensorController(req, res){
    let idSensor = req.body.idSensorServer;
    let idComposteira = req.body.idComposteiraServer;
    let modelo = req.body.modeloServer;

    if (idSensor == undefined){
        res.status().json("idSensor undefined")
        return console.log("idSensor undefined")
    }

    if (idComposteira == undefined){
        idComposteira == false;
    }else if (modelo == undefined){
        modelo == false;
    }

    if (idComposteira == undefined && modelo == undefined){
        res.status().json("idSensor undefined")
        return console.log("idSensor undefined")
    }

    sensorModel.atualizarSensor(idSensor, idComposteira, modelo).then((resposta) => {
        console.log("deu certo: ", resposta)

        if (resposta.affectedRows > 0 ){
            res.status(200).json(resposta)
            return console.log("deu certo")       
        }else {
            res.status(400).json("Não atualizou")
            return console.log("não deu certo")
        }
    }).catch((erro) => {
        console.log(erro)
        res.status(400).json("deu erro")
    })

}

function deletarSensorController(req, res){
    let idSensor = req.body.idSensor;

    if (idSensor == undefined){
        res.status().json("id Sensor undefined")
        return console.log("id Sensor undefined")
    }

    sensorModel.deletarSensor(idSensor).then((resposta) => {
        console.log("deu certo: ", resposta)

          if (resposta.affectedRows > 0 ){
            res.status(200).json(resposta)
            return console.log("deu certo")       
        }else {
            res.status(400).json("Não deletou")
            return console.log("não deu certo")
        }
    }).catch((erro) => {
        console.log(erro)
        res.status(400).json("deu erro")
    })
}


module.exports = {
    pegarTodoSensoresController,
    pegarSensorContorller,
    adicionarSensorController,
    atualizarSensorController,
    deletarSensorController
}