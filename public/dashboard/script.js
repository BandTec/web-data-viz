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

// fonte: https://stackoverflow.com/questions/74935293/chartjs-updating-values-in-beforedraw
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

async function getKpis() {
  let dado = await fetch(`/grafico/mostrarDados/${sessionStorage.ID_USUARIO}`).then(res => res.json()).catch(erro => console.log(erro))
  return dado;
} 

async function loadCharts () {
  const dados = await getKpis();
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
  console.log(kpis, "asdasdsea")
  const {
    qntComposteira,
    qntComposteirasAlerta,
    taxaEstabilidade
  } = kpis

  activeValueElement.innerText = qntComposteira
  alertValueElement.innerText = qntComposteirasAlerta
  stableValueElement.innerText = taxaEstabilidade + "%"

  activeDescElement.innerHTML = descriptionTexts.active[0] + qntComposteira + descriptionTexts.active[1]
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

function loadCompostersSummary (composters) {
  const summaryComponent = document.getElementById("composterSummary")

  let html = ""
  composters.forEach(composter => {
    const { temperatura, umidade, estado, hora } = composter.dados.ultimaDeteccao
    html += `
      <div class="composter" id="${composter.id}" onclick="window.location.href='composteira/index.html?composteira=${composter.id}'">
        <p class="${estado.replace(" ", "-").toLowerCase()}">${composter.nome}</p>
        <p>${temperatura}°C</p>
        <p>${umidade}%</p>
        <p>${estado}</p>
        <p>${hora}</p>
      </div>
    `
  })

  summaryComponent.innerHTML += html
}