var database = require("../database/config")

function selecionarPorId(id){
    let instrucaoSql = `SELECT id, modelo, descricao, capacidade_kg FROM composteira WHERE produtor_id = ${id}`

    return database.executar(instrucaoSql);
}

function atualizarComposteira(descricao, capacidade, id){
    if (descricao && capacidade){
        let instrucaoSql = `UPDATE composteira SET descricao = "${descricao}", capacidade_kg = ${capacidade}, atualizado_em = NOW() WHERE id = ${id}`;

        return database.executar(instrucaoSql);
    } else if (descricao){
        let instrucaoSql = `UPDATE composteira SET descricao = "${descricao}", atualizado_em = NOW() WHERE id = ${id}`;

        return database.executar(instrucaoSql);
    } else if (capacidade){
        let instrucaoSql = `UPDATE composteira SET capacidade_kg = ${capacidade}, atualizado_em = NOW() WHERE id = ${id}`;

        return database.executar(instrucaoSql);
    }
}

function criarComposteira(produtor_id, modelo, descricao, capacidade){
    let instrucaoSql = `INSERT INTO composteira (produtor_id, modelo, descricao, capacidade_kg) VALUES (${produtor_id}, "${modelo}", "${descricao}", ${capacidade})`;

    return database.executar(instrucaoSql);
}

function deletarComposteira(id){
    let instrucaoSql = `DELETE FROM composteira WHERE id = ${id}`

    return database.executar(instrucaoSql);
}


module.exports = {
    selecionarPorId,
    criarComposteira,
    atualizarComposteira,
    deletarComposteira
};