/**
 * Imports de dependências utilizadas pela avisoModel
 */
var database = require("../database/config");

/**
 * Função que lista os avisos cadastrados no banco de dados.
 * @returns {*} - Retorna um objeto com os avisos.
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function listar() {
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


/**
 * Função que pesquisa os avisos filtrados por texto cadastrados no banco de dados.
 * @param {string} texto - Texto fornecido pelo cliente.
 * @returns {*} - Retorna um objeto com os avisos.
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function pesquisarDescricao(texto) {
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/**
 * Função que lista os avisos cadastrados no banco de dados filtrando pelo id do usuario.
 * @param {int} idUsuario - id do usuario que esta cadastrando o aviso 
 * @returns {*} - Retorna um objeto com os avisos do usuario
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function listarPorUsuario(idUsuario) {
    var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/**
 * Publica um aviso no banco de dados associando ao id do usuario.
 * @param {string} titulo 
 * @param {string} descricao 
 * @param {int} idUsuario 
 * @returns - Retorna um objeto com os avisos do usuario
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function publicar(titulo, descricao, idUsuario) {
    var instrucao = `
        INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('${titulo}', '${descricao}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/**
 * 
 * @param {string} novaDescricao 
 * @param {int} idAviso 
 * @returns - Retorna o resultado da edição de um aviso
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function editar(novaDescricao, idAviso) {
    var instrucao = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/**
 * 
 * @param {int} idAviso 
 * @returns - Retorna o resultado da deleção de um aviso
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function deletar(idAviso) {
    var instrucao = `
        DELETE FROM aviso WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar
}
