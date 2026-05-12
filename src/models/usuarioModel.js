var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, produtor_id as empresaId FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkProdutor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkProdutor);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, produtor_id) VALUES ('${nome}', '${email}', '${senha}', '${fkProdutor}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEndereco(cep, number, complemento, logradouro, bairro, cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL PARA CADASTRAR PERSON:", cep, number, complemento, logradouro, bairro, cidade, estado);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
var instrucaoSql = `
        INSERT INTO endereco (cep, numero, complemento, logradouro, bairro, cidade, estado) 
        VALUES ('${cep}', ${number}, '${complemento}', '${logradouro}', '${bairro}', '${cidade}', '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function cadastrarPerson(cpf, nome, idEndereco) { 
    console.log("ACESSEI O USUARIO MODEL PARA CADASTRAR PERSON:", cpf, nome, idEndereco);

    var instrucaoSql = `
        INSERT INTO produtor (cpf, nome, endereco_id) VALUES ('${cpf}', '${nome}', ${idEndereco});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function cadastrarEmpresa(cnpj, razao, fantasia, idEndereco) {
    var instrucaoSql = `
        INSERT INTO produtor (cnpj, razao_social, nome_fantasia, endereco_id) 
        VALUES ('${cnpj}', '${razao}', '${fantasia}', ${idEndereco});
    `;
    console.log("Executando SQL Empresa: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarPerson,
    cadastrarEndereco,
    cadastrarEmpresa
};