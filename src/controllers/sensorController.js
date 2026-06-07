var sensorModel = require("../models/sensorModel");

// function pegarTodoSensoresController(req, res) {
//     let idComposteira = req.params.id;

//     if (idComposteira == undefined) {
//         res.status().json("id da composteira undefined")
//         return console.log("id undefined")
//     }

//     sensorModel.pegarTodoSensores(idComposteira).then((resposta) => {
//         console.log("deu certo: ", resposta)
//         res.status(200).json(resposta);
//     }).catch((erro) => {
//         console.log(erro)
//         res.status(400).json("deu erro")
//     })
// }

// function pegarSensorContorller(req, res) {
//     let idSensor = req.params.id;

//     if (idSensor == undefined) {
//         res.status().json("id do sensor undefined")
//         return console.log("id undefined")
//     }

//     sensorModel.pegarSensor(idSensor).then((resposta) => {
//         console.log("deu certo: ", resposta)
//         res.status(200).json(resposta);
//     }).catch((erro) => {
//         console.log(erro)
//         res.status(400).json("deu erro")
//     })
// }

// function adicionarSensorController(req, res) {
//     let idComposteira = req.body.idComposteiraServer;
//     let modelo = req.body.modeloServer;

//     if (idComposteira == undefined) {
//         res.status().json("idComposteira undefined")
//         return console.log("idComposteira undefined")
//     }else if (modelo == undefined) {
//         res.status().json("modelo undefined")
//         return console.log("modelo undefined")
//     }

//     sensorModel.adicionarSensor(idComposteira, modelo).then((resposta) => {
//         console.log("deu certo: ", resposta)

//         if (resposta.affectedRows > 0 ){
//             res.status(200).json(resposta)
//             return console.log("deu certo")       
//         }else {
//             res.status(400).json("Não adicionou")
//             return console.log("não deu certo")
//         }
//     }).catch((erro) => {
//         console.log(erro)
//         res.status(400).json("deu erro")
//     })
// }

// function atualizarSensorController(req, res){
//     let idSensor = req.body.idSensorServer;
//     let idComposteira = req.body.idComposteiraServer;
//     let modelo = req.body.modeloServer;

//     if (idSensor == undefined){
//         res.status().json("idSensor undefined")
//         return console.log("idSensor undefined")
//     }

//     if (idComposteira == undefined){
//         idComposteira == false;
//     }else if (modelo == undefined){
//         modelo == false;
//     }

//     if (idComposteira == undefined && modelo == undefined){
//         res.status().json("idSensor undefined")
//         return console.log("idSensor undefined")
//     }

//     sensorModel.atualizarSensor(idSensor, idComposteira, modelo).then((resposta) => {
//         console.log("deu certo: ", resposta)

//         if (resposta.affectedRows > 0 ){
//             res.status(200).json(resposta)
//             return console.log("deu certo")       
//         }else {
//             res.status(400).json("Não atualizou")
//             return console.log("não deu certo")
//         }
//     }).catch((erro) => {
//         console.log(erro)
//         res.status(400).json("deu erro")
//     })

// }

// function deletarSensorController(req, res){
//     let idSensor = req.body.idSensor;

//     if (idSensor == undefined){
//         res.status().json("id Sensor undefined")
//         return console.log("id Sensor undefined")
//     }

//     sensorModel.deletarSensor(idSensor).then((resposta) => {
//         console.log("deu certo: ", resposta)

//           if (resposta.affectedRows > 0 ){
//             res.status(200).json(resposta)
//             return console.log("deu certo")       
//         }else {
//             res.status(400).json("Não deletou")
//             return console.log("não deu certo")
//         }
//     }).catch((erro) => {
//         console.log(erro)
//         res.status(400).json("deu erro")
//     })
// }

function buscarSensorPorId(req, res){
  var id = req.params.id
  console.log('to no controller (buscar sensor)')
  sensorModel.buscarSensoresPorComposteira(id).then(function(resultado){
    res.status(200).json(resultado)
  })
}
function desativarSensor(req, res) {
  var id = req.params.id
  console.log('to no controller (desativar sensor)')
  sensorModel.desativarSensor(id).then(function (resultado) {
    res.status(200).json(resultado)
  }).catch(function (erro) {
    res.status(500).json(erro.sqlMessage)
  })
}

function cadastrarSensor(req, res) {
  const composteiraId = req.body.composteira_id
  const modelo = req.body.modelo_sensor

  if (composteiraId == undefined || modelo == undefined) {
    res.status(400).send("404 dog")
  } else {
    sensorModel.buscarSensorAtivoPorComposteira(composteiraId)
      .then(function (sensoresAtivos) {
        if (sensoresAtivos.length > 0) {
          return sensorModel.desativarSensor(sensoresAtivos[0].id)
        }
        return Promise.resolve()
      })
      .then(function () {
        return sensorModel.cadastrarSensor(composteiraId, modelo)
      })
      .then(function (resultado) {
        res.status(201).json(resultado)
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
      })
  }
}

function alterarSensor(req, res) {
  const id = req.body.id
  const composteiraId = req.body.composteira_id
  const modelo = req.body.modelo_sensor

  if (id == undefined || composteiraId == undefined || modelo == undefined) {
    res.status(400).send("Tá faltando coisa")
  } else {
    sensorModel.alterarSensor(id, composteiraId, modelo)
      .then(function (resultado) {
        res.status(201).json(resultado)
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
      })
  }
}

function deletarSensor(req, res) {
  var id = req.params.id
  sensorModel.deletarSensor(id).then((resultado) => {
    res.status(200).json(resultado)
  }).catch((erro) => {
    res.status(500).json(erro.sqlMessage)
  })
}


module.exports = {
  buscarSensorPorId,
  desativarSensor,
  cadastrarSensor,
  alterarSensor,
  deletarSensor
}