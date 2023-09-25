var database = require("../database/config")

/**
 * 
 * @param {string} email email fornecido pelo cliente
 * @param {string} senha senha fornecida pelo cliente
 * @returns {*} - Retorna um objeto com os dados do usuário.
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function autenticar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/**
 * 
 * @param {string} nome - Nome fornecido pelo cliente
 * @param {string} email - Email fornecido pelo cliente
 * @param {string} senha - Senha fornecida pelo cliente
 * @returns {*} - Retorna um objeto com os dados do usuário.
 * @throws - Caso apareça Error: connect ECONNREFUSED, verifique suas credenciais de acesso ao banco
 */
function cadastrar(nome, email, senha) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar
};