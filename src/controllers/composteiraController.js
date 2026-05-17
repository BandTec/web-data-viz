var composteiraModel = require("../models/composteiraModel");

function selecionarPorIdController(req, res){
    let id = req.params.id;

    if (id == undefined){
        res.status(400).send("Id undefined")
        return;
    }
    composteiraModel.selecionarPorId(id).then((resultado) => {
        res.json(resultado);
    }).catch((erro) => {
        console.log(erro)
        console.log(erro.sqlMessage)
    })
}

function atualizarComposteiraController(req, res){
    let id = req.body.idServer;
    let descricao = req.body.descricaoServer;
    let capacidade = req.body.capacidadeServer;

    

    if (id == undefined){
        res.status(400).send("Id undefined")
        return; 
    } 
    if (descricao == undefined && capacidade == undefined){
        res.status(400).send("descrição e capacidade undefined")
        return
    }

    if (descricao == undefined){
        descricao = false;
    }else if(capacidade == undefined){
        capacidade = false;
    }

    console.log(descricao, capacidade, "aaaaaaaaaaabbbbbbbbb")

    composteiraModel.atualizarComposteira(descricao, capacidade, id).then((resposta) => {
        res.json("Composteira atualizada com sucesso")
        
    }).catch((erro) => {
        console.log(erro)
        console.log(erro.sqlMessage)
    })

}

function criarComposteiraController(req, res){
    let idUser = req.body.idServer;
    let modelo = req.body.modeloServer;
    let descricao = req.body.descricaoServer;
    let capacidade = req.body.capacidadeServer;

    

    if (idUser == undefined){
        res.status(400).send("Id undefined")
        return; 
    }else if (modelo == undefined){
        res.status(400).send("Modelo undefined")
        return; 
    }else if (descricao == undefined){
        res.status(400).send("descricao undefined")
        return; 
    }else if (capacidade == undefined){
        res.status(400).send("capacidade undefined")
        return; 
    }

    composteiraModel.criarComposteira(idUser,modelo,descricao, capacidade).then((resposta) => {
        res.json("Composteira criada com sucesso")
        console.log("Composteira criada com sucesso")
    }).catch((erro) => {
        console.log(erro)
        console.log(erro.sqlMessage)
    })

}

function deletarComposteiraController(req, res){
    let id = req.body.idServer;

    if (id == undefined){
        res.status(400).send("Id undefined")
        return; 
    }

       composteiraModel.deletarComposteira(id).then((resposta) => {
        res.json("Composteira deletada")
        console.log("Composteira deletada")
    }).catch((erro) => {
        console.log(erro)
        console.log(erro.sqlMessage)
    })
}

module.exports = {
    selecionarPorIdController,
    criarComposteiraController,
    atualizarComposteiraController,
    deletarComposteiraController
}