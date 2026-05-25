var database = require("../database/config")

function buscarProdutorPorCodigo(codigo){

    var comando = `SELECT produtor_id from codigo_ativacao where codigo = "${codigo}"`

    return database.executar(comando)

}

module.exports = {
    buscarProdutorPorCodigo
}