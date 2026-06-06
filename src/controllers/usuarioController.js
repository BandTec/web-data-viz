var usuarioModel = require("../models/usuarioModel");
var codigoModel = require("../models/codigoAtivacaoModel")

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.status(200).json(resultadoAutenticar);
                        // res.json({
                        //       id: resultadoAutenticar.id,
                        //       email: resultadoAutenticar.email,
                        //       nome: resultadoAutenticar.nome,
                        //   });

                        // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                        //     .then((resultadoAquarios) => {
                        //         if (resultadoAquarios.length > 0) {
                        //             res.json({
                        //                 id: resultadoAutenticar[0].id,
                        //                 email: resultadoAutenticar[0].email,
                        //                 nome: resultadoAutenticar[0].nome,
                        //                 senha: resultadoAutenticar[0].senha,
                        //                 aquarios: resultadoAquarios
                        //             });
                        //         } else {
                        //             res.status(204).json({ aquarios: [] });
                        //         }
                        //     })
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

async function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var codigoAtivacao = req.body.codigoAtivacaoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (codigoAtivacao == undefined) {
        res.status(400).send("Seu código de ativação a vincular está undefined!");
    } else {
        var fkProdutor = await codigoModel.buscarProdutorPorCodigo(codigoAtivacao) 
        console.log(fkProdutor, "aaaaaaaaa")
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, fkProdutor[0].produtor_id)
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

function cadastrarPerson(req, res){
    var nome = req.body.nomeServer
    var cpf = req.body.cpfServer
    var telefone = req.body.telephoneServer
    var cep = req.body.cepServer
    var number = req.body.numberServer
    var complemento = req.body.complementServer
    var logradouro = req.body.logradouroServer
    var bairro = req.body.bairroServer
    var cidade = req.body.cidadeServer
    var estado = req.body.estadoServer 

        // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("seu CEP está undefined!");
    } else if (number == undefined) {
        res.status(400).send("seu número está undefined!");
    } else if (complemento== undefined) {
        res.status(400).send("seu complemento está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("seu logradouro está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("seu bairro está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("sua cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("seu Estado está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEndereco(cep, number, complemento, logradouro, bairro, cidade, estado)
                .then(function (resultadoEndereco) {
                    var idEnderecoGerado = resultadoEndereco.insertId; //pega o id gerado pelo mysql

                    // cadastramos o produtor passando esse ID
                    return usuarioModel.cadastrarPerson(cpf, nome, idEnderecoGerado);
                })
                .then(function (resultadoProdutor) {
                    res.status(201).json(resultadoProdutor);
                })
                .catch(function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                });
}
}

function cadastrarEmpresa(req, res) {
    var cnpj = req.body.cnpjServer;
    var razao = req.body.razaoServer;
    var fantasia = req.body.fantasiaServer;
    var cep = req.body.cepServer;
    var numero = req.body.numberServer;
    var complemento = req.body.complementServer;
    var logradouro = req.body.logradouroServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;

    // msm função de endereço do de cima
    usuarioModel.cadastrarEndereco(cep, numero, complemento, logradouro, bairro, cidade, estado)
        .then(function (resultadoEndereco) {
            var idEndereco = resultadoEndereco.insertId;
            // aqui muda
            return usuarioModel.cadastrarEmpresa(cnpj, razao, fantasia, idEndereco);
        })
        .then(function (resultado) {
            res.status(201).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}
module.exports = {
    autenticar,
    cadastrar,
    cadastrarPerson,
    cadastrarEmpresa
}