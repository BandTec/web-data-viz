const composterId = window.location.href.split("=")[1]

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

let tempChart, humChart

// fonte: https://stackoverflow.com/questions/74935293/chartjs-updating-values-in-beforedraw
const temperatureBackgroundZonesPlugin = {
  id: 'temperatureBackgroundZones',
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales } = chart
    const yScale = scales.y

    const { left, right } = chartArea

    ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(30),
      right - left,
      yScale.getPixelForValue(limitParameters.temperature.max) - yScale.getPixelForValue(30)
    )

    ctx.fillStyle = 'rgba(255, 255, 0, 0.1)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(15),
      right - left,
      yScale.getPixelForValue(20) - yScale.getPixelForValue(15)
    )

    ctx.fillStyle = 'rgba(0, 255, 0, 0.1)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(20),
      right - left,
      yScale.getPixelForValue(25) - yScale.getPixelForValue(20)
    )

    ctx.fillStyle = 'rgba(255, 255, 0, 0.1)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(25),
      right - left,
      yScale.getPixelForValue(30) - yScale.getPixelForValue(25)
    )

    ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
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

    ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(90),
      right - left,
      yScale.getPixelForValue(limitParameters.humidity.max) - yScale.getPixelForValue(90)
    )

    ctx.fillStyle = 'rgba(255, 255, 0, 0.1)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(85),
      right - left,
      yScale.getPixelForValue(90) - yScale.getPixelForValue(85)
    )

    ctx.fillStyle = 'rgba(0, 255, 0, 0.1)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(70),
      right - left,
      yScale.getPixelForValue(85) - yScale.getPixelForValue(70)
    )

    ctx.fillStyle = 'rgba(255, 255, 0, 0.1)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(60),
      right - left,
      yScale.getPixelForValue(70) - yScale.getPixelForValue(60)
    )

    ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
    ctx.fillRect(
      left,
      yScale.getPixelForValue(limitParameters.temperature.min),
      right - left,
      yScale.getPixelForValue(60) - yScale.getPixelForValue(limitParameters.humidity.min)
    )

    ctx.restore()
  }
}

function addDefaultValues() {
  const fromDate = document.getElementById("inpFromDate")
  const fromTime = document.getElementById("inpFromTime")
  const toDate = document.getElementById("inpToDate")
  const toTime = document.getElementById("inpToTime")

  const date = new Date()
  const yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000)

  fromDate.value = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1 < 10 ? "0" : ""}${yesterday.getMonth() + 1}-${yesterday.getDate() < 10 ? "0" : ""}${yesterday.getDate()}`
  toDate.value = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}-${date.getDate() < 10 ? "0" : ""}${date.getDate()}`

  fromTime.value = "00:00"
  toTime.value = "23:59"
}

let showInfo = false
function toggleShowInfo() {
  const infoCard = document.getElementById('infoCard')
  showInfo = !showInfo
  infoCard.style.display = showInfo ? 'flex' : 'none'
}

async function getComposter() {
  const apiResponse = await fetch(`/composteira/dashboard/${composterId}`)
  .then(res => res.json())
  .catch(err => console.error(err))
 
  const chartData = await fetch(`/composteira/grafico/${composterId}?tipo=hoje`)
  .then(res => res.json())
  .catch(err => console.error(err))
  
  
  console.log(chartData)

  return {
    apiResponse,
    data: {
      time: chartData.hora_registro.reverse(),
      temperature: chartData.temperatura.reverse(),
      humidity: chartData.umidade.reverse(),
    }
  }
}

let key = false
async function load (apiResponse) {
  key = true
  const inputModelo = document.getElementById('composterModel')
  const inputCapacidade = document.getElementById('composterCapacity')
  const inputDescription = document.getElementById('composterDescription')

  inputModelo.value = `${apiResponse.dados.modelo}`
  inputCapacidade.value = `${apiResponse.dados.capacidade_kg}`
  inputDescription.value = `${apiResponse.dados.descricao}`
}

