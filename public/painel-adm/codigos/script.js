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

async function gerarCodigo() {
  const res = await fetch("/codigo/gerar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({produtorId: 1})
  });

  if (res.ok) {
      carregarCodigos(); 
  } else {
      console.error("Erro ao cadastrar");
  }
}

async function carregarCodigos() {
  const containerElemento = document.getElementById("containerCards")
  const codigos = await fetch('/codigo/buscar/1').then(res => res.json()).catch(err => console.error(err))

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