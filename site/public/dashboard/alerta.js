function alertar(temperatura, idAquario) {
    var grauDeAviso =''


    var limites = {
        muito_quente: 23,
        quente: 22,
        ideal: 20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'cor-alerta';

    if (temperatura >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirMensagem(temperatura, idAquario, grauDeAviso, grauDeAvisoCor)
        console.log("caiu no 1")
        console.log(grauDeAviso)
    }
    else if (temperatura < limites.muito_quente && temperatura >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirMensagem(temperatura, idAquario, grauDeAviso, grauDeAvisoCor)
        console.log("caiu no 2")
    }
    else if (temperatura < limites.quente && temperatura > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        alerta.innerHTML = ''
        console.log("caiu no 3")
    }
    else if (temperatura <= limites.frio && temperatura > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirMensagem(temperatura, idAquario, grauDeAviso, grauDeAvisoCor)
        console.log("caiu no 4")
    }
    else if (temperatura <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirMensagem(temperatura, idAquario, grauDeAviso, grauDeAvisoCor)
        console.log("caiu no 5")
    }

    var card;

    if (idAquario == 1) {
        temp_aquario_1.innerHTML = temperatura + "°C";
        card = card_1
    } else if (idAquario == 2) {
        temp_aquario_2.innerHTML = temperatura + "°C";
        card = card_2
    } else if (idAquario == 3) {
        temp_aquario_3.innerHTML = temperatura + "°C";
        card = card_3
    } else if (idAquario == 4) {
        temp_aquario_4.innerHTML = temperatura + "°C";
        card = card_4
    }

    // alterando
    card.className = classe_temperatura;
}

function exibirMensagem(temperatura, idAquario, grauDeAviso, grauDeAvisoCor) {
    var mensagem = `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Aquário ${idAquario} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${temperatura}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
    alerta.innerHTML += mensagem
}
