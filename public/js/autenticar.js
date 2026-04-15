function login () {
  const userEmail = (ipt_email.value).trim()
  const userPassword = ipt_password.value
  
  if(!fieldValidation(userEmail, userPassword))
    return

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
    if (res.ok) {
      res.json().then(json => {
        sessionStorage.EMAIL_USUARIO = json.email
        sessionStorage.NOME_USUARIO = json.nome
        sessionStorage.ID_USUARIO = json.id
        // sessionStorage.COMPOSTEIRAS = JSON.stringify(json.composteiras)
        showPopUp("Login realizado com sucesso, redirecionando para o painel...", true)
        setTimeout(() => {
          window.location = "./dashboard/cards.html"
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

  const emailErrorElement = error_email
  const passwordErrorElement = error_password

  emailErrorElement.innerHTML = ""
  passwordErrorElement.innerHTML = ""

  let errorQnt = 0

  if (!userEmail) {
    emailErrorElement.innerHTML = outputTag[0] + "Preencha o seu email" + outputTag[1]
    errorQnt++
  } else if (!emailRegex.test(userEmail)) {
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

  return errorQnt === 0
}

function showPopUp (message, situation) {
  const outputMessage = `<i class="ph ph-${situation ? 'user-check correct' : 'shield-warning error'}"></i><span class='${situation ? 'correct' : 'error'}'>${message}</span>`

  popUp.innerHTML = outputMessage
  popUp.style.bottom = "1rem"
  setTimeout(() => {
    popUp.style.bottom = "-4rem"
  }, 3000);
}