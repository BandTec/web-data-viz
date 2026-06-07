
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



function pegausuario(){
  return fetch(`/empresas/buscarNomesProdutor`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
}
  )
  .then(data => data.json()
  .then (
    json => json

  ))}


  async function atualizarOptions(){
    const produtoresElemento = document.getElementById('produtores')
    
    
    const dados = await pegausuario()
    
    dados.forEach(dado => {
      produtoresElemento.innerHTML+=`<option value="${dado.id}">${dado.nome}</option>`
    });    
  }

console.log(produtores.value)



function selecionar(){    
  const section = document.getElementById("composter-section");

  if(produtores.value == 0){
    section.classList.add("hidden");
    return; 
  } else {
    section.classList.remove("hidden");
  }

  fetch(`/composteira/buscarPorIdComposteira/${produtores.value}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
  .then(resposta => resposta.json())
  .then(listaDeComposteiras => {
    containerCards.innerHTML = `      
        <div class="card add-form">
              <h1 class="heading">
                  <label for='novoModelo'>Modelo:</label>
                  <input type="text" id="novoModelo">
                  <i class="ph ph-check icon save-btn" onclick="cadastrarNovaComposteira()"></i>
              </h1>
              <label for='novaDescricao'>Descrição da Composteira:</label>
              <input type="text" id="novaDescricao" class="input-desc">
              <label for='novaCapacidade'>Capacidade (kg):</label>
              <input type="number" id="novaCapacidade" class="input-cap">
          </div>
        `

    listaDeComposteiras.forEach(item => {
      containerCards.innerHTML += `
        <div class="card success">
            <h1 class="heading">
              <i class="ph ph-recycle icon"></i>
              <label for='modeloAtual'>Modelo:</label>
              <span><input type="text" id="modeloAtual-${item.id}" value="${item.modelo}" onblur="alterarDados(${item.id})"> ID:</span>
              <p id="idComposteira">${item.id}</p> 
              <i class="ph ph-trash icon delete-icon" onclick="desativarComposteira(${item.id})"></i>
            </h1>
              <label for='descricaoAtual'>Descrição:</label>
            <p class="desc"><input type="text" id="descricaoAtual-${item.id}" value="${item.descricao}" onblur="alterarDados(${item.id})"></p>
            <p class="value">Capacidade: <input type="text" id="capAtual-${item.id}" value="${item.capacidade_kg}" onblur="alterarDados(${item.id})"> kg</p>
        </div>  
      `;
    });
  })
  .catch(erro => console.error("Erro ao buscar:", erro));
}

async function desativarComposteira(id) {
  try {
    const response = await fetch(`/composteira/desativarComposteira/${id}`, {
      method: "PUT" 
    });

    if (response.ok) {
      selecionar(); 
    } else {
      console.error("Deu erro dog");
    }
  }
  catch (error) {
    console.error("deu erro bixo:", error);
  }
}

async function cadastrarNovaComposteira() {
    const modelo = novoModelo.value;
    const descricao = novaDescricao.value;
    const capacidade = novaCapacidade.value;
    const produtor_id = produtores.value; 

    if (modelo=='' || capacidade=='') {
        alert("Modelo e capacidade são necessarios para o cadastro");
        return;
    }

    const body = { 
        modelo: modelo, 
        descricao: descricao, 
        capacidade_kg: capacidade, 
        produtor_id: produtor_id 
    };
    const res = await fetch("/composteira/cadastrarComposteira", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        alert("Composteira cadastrada com sucesso!");
        selecionar(); 
    } else {
        console.error("Erro ao cadastrar");
    }
}


async function alterarDados(indice){
  let mod = document.getElementById("modeloAtual-"+indice).value;
  let desc = document.getElementById("descricaoAtual-"+indice).value;
  let cap = document.getElementById("capAtual-"+indice).value;
  let id_composteira = indice;

    if (mod=='' || cap=='' || desc==''|| id_composteira=='') {
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

    fetch("/composteira/alterarDados", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
  }


  function pegaComposteiras() {
  return fetch(`/composteira/buscarPorIdComposteira/${produtores.value}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
  .then(data => data.json()
  .then(json => json))
}

async function atualizarOptionsSensor() {
  const composteiraElemento = document.getElementById('composteiras')

  const dados = await pegaComposteiras()

  dados.forEach(dado => {
    composteiraElemento.innerHTML += `<option value="${dado.id}">${dado.modelo} — ${dado.descricao}</option>`
  })
}

function selecionarSensor() {
  const section = document.getElementById("sensor-section")

  if (composteiras.value == 0) {
    section.classList.add("hidden")
    return
  } else {
    section.classList.remove("hidden")
  }

  fetch(`/sensor/buscarSensor/${composteiras.value}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
  .then(resposta => resposta.json())
  .then(listaDeSensores => {
    containerCards.innerHTML = `
      <div class="card add-form">
        <h1 class="heading">
          <label for='novoModeloSensor'>Modelo:</label>
          <input type="text" id="novoModeloSensor">
          <i class="ph ph-check icon save-btn" onclick="cadastrarNovoSensor()"></i>
        </h1>
      </div>
    `

listaDeSensores.forEach(item => {
  const desativado = item.desativado_em !== null
  containerCards.innerHTML += `
    <div class="card success ${desativado ? 'disabled' : ''}">
      <h1 class="heading">
        <i class="ph ph-thermometer-simple icon"></i>
        <label for='modeloSensorAtual'>Modelo:</label>
        <P>Composteira ID: ${item.composteira_id}</p>
        <span><input type="text" id="modeloSensorAtual-${item.id}" value="${item.modelo_sensor}" ${desativado ? 'disabled' : `onblur="alterarSensor(${item.id})"`}> ID:</span>
        <p id="idSensor">${item.id}</p>
        ${desativado ? '' : `<i class="ph ph-trash icon delete-icon" onclick="desativarSensor(${item.id})"></i>`}
      </h1>
      ${desativado ? '<p class="sensor-desativado">SENSOR DESATIVADO</p>' : ''}
    </div>
  `
})
  })
  .catch(erro => console.error("Erro ao buscar:", erro))
}

async function desativarSensor(id) {
  try {
    const response = await fetch(`/sensor/desativarSensor/${id}`, {
      method: "PUT"
    })

    if (response.ok) {
      selecionarSensor()
    } else {
      console.error("Deu erro dog")
    }
  }
  catch (error) {
    console.error("deu erro bixo:", error)
  }
}

async function cadastrarNovoSensor() {
  const modelo = novoModeloSensor.value
  const composteira_id = composteiras.value

  if (modelo == '') {
    alert("Modelo é necessário para o cadastro")
    return
  }

  const sensores = await fetch(`/sensor/buscarSensor/${composteira_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
}).then(r => r.json())

  const sensorAtivo = sensores.filter(s => s.desativado_em === null)[0]

  const body = {
    composteira_id: composteira_id,
    modelo_sensor: modelo
  }

  const res = await fetch("/sensor/cadastrarSensor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })

  if (res.ok) {
    alert("Sensor cadastrado com sucesso!")
    selecionarSensor()
  } else {
    console.error("Erro ao cadastrar")
  }
}

async function alterarSensor(indice) {
  let mod = document.getElementById("modeloSensorAtual-" + indice).value
  let composteira_id = composteiras.value

  if (mod == '' || composteira_id == '') {
    alert("Não pode deixar em branco!")
    window.location.reload()
    return
  }

  const body = {
    id: indice,
    composteira_id: composteira_id,
    modelo_sensor: mod
  }

  fetch("/sensor/alterarSensor", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
}

async function deletarSensor(id) {
  try {
    const response = await fetch(`/sensor/deletarSensor/${id}`, {
      method: "DELETE"
    })

    if (response.ok) {
      selecionarSensor()
    } else {
      console.error("Deu erro dog")
    }
  }
  catch (error) {
    console.error("deu erro bixo:", error)
  }
}