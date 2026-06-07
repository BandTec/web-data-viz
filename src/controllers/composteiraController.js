var composteiraModel = require("../models/composteiraModel");

function buscarPorIdComposteira(req, res) {
  var id = req.params.id
  console.log('to no controller')
  composteiraModel.buscarPorIdComposteira(id).then((resultado) => {
    res.status(200).json(resultado)
  })
}

function desativarComposteira(req, res) {
  var id = req.params.id
  console.log('cheguei no controller (deletar)')
  composteiraModel.desativarComposteira(id).then((resultado) => {
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

function alterarDados(req, res) {
  const modelo = req.body.modelo;
  const descricao = req.body.descricao;
  const capacidade = req.body.capacidade;
  const id = req.body.id

  if (modelo == undefined || capacidade == undefined || descricao == undefined || id == undefined) {
    res.status(400).send("Tá faltando coisa");
  } else {
    composteiraModel.alterarDados(modelo, descricao, capacidade, id)
      .then(function (resultado) {
        res.status(201).json(resultado);
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

async function buscarDadosDashboard (req, res) {
  const id = req.params.id

  if (!id)
    res.status(400).send("Id está nulo ou undefined")

  const ultimaDeteccao = await composteiraModel.buscarUltimaDeteccao(id)
  const taxaEstabilidade = await composteiraModel.buscarTaxaEstabilidade(id)
  const buscarDadosComposteira = await composteiraModel.buscarDadosComposteira(id)

  console.log(buscarDadosComposteira)
  const response = {
    "dados": buscarDadosComposteira[0],
    "ultimaDeteccao": ultimaDeteccao[0],
    "indiceSaude": "Em risco",
    "taxaEstabilidade": {
      "taxa": taxaEstabilidade[0].tempo,
      "total": taxaEstabilidade[0].qntTotal,
      "dentro": taxaEstabilidade[0].qntDentro
    },
    "grafico": {
      "tempoReal": "",
      "cadaHora": "",
      "quizeDias": "",
      "mensal": "",
    }
  }

  res.status(200).json(response)
}

async function buscarHistorico (req, res) {
  const id = req.params.id
  const { dtInicio, tmpInicio, dtFim, tmpFim } = req.query

  if (!id || !dtInicio || !tmpInicio || !dtFim || !tmpFim) 
    res.status(400).send("Algum dado está nulo ou undefined")

  const historico = await composteiraModel.buscarHistorico(id, dtInicio, tmpInicio, dtFim, tmpFim)

  res.status(200).json(historico)
}

async function buscarDadosAtualizados (req, res) {
  const id = req.params.id
  const { tipo } = req.query

  if (!id || !tipo) 
    res.status(400).send("Algum dado está nulo ou undefined")

  let respostaBD
  if (tipo === "tempoReal")
    respostaBD = await composteiraModel.buscarDadosGraficoTempoReal(id)
  else if (tipo === "hoje")
    respostaBD = await composteiraModel.buscarDadosGraficoHoje(id)
  else if (tipo === "seteDias")
    respostaBD = await composteiraModel.buscarDadosGraficoSeteDias(id)
  else if (tipo === "mensal")
    respostaBD = await composteiraModel.buscarDadosGraficoMensal(id)
  else
    res.status(400).send("Algum dado está nulo ou undefined")

  let temperatura = respostaBD.map(res => res.temperatura)
  let umidade = respostaBD.map(res => res.umidade)
  let hora_registro = respostaBD.map(res => res.hora_registro)
  
  const resposta = {
    temperatura,
    umidade,
    hora_registro
  }
  
  console.log(resposta)

  res.status(200).send(resposta)
  
}

async function buscarTodasComposteirasController(req, res){
  let id = req.params.id;

  if (!id){
    console.log("dado nulo ou inválido")
    res.status(400).json("dado nulo ou inválido")
  }

  let dado = await composteiraModel.buscarTodasComposteiras(id);

  console.log("todas composteiras: ", dado)
  res.status(200).json(dado)
}

module.exports = {
  buscarPorIdComposteira,
  desativarComposteira,
  cadastrarComposteira,
  alterarDados,
  buscarDadosDashboard,
  buscarHistorico,
  buscarDadosAtualizados,
  buscarTodasComposteirasController
}