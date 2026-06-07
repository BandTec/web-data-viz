// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../../../index.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

async function adicionarNomeEmpresa() {
    const nomeEmpresa = await fetch(`/empresas/buscarPorUsuario/${sessionStorage.ID_USUARIO}`).then(res => res.json()).catch(erro => console.log(erro))
    const nomeUsuario = sessionStorage.NOME_USUARIO;
    const nomeArray = nomeUsuario.split(" ")

    if (nomeArray.length > 1){
        siglaNome.innerHTML = `${nomeArray[0][0]}${nomeArray[1][0]}`;
    }else if(nomeArray.length == 1){
        siglaNome.innerHTML = `${nomeArray[0][0]}`;
    }
    nomeEmpresaId.innerHTML = `${nomeEmpresa[0].nome_empresa}`;
    nomeUsuarioId.innerHTML = `${nomeUsuario}`;
    nomeUsuarioHome.innerHTML = `Bem vindo, ${nomeUsuario}!`;
}

