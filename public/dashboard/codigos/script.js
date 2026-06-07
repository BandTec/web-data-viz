const id_usuario = sessionStorage.getItem('ID_USUARIO')
async function desativarCodigo(id) {
  try {
    const response = await fetch(`/codigo/desativar/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      carregarCodigos();
    } else {
      console.error("Deu erro dog");
    }
  }
  catch (error) {
    console.error("deu erro bixo:", error);
  }
}
sessionStorage.EMAIL_USUARIO = json[0].email

async function gerarCodigo() {
  const res = await fetch("/codigo/gerar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: id_usuario })
  });

  if (res.ok) {
    carregarCodigos();
  } else {
    console.error("Erro ao cadastrar");
  }
}
async function carregarCodigos() {
  const containerElemento = document.getElementById("containerCards")
  const codigos = await fetch(`/codigo/buscar/${id_usuario}`).then(res => res.json()).catch(err => console.error(err))
  const composteira = await pegarTodasComposteiras()

  loadCompostersSidebar(composteira)
  adicionarNomeEmpresa()
  let html = ""
  codigos.forEach(codigo => {
    console.log(codigo)
    html += `
      <div class="card success">
        <h1 class="heading"> 
          ${codigo.codigo}
          <i class="ph-bold ph-trash icon delete-icon" onclick='desativarCodigo(${codigo.id})'></i>
        </h1>
        
      </div>
    `
  })

  containerElemento.innerHTML = html
  setTimeout(() => carregarCodigos(), 5000)
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

async function pegarTodasComposteiras() {
  let dado = await fetch(`/composteira/pegarTodas/${sessionStorage.ID_USUARIO}`).then(res => res.json()).catch(erro => console.log(erro))
  return dado;
}