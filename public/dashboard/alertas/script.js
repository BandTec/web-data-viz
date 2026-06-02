let showInfo = false

function toggleShowInfo() {
  const infoCard = document.getElementById('infoCard')
  showInfo = !showInfo
  infoCard.style.display = showInfo ? 'flex' : 'none'
}

function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(0);
  let minutes = (ms / (1000 * 60)).toFixed(0);
  let hours = (ms / (1000 * 60 * 60)).toFixed(0);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
  if (seconds < 60) return seconds + " Segundo" + (seconds > 1 ? "s":"");
  else if (minutes < 60) return minutes + " Minuto" + (minutes > 1 ? "s":"");
  else if (hours < 24) return hours + " Hora" + (hours > 1 ? "s":"")
  else return days + " Dia" + (days > 1 ? "s":"")
}



function callGetAlertsFromProdutor() {
  fetch(`/alertas/listar-produtor/${sessionStorage.ID_USUARIO}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) => {
    res.json().then((response) => {
      for (let i = 0; i < response.length; i++) {
        let dataEnviado = new Date(response[i].enviado_em);
        let dataAtual = new Date();
        let diferencaMili = Math.abs(dataAtual.getTime() - dataEnviado.getTime())
        let tempo = msToTime(diferencaMili)

        // let hora = response[i].enviado_em[0] + response[0].enviado_em[1];
        // let minuto = response[i].enviado_em[3] + response[0].enviado_em[4];
        // let segundo = response[i].enviado_em[6] + response[0].enviado_em[7];

        
        
        // let horaAtual = new Date().getHours();
        // console.log(horaAtual, "hora atual")
        // let minutoAtual = new Date().getMinutes();
        // console.log(horaAtual, "hora atual")
        // let segundoAtual = new Date().getSeconds();
        // console.log(horaAtual, "hora atual")

        // let milisegundoAtual = (Number(horaAtual) * 3600000) + (Number(minutoAtual) * 60000) + (Number(segundoAtual) * 1000)
        // let milisegundoAlerta = (Number(hora) * 3_600_000) + (Number(minuto) * 60_000) + (Number(segundo) * 1000);
        // console.log(milisegundoAlerta, "emitido")
        // console.log(milisegundoAtual, "atual")
        // let tempo = msToTime((milisegundoAtual - milisegundoAlerta));
        if (response[i].prioridade == 0) {
          alertaSection.innerHTML += ` 
            <div class="alert normal">
              <div class="heading">
              <i class="ph-bold ph-info icon"></i>
              <h1 class="title"><strong>${response[i].tipo[0].toUpperCase() + response[i].tipo.substring(1)}</strong> na composteira ${response[i].modelo}</h1>
              <p class="date">${tempo} atrás</p>
            </div>
            <p class="desc">
                 ${response[i].descricao}
            </p>
          </div>`

        }
        if (response[i].prioridade == 1) {
          alertaSection.innerHTML += ` 
          <div class="alert moderate">
            <div class="heading">
              <i class="ph-bold ph-warning-diamond icon"></i>
              <h1 class="title"><strong>${response[i].tipo[0].toUpperCase() + response[i].tipo.substring(1)}</strong> na composteira ${response[i].modelo}</h1>
              <p class="date">${tempo} atrás</p>
            </div>
              <p class="desc">
                ${response[i].descricao}
              </p>
          </div>`;

        }
        if (response[i].prioridade == 2) {
          alertaSection.innerHTML += `
          <div class="alert danger">
            <div class="heading">
              <i class="ph-bold ph-warning icon"></i>
              <h1 class="title"><strong>${response[i].tipo[0].toUpperCase() + response[i].tipo.substring(1)}</strong> na composteira ${response[i].modelo} </h1>
              <p class="date">${tempo} atrás</p>
            </div>
            <p class="desc">
             ${response[i].descricao}
            </p>
          </div>`

        }
        if (response[i].prioridade == 3) {
          alertaSection.innerHTML += `
            <div class="alert urgent">
              <div class="heading">
                <i class="ph-bold ph-warning-octagon icon"></i>
                <h1 class="title"><strong>${response[i].tipo[0].toUpperCase() + response[i].tipo.substring(1)}</strong> na composteira ${response[i].modelo} </h1>
                <p class="date">${tempo} atrás</p>
              </div>
              <p class="desc">
                ${response[i].descricao}
              </p>
            </div>`;
        }
      }
    })


  }).catch((erro) => {
    console.log(erro)
  })
}

function loadAlerts() {
  callGetAlertsFromProdutor()
}