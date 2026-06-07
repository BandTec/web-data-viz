var composteiraModel = require("../models/composteiraModel");

// function selecionarPorIdController(req, res){
//     let id = req.params.id;

//     if (id == undefined){
//         res.status(400).send("Id undefined")
//         return;
//     }
//     composteiraModel.selecionarPorId(id).then((resultado) => {
//         res.json(resultado);
//     }).catch((erro) => {
//         console.log(erro)
//         console.log(erro.sqlMessage)
//     })
// }

// function atualizarComposteiraController(req, res){
//     let id = req.body.idServer;
//     let descricao = req.body.descricaoServer;
//     let capacidade = req.body.capacidadeServer;

    

//     if (id == undefined){
//         res.status(400).send("Id undefined")
//         return; 
//     } 
//     if (descricao == undefined && capacidade == undefined){
//         res.status(400).send("descrição e capacidade undefined")
//         return
//     }

//     if (descricao == undefined){
//         descricao = false;
//     }else if(capacidade == undefined){
//         capacidade = false;
//     }

//     console.log(descricao, capacidade, "aaaaaaaaaaabbbbbbbbb")

//     composteiraModel.atualizarComposteira(descricao, capacidade, id).then((resposta) => {
//         res.json("Composteira atualizada com sucesso")
        
//     }).catch((erro) => {
//         console.log(erro)
//         console.log(erro.sqlMessage)
//     })

// }

// function criarComposteiraController(req, res){
//     let idUser = req.body.idServer;
//     let modelo = req.body.modeloServer;
//     let descricao = req.body.descricaoServer;
//     let capacidade = req.body.capacidadeServer;

    

//     if (idUser == undefined){
//         res.status(400).send("Id undefined")
//         return; 
//     }else if (modelo == undefined){
//         res.status(400).send("Modelo undefined")
//         return; 
//     }else if (descricao == undefined){
//         res.status(400).send("descricao undefined")
//         return; 
//     }else if (capacidade == undefined){
//         res.status(400).send("capacidade undefined")
//         return; 
//     }

//     composteiraModel.criarComposteira(idUser,modelo,descricao, capacidade).then((resposta) => {
//         res.json("Composteira criada com sucesso")
//         console.log("Composteira criada com sucesso")
//     }).catch((erro) => {
//         console.log(erro)
//         console.log(erro.sqlMessage)
//     })

// }

// function deletarComposteiraController(req, res){
//     let id = req.body.idServer;

//     if (id == undefined){
//         res.status(400).send("Id undefined")
//         return; 
//     }

//        composteiraModel.deletarComposteira(id).then((resposta) => {
//         res.json("Composteira deletada")
//         console.log("Composteira deletada")
//     }).catch((erro) => {
//         console.log(erro)
//         console.log(erro.sqlMessage)
//     })
// }



function buscarPorIdComposteira(req, res){
  var id = req.params.id
  console.log('to no controller')
  composteiraModel.buscarPorIdComposteira(id).then((resultado)=> {
    res.status(200).json(resultado)
  })
}

function desativarComposteira(req, res){
  var id=req.params.id
  console.log('cheguei no controller (deletar)')
  composteiraModel.desativarComposteira(id).then((resultado)=> {
    res.status(200).json(resultado)
  })
}

function cadastrarComposteira(req, res) {
    const modelo = req.body.modelo;
    const descricao = req.body.descricao;
    const capacidade = req.body.capacidade_kg;
    const produtor_id = req.body.produtor_id;

    if (modelo == undefined || capacidade == undefined || produtor_id == undefined) {
        res.status(400).send("Tá faltando coisa");
    } else {
        composteiraModel.cadastrarComposteira(modelo, descricao, capacidade, produtor_id)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function alterarDados(req, res){
    const modelo = req.body.modelo;
    const descricao = req.body.descricao;
    const capacidade = req.body.capacidade;
    const id=req.body.id

    if (modelo == undefined || capacidade == undefined || descricao == undefined || id == undefined) {
        res.status(400).send("Tá faltando coisa");
    } else {
      composteiraModel.alterarDados(modelo, descricao, capacidade, id)
      .then(function(resultado){
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
}
}



module.exports = {
    buscarPorIdComposteira,
    desativarComposteira,
    cadastrarComposteira,
    alterarDados
}