async function loadCharts() {
  const composter = await getComposter();
  const composteiras = await getComposters();

  loadCompostersSidebar(composteiras)
  const { apiResponse } = composter
  console.log(apiResponse.ultimaDeteccao.temperatura, apiResponse.ultimaDeteccao.umidade, apiResponse.indiceSaude, apiResponse.taxaEstabilidade)

  if (!key) load(apiResponse)

  loadKpis({ 
    temperature: apiResponse.ultimaDeteccao.temperatura,
    humidity: apiResponse.ultimaDeteccao.umidade,
    healthIndex: apiResponse.indiceSaude,
    stableIndex: apiResponse.taxaEstabilidade,
  })
  loadAlerts()

  setTimeout(() => loadCharts(), 2000)
}
addDefaultValues()
loadHistoric()

async function getComposters() {
 let dado = await fetch(`/composteira/pegarTodas/${sessionStorage.ID_USUARIO}`).then(res => res.json()).catch(erro => console.log(erro))
  return dado;
}


function loadCompostersSidebar(composters) {
  const composterContainerElement = document.getElementById("composterContainer")

  composterContainerElement.innerHTML = ""
  composters.forEach(composter => {
    composterContainerElement.innerHTML += `
      <div class="item" onclick="window.location.href='./index.html?composteira=${composter.id}'" id='${composter.id}'>
        <i class="ph ph-cube icon"></i>
        <p>${composter.nome}</p>
      </div>
    `
  })
}

// loadCompostersSidebar(composteiras)

const priorities = {
  0: {
    class: "normal",
    word: "normal",
    icon: "info",
    temperature: "dentro da faixa ideal",
    humidity: "dentro da faixa ideal",
    stableIndex: ", ",
    healthIndex: "condições ideais"
  },
  1: {
    class: "moderate",
    word: "moderada",
    icon: "warning-diamond",
    temperature: "levemente fora da faixa ideal",
    humidity: "levemente fora da faixa ideal",
    stableIndex: ", ",
    healthIndex: "sem risco eminente"
  },
  2: {
    class: "danger",
    word: "alta",
    icon: "warning",
    temperature: "fora da faixa ideal",
    humidity: "fora da faixa ideal",
    stableIndex: " apenas ",
    healthIndex: "risco elevado"
  },
  3: {
    class: "urgent",
    word: "urgênte",
    icon: "warning-octagon",
    temperature: "totalmente fora da faixa ideal",
    humidity: "totalmente fora da faixa ideal",
    stableIndex: " apenas ",
    healthIndex: "risco crítico"
  },
}

async function loadAlerts() {
  const alertContainerElement = document.getElementById("alertsContainer")
  const alerts = await fetch(`/alertas/listar-composteira/${composterId}`, {
    method: "GET",
  })
    .then(res => res.json())

  let html = ""

  alerts.forEach(alert => {
    const date = new Date(alert.enviado_em)

    html += `
      <div class="alert ${priorities[alert.prioridade].class}">
        <i class='ph-bold ph-${priorities[alert.prioridade].icon} color-${priorities[alert.prioridade].class}'></i><p class="alert-title">Foi detectado <span class='color-${priorities[alert.prioridade].class}'>${alert.tipo.toLowerCase()}</span> com prioridade <span class='color-${priorities[alert.prioridade].class}'>${priorities[alert.prioridade].word}</span>  nesta composteira, no dia <span>${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}/${date.getFullYear()}</span> às <span>${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}</span>.</p>
      </div>
    `
  })

  alertContainerElement.innerHTML = html
}

