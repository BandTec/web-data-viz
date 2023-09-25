/**
 * Imports de dependências utilizadas pela usuarioController
 */
var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

/**
 * Função responsável por retornar informações do usuário através de e-mail e senha
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function autenticar(req, res) {
    // Variáveis criadas através das informações recebidas do cliente
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    
    // Teste lógico para verificar se as variáveis foram preenchidas
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {

                    if (resultadoAutenticar.length == 1) {

                        aquarioModel.buscarAquariosPorUsuario(resultadoAutenticar[0].id)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        "id": resultadoAutenticar[0].id,
                                        "email": resultadoAutenticar[0].email,
                                        "nome": resultadoAutenticar[0].nome,
                                        "senha": resultadoAutenticar[0].senha,
                                        "aquarios": resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

/**
 * Função que cadastra um usuário no banco de dados através da model
 * @param {*} req requisição feita pelo cliente
 * @param {*} res resposta que será enviada para o cliente
 */
function cadastrar(req, res) {
    // Variáveis criadas através das informações recebidas do cliente
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Teste lógico para verificar se as variáveis foram preenchidas
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

/** Exportando as funções de usuário
 * @module src/controllers/usuarioController
 */
module.exports = {
    autenticar,
    cadastrar
}