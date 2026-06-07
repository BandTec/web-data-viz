// function getComposter() {
//   return [
//     {
//       chartElements: {
//         chartTemperature: { element: document.getElementById('compTem'), type: 'line' },
//         chartHumidity: { element: document.getElementById('compHum'), type: 'line' },
//         chartTemperatureTwoWeeks: { element: document.getElementById('twoWeeksCompTem'), type: 'line' },
//         chartHumidityTwoWeeks: { element: document.getElementById('twoWeeksCompHum'), type: 'line' },
//         chartTemperatureMonths: { element: document.getElementById('monthsCompTem'), type: 'line' },
//         chartHumidityMonths: { element: document.getElementById('monthsCompHum'), type: 'line' }
//       },
//       data: {
//         time: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
//         temperature: [14, 13, 12, 11, 11.5, 12, 13, 15, 18, 22],
//         humidity: [89, 90, 91, 92, 90, 89, 86, 83, 80, 78],
//         chartTemperatureTwoWeeks: [],
//         chartHumidityTwoWeeks: [],
//         chartTemperatureMonths: [],
//         chartHumidityMonths: [],
//         chartTemperatureTwoWeeksDates: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', '11/01', '12/01', '13/01', '14/01'],
//         chartHumidityTwoWeeksDates: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', '11/01', '12/01', '13/01', '14/01'],
//         chartTemperatureTwoWeeksData: [18.5, 19.2, 20.1, 19.8, 21.3, 22.1, 21.5, 20.8, 19.9, 20.5, 21.2, 22.0, 21.8, 20.9],
//         chartHumidityTwoWeeksData: [75, 76, 78, 80, 79, 77, 75, 74, 76, 78, 80, 79, 77, 75],
//         chartTemperatureMonthsLabels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
//         chartHumidityMonthsLabels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
//         chartTemperatureMonthsData: [18.3, 19.5, 20.2, 21.1, 20.8],
//         chartHumidityMonthsData: [76.2, 75.8, 77.1, 78.5, 76.9]
//       }
//     }
//   ]
// }

async function getKpis() {
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

async function loadSide(){
  const dado = await getKpis()
  const composteiras = dado
  loadCompostersSidebar(composteiras)
  adicionarNomeEmpresa()
}