async function loadHistoric() {
  const fromDate = document.getElementById("inpFromDate").value
  const fromTime = document.getElementById("inpFromTime").value
  const toDate = document.getElementById("inpToDate").value
  const toTime = document.getElementById("inpToTime").value
  const conteinerElement = document.getElementById("historicContainer")

  if (!fromDate || !fromTime || !toDate || !toTime)
    return alert("Preencha todos os campos para o histórico ser mostrado")

  const query = `dtInicio=${fromDate}&tmpInicio=${fromTime}&dtFim=${toDate}&tmpFim=${toTime}`
  const detections = await fetch(`/composteira/historico/${composterId}?${query}`)
    .then(res => res.json())
    .catch(error => console.error(error))

  let html = conteinerElement.innerHTML.split("</div>")[0] + "</div>"
  if (detections.length === 0)
    return conteinerElement.innerHTML = html + "<div style='text-align: center; padding: 1rem; font-weight: 600'>Sem registros no período</div>"

  detections.forEach(detection => {
    const date = new Date(detection.criado_em)
    const dateFormated = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}:${date.getSeconds() < 10 ? "0" : ""}${date.getSeconds()}`

    let classTempeture = "", classHumidity = ""
    if (detection.temperatura < 20 || detection.temperatura > 25) {
      classTempeture = "error"
    }
    if (detection.umidade < 70 || detection.umidade > 85) {
      classHumidity = "error"
    }

    html += `
      <div class="detection">
        <p class="${classTempeture}">${detection.temperatura}°C</p>
        <p class="${classHumidity}">${detection.umidade}%</p>
        <p>${dateFormated}</p>
      </div>
    `
  })

  conteinerElement.innerHTML = html
}

function loadKpis (data) {
  const { temperature, humidity, healthIndex, stableIndex } = data

  const cardContainerSt = document.getElementById("cardsContainer1")
  const cardContainerNd = document.getElementById("cardsContainer2")

  cardContainerSt.innerHTML = `
    <div class="card" id='healthIndexCard'>
      <h1 class="heading">
        <i class="ph-bold ph-heartbeat icon"></i>Índice de saúde
      </h1>
      <h2 class="${getStatus("healthIndex", healthIndex).class}">${healthIndex}</h2>
      <p class="desc">Indica <span class=""> ${getStatus("healthIndex", healthIndex).healthIndex} </span> para a
        atividade biológica.</p>
    </div>
    <div class="card" id='stableIndexCard'>
      <h1 class="heading">
        <i class="ph-bold ph-clock icon"></i>Tempo dentro da faixa ideal
      </h1>
      <h2 class="${getStatus("stableIndex", stableIndex.taxa).class}">${stableIndex.taxa}%</h2>
      <p class="desc">De <span class="">${stableIndex.total}</span> detecções registradas nas últimas 24 horas${getStatus("stableIndex", stableIndex.taxa).stableIndex}<span class="">${stableIndex.dentro}</span> estão em condições ideais para a atividade biológica.</p>
    </div>
  `
console.log(`${getStatus("stableIndex", stableIndex).stableIndex}`)
  cardContainerNd.innerHTML = `
    <div class="card" id='temperatureCard'>
      <h1 class="heading">
        <i class="ph-bold ph-thermometer icon"></i>Temperatura atual
      </h1>
      <h2 class="${getStatus("temperature", temperature).class}">${temperature}°C</h2>
      <p class="desc">A temperatura da composteira está <span class="">${getStatus("temperature", temperature).temperature}</span> para
        a
        atividade biológica.
      </p>
    </div>
    <div class="card" id='humidityCard'>
      <h1 class="heading">
        <i class="ph-bold ph-drop icon"></i>Umidade atual
      </h1>
      <h2 class="${getStatus("humidity", humidity).class}">${humidity}%</h2>
      <p class="desc">A umidade da composteira está <span class="">${getStatus("humidity", humidity).humidity}</span> para a
        atividade biológica.</p>
    </div>
  `
  console.log(`<h2 class="${getStatus("humidity", humidity).class}">${humidity}%</h2>`)
}

function getStatus (parameter, data) {
  console.log(parameter, data)
  if ((parameter === "temperature") && (Number(data) >= 20 && Number(data) <= 25))
    return priorities[0]
  if ((parameter === "temperature") && (Number(data) > 25 && Number(data) <= 30))
    return priorities[1]
  if ((parameter === "temperature") && (Number(data) >= 15 && Number(data) <= 35))
    return priorities[2]
  if (parameter === "temperature")
    return priorities[3]

  if (parameter === "humidity" && Number(data) >= 70 && Number(data) <= 85)
    return priorities[0]
  if (parameter === "humidity" && Number(data) >= 60 && Number(data) <= 90)
    return priorities[1]
  if (parameter === "humidity")
    return priorities[3]

  if (parameter === "stableIndex" && Number(data) >= 90)
    return priorities[0]
  if (parameter === "stableIndex" && Number(data) >= 60)
    return priorities[1]
  if (parameter === "stableIndex" && Number(data) >= 50)
    return priorities[2]
  if (parameter === "stableIndex")
    return priorities[3]

  if (parameter === "healthIndex" && data === "Saudável")
    return priorities[0]
  if (parameter === "healthIndex" && data === "Sem risco")
    return priorities[1]
  if (parameter === "healthIndex" && data === "Em risco")
    return priorities[2]
  if (parameter === "healthIndex" && data === "Crítico")
    return priorities[3]
}

function resetButtons (type) {
  const buttons = [ 
    document.getElementById('btnHoje'),
    document.getElementById('btnTempoReal'),
    document.getElementById('btnSeteDias'),
    document.getElementById('btnMensal')
  ]

  const btnTypes = {
    'hoje': buttons[0],
    'tempoReal': buttons[1],
    'seteDias': buttons[2],
    'mensal': buttons[3]
  }

  buttons.forEach(btn => console.log(btn))
  buttons.forEach(btn => btn.classList.add("less"))

  btnTypes[type].classList.remove("less")
}

async function changeChart (type) {
  localStorage.setItem("type", type)
  
  resetButtons(type)
  const chartData = await fetch(`/composteira/grafico/${composterId}?tipo=${type}`)
  .then(res => res.json())
  .catch(err => console.error(err))
  console.log(chartData)

  let time = chartData.hora_registro.reverse()
  if (type === "hoje") {
    time = time.map(t => t + "h")
  }

  if (type === "mensal") {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    time = time.map(month => months[month -1])
  }

  if (type === "seteDias") {
    const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    time = time.map(day => {
      const date = new Date(day).getDay()
      return days[date]
    })
  }

  const temperature = chartData.temperatura.reverse()
  const humidity = chartData.umidade.reverse()
  const temperatureChartElement = document.getElementById('compTem')
  const humidityChartElement = document.getElementById('compHum')
  
  if (tempChart) 
    tempChart.destroy()

  if (humChart) 
    humChart.destroy()

  tempChart = new Chart(temperatureChartElement, {
    type: "line",
    data: {
      labels: time,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: temperature,
          borderWidth: 3,
          backgroundColor: '#f87171',
          borderColor: '#7f1d1d',
          tension: 0.4,
          fill: false
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0
      },
      scales: {
        y: {
          min: limitParameters.temperature.min,
          max: limitParameters.temperature.max
        },
      },
    },
    plugins: [temperatureBackgroundZonesPlugin]
  })

  humChart = new Chart(humidityChartElement, {
    type: "line",
    data: {
      labels: time,
      datasets: [
        {
          label: 'Umidade (%)',
          data: humidity,
          borderWidth: 3,
          backgroundColor: '#38bdf8',
          borderColor: '#0c4a6e',
          tension: 0.4,
          fill: false
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0
      },
      scales: {
        y: {
          min: limitParameters.humidity.min,
          max: limitParameters.humidity.max
        }
      },
    },
    plugins: [humidityBackgroundZonesPlugin]
  })

  setTimeout(() => changeChart(localStorage.getItem("type")), 50000)
}

async function alterarDados(){
  let mod = document.getElementById("composterModel").value;
  let desc = document.getElementById("composterDescription").value;
  let cap = document.getElementById("composterCapacity").value;
  let id_composteira = composterId

    if (mod=='' || cap=='' || desc=='') {
        alert("Não pode deixar em branco!");
        window.location.reload()
        return;
    }

    const body = {
      modelo: mod,
      descricao: desc,
      capacidade: cap,
      id: id_composteira
    }

    fetch("/composteira/alterarDadosUsuarioComum", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).then(res => console.log("Resposta do servidor:", res.status))
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  }

changeChart("hoje")