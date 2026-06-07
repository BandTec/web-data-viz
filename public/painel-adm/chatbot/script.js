function init () {
  const historic = localStorage.getItem("chatHistoric")
  if (!historic) 
    localStorage.setItem("chatHistoric", JSON.stringify({ messages: []}))

  adicionarNomeEmpresa()
  const parsedHistoric = JSON.parse(localStorage.getItem("chatHistoric"))
  parsedHistoric.messages.forEach(message => createMessageElement(message))

  const chatElement = document.getElementById("chat")
  chatElement.scrollTo(0, chatElement.scrollHeight)
}

const sendMessage = async () => {
  const buttonElement = document.getElementById('btnSend')
  const messageElement = document.getElementById('inpMessage')
  const userMessage = document.getElementById('inpMessage').value.trim()

  if (!userMessage)
    return alert("Digite uma mensagem")
  
  messageElement.value = ""
  buttonElement.disabled = true

  createMessageElement(userMessage)
  try {
    const response = await fetch("http://localhost:5173/perguntar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pergunta: userMessage })
    })

    const data = await response.json();

    const responseMessage = data.resultado

    createMessageElement(responseMessage)
    saveMessage(userMessage)
    saveMessage(responseMessage)
    
  } catch {
    alert("Algo deu errado. Tente novamente mais tarde.")
  }

  buttonElement.disabled = false
}

const createMessageElement = (message) => {
  const chatElement = document.getElementById("chat")
  
  chatElement.innerHTML += `
   <div class="message">${message}</div>
  `
  
  chatElement.scrollTo(0, chatElement.scrollHeight)
}

const saveMessage = (message) => {
  const parsedHistoric = JSON.parse(localStorage.getItem("chatHistoric"))
  parsedHistoric.messages.push(message)
  localStorage.setItem("chatHistoric", JSON.stringify(parsedHistoric))
}