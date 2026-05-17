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

function getComposters() {
  return [
    {
      chartElements: {
        chartTemperature: document.getElementById('compTem1'),
        chartHumidity: document.getElementById('compHum1')
      },
      data: {
        time: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00'],
        temperature: [14, 13, 12, 11, 11.5, 12, 13, 15, 18, 22],
        humidity: [89, 90, 91, 92, 90, 89, 86, 83, 80, 78]
      }
    },
    {
      chartElements: {
        chartTemperature: document.getElementById('compTem2'),
        chartHumidity: document.getElementById('compHum2')
      },
      data: {
        time: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00'],
        temperature: [20, 19.5, 19, 18.5, 18, 18.5, 19, 20, 22, 24],
        humidity: [82, 83, 84, 85, 84, 83, 82, 80, 78, 77]
      }
    },
    {
      chartElements: {
        chartTemperature: document.getElementById('compTem3'),
        chartHumidity: document.getElementById('compHum3')
      },
      data: {
        time: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00'],
        temperature: [22, 21.5, 21, 20.5, 20, 21, 23, 25, 27, 29],
        humidity: [75, 76, 77, 78, 79, 78, 76, 74, 72, 70]
      }
    }
  ]
} 

function loadCharts () {
  const composters = getComposters()

  for (let i = 0; i < composters.length; i++) {
    new Chart(composters[i].chartElements.chartTemperature, {
      type: 'line',
      data: {
        labels: composters[i].data.time,
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: composters[i].data.temperature,
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

    new Chart(composters[i].chartElements.chartHumidity, {
      type: 'line',
      data: {
        labels: composters[i].data.time,
        datasets: [
          {
            label: 'Umidade (%)',
            data: composters[i].data.humidity,
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