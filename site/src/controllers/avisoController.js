/**
 * Imports de dependências utilizadas pela avisoModel
 */
var avisoModel = require("../models/avisoModel");

/**
 * Responsável por listar os avisos cadastrados no banco de dados.
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function listar(req, res) {
    avisoModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

/**
 * Listar os avisos cadastrados no banco de dados filtrando pelo id do usuario.
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function listarPorUsuario(req, res) {
    // Variáveis criadas através das informações recebidas do cliente.
    var idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

/**
 * Procurar avisos cadastrados no banco de dados filtrando pela descrição.
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function pesquisarDescricao(req, res) {
    // Variáveis criadas através das informações recebidas do cliente.
    var descricao = req.params.descricao;

    avisoModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
/**
 * Publicar um aviso no banco de dados.
 * @param {*} req 
 * @param {*} res 
 */
function publicar(req, res) {
    // Variáveis criadas através das informações recebidas do cliente.
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var idUsuario = req.params.idUsuario;

    // Teste lógico para verificar se as variáveis foram preenchidas
    if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        avisoModel.publicar(titulo, descricao, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


/**
 * Edita um aviso no banco de dados.
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function editar(req, res) {
    // Variáveis criadas através das informações recebidas do cliente.
    var novaDescricao = req.body.descricao;
    var idAviso = req.params.idAviso;

    avisoModel.editar(novaDescricao, idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

/**
 * Deleta um aviso no banco de dados.
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function deletar(req, res) {
    // Variáveis criadas através das informações recebidas do cliente.
    var idAviso = req.params.idAviso;

    avisoModel.deletar(idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// Exportando as funções de aviso
module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar
}