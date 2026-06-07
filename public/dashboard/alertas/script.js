let showInfo = false

function toggleShowInfo() {
  const infoCard = document.getElementById('infoCard')
  showInfo = !showInfo
  infoCard.style.display = showInfo ? 'flex' : 'none'
}


//Função tirada do seguinte link https://stackoverflow.com/questions/19700283/how-can-i-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
// O usuário apresentava dificuldades para converter milisegundo em tempo, mesma que a minha, então para poupar tempo eu decidi apena copiar e colar a solução proposta por outro usuário
//Ela tem algumas modificações
function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(0);
  let minutes = (ms / (1000 * 60)).toFixed(0);
  let hours = (ms / (1000 * 60 * 60)).toFixed(0);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
  if (seconds < 60) return seconds + " Segundo" + (seconds > 1 ? "s" : "");
  else if (minutes < 60) return minutes + " Minuto" + (minutes > 1 ? "s" : "");
  else if (hours < 24) return hours + " Hora" + (hours > 1 ? "s" : "")
  else return days + " Dia" + (days > 1 ? "s" : "")
}

async function getComposters() {
  let dado = await fetch(`/composteira/pegarTodas/${sessionStorage.ID_USUARIO}`).then(res => res.json()).catch(erro => console.log(erro))
  return dado;
}


function loadCompostersSidebar(composters) {
  const composterContainerElement = document.getElementById("composterContainer")

  composterContainerElement.innerHTML = ""
  composters.forEach(composter => {
    composterContainerElement.innerHTML += `
      <div class="item" onclick="window.location.href='../composteira/index.html?composteira=${composter.id}'" id='${composter.id}'>
        <i class="ph ph-cube icon"></i>
        <p>${composter.nome}</p>
      </div>
    `
  })
}

function callGetAlertsFromProdutor() {
  // fetch(`/alertas/listar-produtor/${sessionStorage.ID_USUARIO}`, {
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

async function loadAlerts() {
  callGetAlertsFromProdutor()
  const composteiras  = await getComposters();
  loadCompostersSidebar(composteiras)
  adicionarNomeEmpresa()
}
