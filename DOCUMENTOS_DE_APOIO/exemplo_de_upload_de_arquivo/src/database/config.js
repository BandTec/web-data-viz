const mysql = require("mysql2");

// CONEXÃO DO MYSQL WORKBENCH (LOCAL)
const mySqlConfig = {
  host: "SEU_SERVIDOR",
  database: "SEU_BANCO_DE_DADOS",
  user: "SEU_USUARIO",
  password: "SUA_SENHA",
}

function executar(instrucao) {
  return new Promise(function (resolve, reject) {
    var conexao = mysql.createConnection(mySqlConfig);
    conexao.connect();
    conexao.query(instrucao, function (erro, resultados) {
      conexao.end();
      if (erro) {
        reject(erro);
      }
      console.log(resultados);
      resolve(resultados);
    });
    conexao.on('error', function (erro) {
      return ("ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage);
    });
  });
}

module.exports = { executar }