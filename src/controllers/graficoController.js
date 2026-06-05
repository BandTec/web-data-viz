var graficoModel = require("../models/graficoModel");

async function dadosGraficoController(req, res) {
    let id_user = req.params.id
    let idComposteiras = []
    let nomeComposteiras = []
    let horaComposteira = []
    let temperaturaComposteira = []
    let umidadeComposteira = []
    let ultimoRegistro = []
    let quantidadeComposteira = 0;
    let taxa = 0;
    let composteiraAlerta = 0;

    if (id_user == undefined) {
        console.log("Id está undefinded")
        res.status(400).json("Id undefined")
        return;
    }


    await graficoModel.pegarComposteirasAlerta(id_user).then(async (respostaComposteiraAlerta) => {
        if (respostaComposteiraAlerta.length > 0) {
            composteiraAlerta = respostaComposteiraAlerta[0].composteira_em_alerta
        } else {
            console.log("não tem alerta")
            throw new Error();
            return
        }
    }).catch((erro) => {

    })

    await graficoModel.pegarTaxaEstabilidade(id_user).then(async (respostaTaxa) => {
        if (respostaTaxa.length > 0) {
            taxa = respostaTaxa[0].quantidade_deteccoes_faixa_ideal
        } else {
            console.log("Taxa não existe")
            throw new Error();
            return
        }
    }).catch((erro) => {
        console.log("Erro ao pegar taxa")
        console.log(erro)
        res.status(400).json("Erro ao pegar a taxa")
    })

    await graficoModel.pegarQuantidadeComposteira(id_user).then(async (respostaQuantidade) => {
        quantidadeComposteira = respostaQuantidade.length
        if (respostaQuantidade.length > 0) {
            await graficoModel.pegarMediaDasMedidasFeitasPorHoraTodasComposteiras(id_user).then(async (respostaMedia) => {
                if (respostaMedia.length > 0) {
                    for (let i = 0; i < respostaMedia.length; i++) {
                        if (!idComposteiras.includes(respostaMedia[i].id_composteira)) {
                            idComposteiras[idComposteiras.length] = respostaMedia[i].id_composteira
                            nomeComposteiras[nomeComposteiras.length] = respostaMedia[i].nome
                        } else {
                            continue
                        }
                    }

                    for (let i = 0; i < idComposteiras.length; i++) {
                        await graficoModel.pegaMediaDasMedidasFeitasPorHoraComposteira(id_user, idComposteiras[i]).then(async (respostaMediaComposteira) => {
                            if (respostaMediaComposteira.length > 0) {
                                let inserirHora = [];
                                let inserirTemperatura = [];
                                let inserirUmidade = [];
                                for (let j = 0; j < respostaMediaComposteira.length; j++) {
                                    inserirHora[inserirHora.length] = respostaMediaComposteira[j].hora_registro
                                    inserirTemperatura[inserirTemperatura.length] = respostaMediaComposteira[j].temperatura
                                    inserirUmidade[inserirUmidade.length] = respostaMediaComposteira[j].umidade
                                }

                                horaComposteira[horaComposteira.length] = inserirHora
                                temperaturaComposteira[temperaturaComposteira.length] = inserirTemperatura
                                umidadeComposteira[umidadeComposteira.length] = inserirUmidade
                            } else {
                                console.log("não tem composteira")
                                throw new Error();
                                return
                            }
                        }).catch((erro) => {
                            console.log(`Erro ao pegar a média da composteira  ${respostaMedia[i].nome}`)
                            console.log(erro)
                            res.status(400).json(`Erro ao pegar a média da composteira ${respostaMedia[i].nome}`)
                        })

                        await graficoModel.pegarUltimoRegistro(id_user, idComposteiras[i]).then(async (respostaUltimoRegistro) => {
                            if (respostaMedia.length > 0) {
                                ultimoRegistro[ultimoRegistro.length] = respostaUltimoRegistro[0]
                            } else {
                                console.log("não tem composteira")
                                throw new Error();
                                return
                            }
                        }).catch((erro) => {
                            console.log(`Erro ao pegar os dados do ultimo dregistro da ${nomeComposteiras[i]}`)
                            console.log(erro)
                            res.status(400).json(`Erro ao pegar os dados do ultimo dregistro da ${nomeComposteiras[i]}`)
                        })
                    }
                } else {
                    console.log("não tem composteira")
                    throw new Error();
                    return
                }
            }).catch((erro) => {
                console.log("Erro ao pegar as médias por hora")
                console.log(erro)
                res.status(400).json("Erro ao pegar as médias por hora")
            })
        } else {
            console.log("não tem composteira")
            throw new Error();
            return
        }
    }).catch((erro) => {
        console.log("Erro ao pegar quantidade de composteiras")
        console.log(erro)
        res.status(400).json("Erro ao pegar a quantidade de composteira")
    })


    // console.log(composteiraAlerta)
    let jsonFront = {
        kpis: {
            qtdComposteira: quantidadeComposteira,
            qntComposteirasAlerta: composteiraAlerta,
            taxaEstabilidade: taxa,
        },
        composteiras: []
    }

    for (let i = 0; i < idComposteiras.length; i++) {
        jsonFront.composteiras[jsonFront.composteiras.length] = {
            id: idComposteiras[i],
            nome: nomeComposteiras[i],
            dados: {
                hora: horaComposteira[i],
                temperatura: temperaturaComposteira[i],
                umidade: umidadeComposteira[i],
                ultimaDeteccao: {
                    hora: ultimoRegistro[i].hora,
                    temperatura: ultimoRegistro[i].registro_temperatura,
                    umidade: ultimoRegistro[i].registro_umidade,
                    estado: ultimoRegistro[i].estado
                }
            }
        }
    }

    res.json(jsonFront)
}


module.exports = {
    dadosGraficoController
};
