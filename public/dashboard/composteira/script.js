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

let showInfo = false
function toggleShowInfo() {
  const infoCard = document.getElementById('infoCard')
  showInfo = !showInfo
  infoCard.style.display = showInfo ? 'flex' : 'none'
}

function getComposter() {
  return [
    {
      chartElements: {
        chartTemperature: { element: document.getElementById('compTem'), type: 'line' },
        chartHumidity: { element: document.getElementById('compHum'), type: 'line' },
        chartTemperatureTwoWeeks: { element: document.getElementById('twoWeeksCompTem'), type: 'line' },
        chartHumidityTwoWeeks: { element: document.getElementById('twoWeeksCompHum'), type: 'line' },
        chartTemperatureMonths: { element:  document.getElementById('monthsCompTem'), type: 'line' },
        chartHumidityMonths: { element: document.getElementById('monthsCompHum'), type: 'line' }
      },
      data: {
        time: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00'],
        temperature: [14, 13, 12, 11, 11.5, 12, 13, 15, 18, 22],
        humidity: [89, 90, 91, 92, 90, 89, 86, 83, 80, 78],
        chartTemperatureTwoWeeks: [],
        chartHumidityTwoWeeks: [],
        chartTemperatureMonths: [],
        chartHumidityMonths: [],
        chartTemperatureTwoWeeksDates: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', '11/01', '12/01', '13/01', '14/01'],
        chartHumidityTwoWeeksDates: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', '11/01', '12/01', '13/01', '14/01'],
        chartTemperatureTwoWeeksData: [18.5, 19.2, 20.1, 19.8, 21.3, 22.1, 21.5, 20.8, 19.9, 20.5, 21.2, 22.0, 21.8, 20.9],
        chartHumidityTwoWeeksData: [75, 76, 78, 80, 79, 77, 75, 74, 76, 78, 80, 79, 77, 75],
        chartTemperatureMonthsLabels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        chartHumidityMonthsLabels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        chartTemperatureMonthsData: [18.3, 19.5, 20.2, 21.1, 20.8],
        chartHumidityMonthsData: [76.2, 75.8, 77.1, 78.5, 76.9]
      }
    }
  ]
} 

function loadCharts () {
  const composter = getComposter()

  for (let i = 0; i < composter.length; i++) {
    new Chart(composter[i].chartElements.chartTemperature.element, {
      type: composter[i].chartElements.chartTemperature.type,
      data: {
        labels: composter[i].data.time,
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: composter[i].data.temperature,
            borderWidth: 3,
            backgroundColor: '#f87171',
            borderColor: '#7f1d1d'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
          tension: {
            duration: 2000,
            easing: 'easeOutCubic',
            from: 1,
            to: 0,
          }
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
    new Chart(composter[i].chartElements.chartHumidity.element, {
      type: composter[i].chartElements.chartHumidity.type,
      data: {
        labels: composter[i].data.time,
        datasets: [
          {
            label: 'Umidade (%)',
            data: composter[i].data.humidity,
            borderWidth: 3,
            backgroundColor: '#38bdf8',
            borderColor: '#0c4a6e'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
          tension: {
            duration: 2000,
            easing: 'easeOutCubic',
            from: 1,
            to: 0,
          }
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
    new Chart(composter[i].chartElements.chartTemperatureTwoWeeks.element, {
      type: composter[i].chartElements.chartTemperatureTwoWeeks.type,
      data: {
        labels: composter[i].data.chartTemperatureTwoWeeksDates,
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: composter[i].data.chartTemperatureTwoWeeksData,
            borderWidth: 3,
            backgroundColor: '#f87171',
            borderColor: '#7f1d1d'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
          tension: {
            duration: 2000,
            easing: 'easeOutCubic',
            from: 1,
            to: 0,
          }
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
    new Chart(composter[i].chartElements.chartHumidityTwoWeeks.element, {
      type: 'line',
      data: {
        labels: composter[i].data.chartHumidityTwoWeeksDates,
        datasets: [
          {
            label: 'Umidade (%)',
            data: composter[i].data.chartHumidityTwoWeeksData,
            borderWidth: 3,
            backgroundColor: '#38bdf8',
            borderColor: '#0c4a6e'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
          tension: {
            duration: 2000,
            easing: 'easeOutCubic',
            from: 1,
            to: 0,
          }
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
    new Chart(composter[i].chartElements.chartTemperatureMonths.element, {
      type: composter[i].chartElements.chartTemperatureMonths.type,
      data: {
        labels: composter[i].data.chartTemperatureMonthsLabels,
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: composter[i].data.chartTemperatureMonthsData,
            borderWidth: 3,
            backgroundColor: '#f87171',
            borderColor: '#7f1d1d'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
          tension: {
            duration: 2000,
            easing: 'easeOutCubic',
            from: 1,
            to: 0,
          }
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
    new Chart(composter[i].chartElements.chartHumidityMonths.element, {
      type: composter[i].chartElements.chartHumidityMonths.type,
      data: {
        labels: composter[i].data.chartHumidityMonthsLabels,
        datasets: [
          {
            label: 'Umidade (%)',
            data: composter[i].data.chartHumidityMonthsData,
            borderWidth: 3,
            backgroundColor: '#38bdf8',
            borderColor: '#0c4a6e'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
          tension: {
            duration: 2000,
            easing: 'easeOutCubic',
            from: 1,
            to: 0,
          }
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
  }
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
      <div class="item" onclick="window.location.href='./index.html?composteira=${composter.id}'" id='${composter.id}'>
        <i class="ph ph-cube icon"></i>
        <p>${composter.nome}</p>
      </div>
    `
  })
}

loadCompostersSidebar(getComposters().composteiras)