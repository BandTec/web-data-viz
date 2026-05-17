let showInfo = false
function toggleShowInfo() {
  const infoCard = document.getElementById('infoCard')
  showInfo = !showInfo
  infoCard.style.display = showInfo ? 'flex' : 'none'
}

function getDetections() {
  const historyData = [
    { compost: "Composteira 1", temperature: 22, humidity: 78, time: "10:50", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 24, humidity: 82, time: "10:45", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 25, humidity: 80, time: "10:40", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 23, humidity: 75, time: "10:35", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 21, humidity: 72, time: "10:30", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 26, humidity: 85, time: "10:25", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 27, humidity: 88, time: "10:20", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 28, humidity: 90, time: "10:15", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 29, humidity: 87, time: "10:10", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 30, humidity: 89, time: "10:05", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 19, humidity: 70, time: "10:00", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 18, humidity: 68, time: "09:55", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 17, humidity: 65, time: "09:50", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 20, humidity: 73, time: "09:45", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 21, humidity: 75, time: "09:40", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 23, humidity: 77, time: "09:35", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 24, humidity: 79, time: "09:30", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 25, humidity: 81, time: "09:25", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 22, humidity: 76, time: "09:20", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 23, humidity: 78, time: "09:15", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 31, humidity: 92, time: "09:10", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 32, humidity: 90, time: "09:05", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 33, humidity: 88, time: "09:00", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 34, humidity: 91, time: "08:55", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 35, humidity: 93, time: "08:50", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 22, humidity: 74, time: "08:45", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 23, humidity: 76, time: "08:40", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 24, humidity: 78, time: "08:35", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 25, humidity: 80, time: "08:30", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 26, humidity: 82, time: "08:25", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 20, humidity: 70, time: "08:20", date: "01/05/2026" },
    { compost: "Composteira 2", temperature: 21, humidity: 72, time: "08:15", date: "01/05/2026" },
    { compost: "Composteira 3", temperature: 22, humidity: 74, time: "08:10", date: "01/05/2026" },
    { compost: "Composteira 1", temperature: 23, humidity: 76, time: "08:05", date: "01/05/2026" },
    { compost: "Composteira 4", temperature: 24, humidity: 78, time: "08:00", date: "01/05/2026" }
  ]

  return historyData
} 

function loadHistory () {
  const compostFilter = selectCompost.value
  const detections = getDetections()  
  output.innerHTML = ""

  for (let i = 0; i < detections.length; i++) {
    const compost = detections[i].compost
    
    if (compost.includes(compostFilter)) {
      output.innerHTML += `
        <div class="item">
          <div class="heading">
            <h1 class="title"><span class="compost">${detections[i].compost}</span> <span class="data">${detections[i].temperature}°C - ${detections[i].humidity}%</span> <span class="date">${detections[i].time} - ${detections[i].date}</span></h1>
          </div>
        </div>
      `
    }
  }
}