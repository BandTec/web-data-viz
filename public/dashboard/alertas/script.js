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

function loadAlerts () {
  getAlerts()  
}

function getComposters() {
  return {
    kpis: {
      qntComposteiras: 3,
      qntComposteirasAlerta: 1,
      taxaEstabilidade: 54,
    },
    composteiras: [
      {
        id: 1,
        nome: "Composteira 1",
        dados: {
          hora: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00'],
          temperatura: [14, 13, 12, 11, 11.5, 12, 13, 15, 18, 22],
          umidade: [89, 90, 91, 92, 90, 89, 86, 83, 80, 78],
          ultimaDeteccao: {
            horario: "10:45",
            temperatura: 24,
            umidade: 68,
            estado: "Normal"
          }
        }
      },
      {
        id: 2,
        nome: "Composteira 2",
        dados: {
          hora: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00'],
          temperatura: [20, 19.5, 19, 18.5, 18, 18.5, 19, 20, 22, 24],
          umidade: [82, 83, 84, 85, 84, 83, 82, 80, 78, 77],
          ultimaDeteccao: {
            horario: "10:32",
            temperatura: 23,
            umidade: 60,
            estado: "Risco Moderado"
          }
        }
      },
      {
        id: 3,
        nome: "Composteira 3",
        dados: {
          hora: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00'],
          temperatura: [22, 21.5, 21, 20.5, 20, 21, 23, 25, 27, 29],
          umidade: [75, 76, 77, 78, 79, 78, 76, 74, 72, 70],
          ultimaDeteccao: {
            horario: "9:59",
            temperatura: 20,
            umidade: 80,
            estado: "Risco Baixo"
          }
        }
      },
    ]
  }
} 
function loadCompostersSidebar (composters) {
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

loadCompostersSidebar(getComposters().composteiras)


function callGetAlertsFromProdutor() {
  // fetch(`/alertas/listar-produtor/${sessionStorage.ID_USUARIO}`, {
  fetch(`/alertas/listar-produtor/1`, {
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

function loadAlerts() {
  callGetAlertsFromProdutor()
}
