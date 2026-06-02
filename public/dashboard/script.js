const limitParameters = {
  temperature: {
    min: 0,
    max: 45,
  },
  humidity: {
    min: 0,
    max: 100
  }
}

const temperatureBackgroundZonesPlugin = {
  id: 'temperatureBackgroundZones',
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales } = chart
    const yScale = scales.y

    const { left, right } = chartArea

    ctx.fillStyle = 'rgba(255, 0, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(30), 
      right - left,
      yScale.getPixelForValue(limitParameters.temperature.max) - yScale.getPixelForValue(30)
    )

    ctx.fillStyle = 'rgba(255, 255, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(15),
      right - left,
      yScale.getPixelForValue(20) - yScale.getPixelForValue(15)
    )

    ctx.fillStyle = 'rgba(0, 255, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(20),
      right - left,
      yScale.getPixelForValue(25) - yScale.getPixelForValue(20)
    )

    ctx.fillStyle = 'rgba(255, 255, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(25),
      right - left,
      yScale.getPixelForValue(30) - yScale.getPixelForValue(25)
    )

    ctx.fillStyle = 'rgba(255, 0, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(limitParameters.temperature.min), 
      right - left,
      yScale.getPixelForValue(15) - yScale.getPixelForValue(limitParameters.temperature.min)
    )
  }
}

const humidityBackgroundZonesPlugin = {
  id: 'humidityBackgroundZones',
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales } = chart
    const yScale = scales.y

    const { left, right } = chartArea

    ctx.save()

    ctx.fillStyle = 'rgba(255, 0, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(90), 
      right - left,
      yScale.getPixelForValue(limitParameters.humidity.max) - yScale.getPixelForValue(90)
    )

    ctx.fillStyle = 'rgba(255, 255, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(85),
      right - left,
      yScale.getPixelForValue(90) - yScale.getPixelForValue(85)
    )

    ctx.fillStyle = 'rgba(0, 255, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(70),
      right - left,
      yScale.getPixelForValue(85) - yScale.getPixelForValue(70)
    )

    ctx.fillStyle = 'rgba(255, 255, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(60),
      right - left,
      yScale.getPixelForValue(70) - yScale.getPixelForValue(60)
    )

    ctx.fillStyle = 'rgba(255, 0, 0, 0.08)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(limitParameters.temperature.min), 
      right - left,
      yScale.getPixelForValue(60) - yScale.getPixelForValue(limitParameters.humidity.min)
    )

    ctx.restore()
  }
}

let showInfo = false
function toggleShowInfo() {
  const infoCard = document.getElementById('infoCard')
  showInfo = !showInfo
  infoCard.style.display = showInfo ? 'flex' : 'none'
}

function loadCharts () {
  const dados = getComposters()
  const { kpis, composteiras } = dados
  loadCompostersSidebar(composteiras)
  loadCompostersSummary(composteiras)
  loadKPIs(kpis)

  new Chart(document.getElementById('chartTemperature'), {
    type: 'line',

    data: {
      labels: composteiras[0].dados.hora,

      datasets: composteiras.map((composteira) => ({
        label: composteira.nome,
        data: composteira.dados.temperatura,
        tension: 0.4,
      }))
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: true,
          text: 'Temperatura das Composteiras',
          align: 'start',
          color: '#0C0C09',
          font: {
            size: 16,
            padding: 12,
            family: '"Poppins", sans-serif'
          }
        }
      },

      scales: {
        y: {
          min: 0,
          max: 45,
          title: {
            display: true,
            text: 'Temperatura (°C)',
          }
        }
      }
    },
    plugins: [temperatureBackgroundZonesPlugin]
  })

  new Chart(document.getElementById('chartHumidity'), {
    type: 'line',

    data: {
      labels: composteiras[0].dados.hora,

      datasets: composteiras.map((composteira) => ({
        label: composteira.nome,
        data: composteira.dados.umidade,
        borderWidth: 3,
        tension: 0.4,
        fill: false
      }))
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Umidade das Composteiras',
          align: 'start',
          color: '#0C0C09',
          font: {
            size: 16,
            padding: 12,
            family: '"Poppins", sans-serif'
          }
        }
      },

      scales: {
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: 'Umidade (%)'
          }
        }
      }
    },
    plugins: [humidityBackgroundZonesPlugin]
  })
}

function loadKPIs (kpis) {
  const activeValueElement = document.getElementById("activeValue")
  const alertValueElement = document.getElementById("alertValue")
  const stableValueElement = document.getElementById("stableValue")

  const activeDescElement = document.getElementById("activeDescription")
  const alertDescElement = document.getElementById("alertDescription")
  const stableDescElement = document.getElementById("stableDescription")

  const descriptionTexts = {
    active: ['<p class="desc" id="activeDescription">', ' caixa(s) de vermicompostagem estão sendo monitoradas.</p>'],
    alert: ['<p class="desc" id="alertDescription">', ' composteira(s) está <span class="warning">fora</span> das condições ideais.</p>'],
    stable: ['<p class="desc" id="stableDescription">Suas composteiras passam <span class="danger">', '% do tempo fora</span> das condições ideais.</p>'],
  }
  const {
    qntComposteiras,
    qntComposteirasAlerta,
    taxaEstabilidade
  } = kpis

  activeValueElement.innerText = qntComposteiras
  alertValueElement.innerText = qntComposteirasAlerta
  stableValueElement.innerText = taxaEstabilidade + "%"

  activeDescElement.innerHTML = descriptionTexts.active[0] + qntComposteiras + descriptionTexts.active[1]
  alertDescElement.innerHTML = descriptionTexts.alert[0] + qntComposteirasAlerta + descriptionTexts.alert[1]
  stableDescElement.innerHTML = descriptionTexts.stable[0] + (100 - taxaEstabilidade) + descriptionTexts.stable[1]
}

function loadCompostersSidebar (composters) {
  const composterContainerElement = document.getElementById("composterContainer")

  composterContainerElement.innerHTML = ""
  composters.forEach(composter => {
    composterContainerElement.innerHTML += `
      <div class="item" onclick="window.location.href='composteira/index.html?composteira=${composter.id}'" id='${composter.id}'>
        <i class="ph ph-cube icon"></i>
        <p>${composter.nome}</p>
      </div>
    `
  })
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

function loadCompostersSummary (composters) {
  const summaryComponent = document.getElementById("composterSummary")

  let html = ""
  composters.forEach(composter => {
    const { temperatura, umidade, estado, horario } = composter.dados.ultimaDeteccao
    html += `
      <div class="composter" id="${composter.id}" onclick="window.location.href='composteira/index.html?composteira=${composter.id}'">
        <p class="${estado.replace(" ", "-").toLowerCase()}">${composter.nome}</p>
        <p>${temperatura}°C</p>
        <p>${umidade}%</p>
        <p>${estado}</p>
        <p>${horario}</p>
      </div>
    `
  })

  summaryComponent.innerHTML += html
}