function registerUser () {
  const producerCode = (ipt_code.value).trim().toUpperCase()
  const userName = (ipt_username.value).trim()
  const userEmail = (ipt_email.value).trim()
  const userPassword = ipt_password.value
  const userConfirmPassword = ipt_confirm_password.value

  // executa a função de validação, se retornar false, para a execução dessa função (registerUser), já se retornar false, a execução continua 
  if(!fieldValidation(producerCode, userName, userEmail, userPassword, userConfirmPassword))
    return

  // faz a requisição para a rota de cadastro
  fetch ("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nomeServer: userName,
      emailServer: userEmail,
      senhaServer: userPassword,
      idProdutorVincularServer: ""
    })
  })
  .then((res) => {
    if (res.ok) {
      res.json().then(json => {
        showPopUp("Cadastro realizado com sucesso, redirecionando para o login...", true)
        setTimeout(() => {
          window.location = "../login/index.html"
        }, 3000);
      })
    }
    else
      showPopUp("Erro inesperado. Tente novamente mais tarde", false)
  })
  .catch(() => showPopUp("Erro inesperado. Tente novamente mais tarde", false))
}

// função para pegar os códigos da api (está incompleto)
function getCode() {
  return ""
}

function codeValidation (producerCode) {
  const letterRegex = /[A-Z]/
  let key = true

  if (producerCode.length != 6) // o código deve ter 6 caracteres
    return !key
  
  for (let i = 0; i < producerCode.length; i++) { // se as posições impares (1, 3, 5) forem números e posições pares (0, 2, 4) forem letras, retorna true
    if (letterRegex.test(producerCode[i]) && i % 2 == 0)
      continue
    else if (!isNaN(producerCode[i]) && i % 2 == 1)
      continue
    else {
      key = false
      break
    }
  }

  return key
}

function fieldValidation (producerCode, userName, userEmail, userPassword, userConfirmPassword) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
  const outputTag = ["<span class='error'>", "</span>"]

  const codeErrorElement = error_code
  const nameErrorElement = error_name
  const emailErrorElement = error_email
  const passwordErrorElement = error_password
  const confirmPasswordErrorElement = error_confirm_password

  // elementos de exibição de erros
  codeErrorElement.innerHTML = ""
  nameErrorElement.innerHTML = ""
  emailErrorElement.innerHTML = ""
  passwordErrorElement.innerHTML = ""
  confirmPasswordErrorElement.innerHTML = ""

  let errorQnt = 0

  if (!userEmail) {
    emailErrorElement.innerHTML = outputTag[0] + "Preencha o seu email" + outputTag[1]
    errorQnt++
  } else if (!emailRegex.test(userEmail)) { // testa se o email é válido, esta função (test) retorna true ou false
    emailErrorElement.innerHTML = outputTag[0] + "Email inválido" + outputTag[1]
    errorQnt++
  }
  if (!producerCode) {
    codeErrorElement.innerHTML = outputTag[0] + "Preencha o código de validação" + outputTag[1]
    errorQnt++
  } else if (!codeValidation(producerCode)) {
    codeErrorElement.innerHTML = outputTag[0] + "Código inválido" + outputTag[1]
    errorQnt++
  }
  if (!userName) {
    nameErrorElement.innerHTML = outputTag[0] + "Preencha o seu nome" + outputTag[1]
    errorQnt++
  } else if (userName.length < 3) {
    nameErrorElement.innerHTML = outputTag[0] + "O nome deve ter, no mínimo, 3 caracteres" + outputTag[1]
    errorQnt++
  }
  if (!userPassword) {
    passwordErrorElement.innerHTML = outputTag[0] + "Preencha a sua senha" + outputTag[1]
    errorQnt++
  } else if (userPassword.length < 6) {
    passwordErrorElement.innerHTML = outputTag[0] + "A senha deve ter, no mínimo, 6 caracteres" + outputTag[1]
    errorQnt++
  }
  if (!userConfirmPassword) {
    confirmPasswordErrorElement.innerHTML = outputTag[0] + "Preencha a confirmação de senha" + outputTag[1]
    errorQnt++
  } else if (userPassword !== userConfirmPassword) {
    passwordErrorElement.innerHTML = outputTag[0] + "As senhas não correspondem" + outputTag[1]
    confirmPasswordErrorElement.innerHTML = outputTag[0] + "As senhas não correspondem" + outputTag[1]
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