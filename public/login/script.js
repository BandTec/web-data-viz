function login () {
  const userEmail = (inpEmail.value).trim()
  const userPassword = inpPassword.value

  
  // executa a função de validação, se retornar false, para a execução dessa função (login), já se retornar false, a execução continua 
  if(!fieldValidation(userEmail, userPassword))
    return

  // faz a requisição para a rota de login
  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailServer: userEmail,
      senhaServer: userPassword
    })
  })
  .then((res) => {
    // se o status do retorno da api for ok, ele transforma o retorno em json e armazena os dados contidos no localStorage
    if (res.ok) {
      res.json().then(json => { 
        // sessionStorage.ID_PRODUTOR = json[0].id_produtor
        sessionStorage.EMAIL_USUARIO = json[0].email
        sessionStorage.NOME_USUARIO = json[0].nome
        sessionStorage.ID_USUARIO = json[0].id
        // sessionStorage.COMPOSTEIRAS = JSON.stringify(json.composteiras) // está comentada pois ainda não foi feita essa parte da api
        showPopUp("Login realizado com sucesso, redirecionando para o painel...", true)
        setTimeout(() => { // após 3s, o usuário é redirecionado para a página de dashboard
          window.location = "../dashboard/index.html"
        }, 3000);
      })
    }
    else if (res.status == 403)
      showPopUp("Email e/ou senha incorreta!", false)
    else
      showPopUp("Erro inesperado. Tente novamente mais tarde", false)
  })
  .catch(() => showPopUp("Erro inesperado. Tente novamente mais tarde", false))

}

function fieldValidation (userEmail, userPassword) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/ 
  const outputTag = ["<span class='error'>", "</span>"]

  // elementos de exibição de erros
  const emailErrorElement = errEmail
  const passwordErrorElement = errPassword

  emailErrorElement.innerHTML = ""
  passwordErrorElement.innerHTML = ""

  let errorQnt = 0

  if (!userEmail) {
    emailErrorElement.innerHTML = outputTag[0] + "Preencha o seu email" + outputTag[1]
    errorQnt++
  } else if (!emailRegex.test(userEmail)) { // testa se o email é válido, esta função (test) retorna true ou false
    emailErrorElement.innerHTML = outputTag[0] + "Email inválido" + outputTag[1]
    errorQnt++
  }
  if (!userPassword) {
    passwordErrorElement.innerHTML = outputTag[0] + "Preencha a sua senha" + outputTag[1]
    errorQnt++
  } else if (userPassword.length < 6) {
    passwordErrorElement.innerHTML = outputTag[0] + "A senha deve ter, no mínimo, 6 caracteres" + outputTag[1]
    errorQnt++
  }

  return errorQnt === 0 // se quantidade de erros for igual a 0, retorna true, se for maior, retorna false
}

function showPopUp (message, situation) { // message: string; situation: true ou false (true: pop up de sucesso, false: pop up de erro)
  const outputMessage = `<i class="ph ph-${situation ? 'user-check correct' : 'shield-warning error'}"></i><span class='${situation ? 'correct' : 'error'}'>${message}</span>`

  popUp.innerHTML = outputMessage
  popUp.style.bottom = "1rem" // move o elemento pop up para cima
  setTimeout(() => { // move o elemento pop up para baixo após 3s
    popUp.style.bottom = "-4rem"
  }, 3000);
}