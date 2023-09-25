/**
 * Imports de dependências utilizadas pela avisoModel
 */
var aquarioModel = require("../models/aquarioModel");


/**
 * Função que retorna os aquarios do usuario filtrando pelo id do usuario
 * @param {*} req requisicao feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function buscarAquariosPorUsuario(req, res) {
  // Variáveis criadas através das informações recebidas do cliente.
  // Esse valor é capturado através do routes/medidas.js e repassado para o controller.
  var idUsuario = req.params.idUsuario;

  aquarioModel.buscarAquariosPorUsuario(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

/**
 * Função que cadastra um aquario no banco de dados através da model
 * @param {*} req requisicao feita pelo cliente
 * @param {*} res resposta que será devolvida para o cliente
 */
function cadastrar(req, res) {
  // Variáveis criadas através das informações recebidas do cliente
  var descricao = req.body.descricao;
  var idUsuario = req.body.idUsuario;

  // Teste lógico para verificar se as variáveis foram preenchidas
  if (descricao == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else {


    aquarioModel.cadastrar(descricao, idUsuario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Exporta as funções para serem utilizadas em outros módulos
module.exports = {
  buscarAquariosPorUsuario,
  cadastrar
}