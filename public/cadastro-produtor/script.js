function registerPerson () {
   const producerCode = (inpCode.value).trim().toUpperCase()
   const userName = (inpName_CPF.value).trim()
   const userCPF = inpCpf.value
   const userTelephone = inpTelefone_CPF.value
   const userCEP = inpCEP_CPF.value
   const userNumber = inpNumero_CPF.value
   const userComplement = inpComplemento_CPF.value
   const userLogradouro = inpLogradouro_CPF.value
   const userBairro = inpBairro_CPF.value
   const userCidade = inpCidade_CPF.value
   const userEstado = inpEstado_CPF.value

  

   // executa a função de validação, se retornar false, para a execução dessa função (registerUser), já se retornar false, a execução continua 
   if(!fieldValidationPerson(producerCode, userName, userCPF, userTelephone, userCEP, userNumber, userComplement, userLogradouro, userBairro, userCidade, userEstado))
     return

   // faz a requisição para a rota de cadastro
   fetch ("/usuarios/cadastrarPerson", {
     method: "POST",
     headers: {
        "Content-Type": "application/json"
     },
     body: JSON.stringify({
        nomeServer: userName,
        cpfServer: userCPF,
        telephoneServer: userTelephone,
        cepServer: userCEP,
        numberServer: userNumber,
        complementServer: userComplement,
        logradouroServer: userLogradouro,
        bairroServer: userBairro,
        cidadeServer: userCidade,
        estadoServer: userEstado
        
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
function registerCompany() {
  const producerCode = (inpCode_CNPJ.value).trim().toUpperCase()
  const userCNPJ = inpCnpj.value
  const razaoSocial = (inpRazaoSocial_CNPJ.value).trim()
  const nomeFantasia = (inpNomeFantasia_CNPJ.value).trim()
  const userTelephone = inpTelefone_CNPJ.value
  const userCEP = inpCEP_CNPJ.value
  const userNumber = inpNumero_CNPJ.value
  const userComplement = inpComplemento_CNPJ.value
  const userLogradouro = inpLogradouro_CNPJ.value
  const userBairro = inpBairro_CNPJ.value
  const userCidade = inpCidade_CNPJ.value
  const userEstado = inpEstado_CNPJ.value

     if(!fieldValidationCompany(producerCode, userCNPJ, razaoSocial, nomeFantasia, userTelephone, userCEP, userNumber, userComplement, userLogradouro, userBairro, userCidade, userEstado))
     return

   // faz a requisição para a rota de cadastro
   fetch ("/usuarios/cadastrarEmpresa", {
     method: "POST",
     headers: {
        "Content-Type": "application/json"
     },
     body: JSON.stringify({
            cnpjServer: userCNPJ,
            razaoServer: razaoSocial,
            fantasiaServer: nomeFantasia,
            cepServer: userCEP,
            numberServer: userNumber,
            complementServer: userComplement,
            logradouroServer: userLogradouro,
            bairroServer: userBairro,
            cidadeServer: userCidade,
            estadoServer: userEstado
     })
   })
   .then((res) => {
     if (res.ok) {
        res.json().then(json => {
          showPopUp("Cadastro de empresa realizado com sucesso, redirecionando para o login...", true)
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

function fieldValidationPerson (producerCode, userName, userCPF, userTelephone, userCEP, userNumber, userComplement, userLogradouro, userBairro, userCidade, userEstado) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
  const outputTag = ["<span class='error'>", "</span>"]

  const CodeErrorElement = errCode_CPF
  const NameErrorElement = errName_CPF
  const CpfErrorElement = errCpf_CPF
  const TelephoneErrorElement = errTel_CPF
  const CepErrorElement = errCep_CPF
  const NumberErrorElement = errNum_CPF
  const ComplementoErrorElement = errCom_CPF
  const LogradouroErrorElement = errLog_CPF
  const BairroErrorElement = errBair_CPF
  const CidadeErrorElement = errCid_CPF
  const EstadoErrorElement = errEst_CPF

  // elementos de exibição de erros
  CodeErrorElement.innerHTML = ""
  NameErrorElement.innerHTML = ""
  CpfErrorElement.innerHTML = ""
  TelephoneErrorElement.innerHTML = ""
  CepErrorElement.innerHTML = ""
  NumberErrorElement.innerHTML = ""
  ComplementoErrorElement.innerHTML = ""
  LogradouroErrorElement.innerHTML = ""
  BairroErrorElement.innerHTML = ""
  CidadeErrorElement.innerHTML = ""
  EstadoErrorElement.innerHTML = ""

  let errorQnt = 0





  if (!producerCode) {
   CodeErrorElement.innerHTML = outputTag[0] + "Preencha o código de validação" + outputTag[1]
   errorQnt++
  } else if (!codeValidation(producerCode)) {
   CodeErrorElement.innerHTML = outputTag[0] + "Código inválido" + outputTag[1]
   errorQnt++
  }
  if (!userName) {
   NameErrorElement.innerHTML = outputTag[0] + "Preencha o seu nome" + outputTag[1]
   errorQnt++
  } else if (userName.length < 3) {
   NameErrorElement.innerHTML = outputTag[0] + "O nome deve ter, no mínimo, 3 caracteres" + outputTag[1]
   errorQnt++
  }
  if (!userCPF) {
   CpfErrorElement.innerHTML = outputTag[0] + "Preencha o seu CPF" + outputTag[1]
   errorQnt++
  } else if (userCPF.length!==11) {
   CpfErrorElement.innerHTML = outputTag[0] + "O CPF deve ter 11 caracteres" + outputTag[1]
   errorQnt++
  }
  if (!userTelephone) {
   TelephoneErrorElement.innerHTML = outputTag[0] + "Preencha com seu número de telefone" + outputTag[1]
   errorQnt++
  } else if (isNaN(Number(userTelephone))) {
   TelephoneErrorElement.innerHTML = outputTag[0] + "Telefone não pode conter letras" + outputTag[1]
   errorQnt++
  }
  if(!userCEP){
   CepErrorElement.innerHTML= outputTag[0] + "Preencha com seu CEP" + outputTag[1]
     errorQnt++
  } else if (userCEP.length!==8 && userCEP.length!==9){
   CepErrorElement.innerHTML=outputTag[0] + "CEP preenchido incorretamente" + outputTag[1]
     errorQnt++
  }
  if(!userNumber){
   NumberErrorElement.innerHTML=outputTag[0] + "Preencha com seu número" + outputTag[1]
     errorQnt++
  } else if (isNaN(Number(userNumber))){
   NumberErrorElement.innerHTML=outputTag[0] + "Número não pode conter letras" + outputTag[1]
     errorQnt++
  }
  if(!userLogradouro){
   LogradouroErrorElement.innerHTML = outputTag[0] + "Preencha com seu logradouro" + outputTag[1]
     errorQnt++
  }
  if(!userBairro){
   BairroErrorElement.innerHTML = outputTag[0] + "Preencha com seu bairro" + outputTag[1]
     errorQnt++
  } 
  if(!userCidade){
   CidadeErrorElement.innerHTML = outputTag[0] + "Preencha com sua Cidade" + outputTag[1]
     errorQnt++
  }
  if(!userEstado){
   EstadoErrorElement.innerHTML = outputTag[0] + "Preencha com seu Estado" + outputTag[1]
     errorQnt++
  } 
  return errorQnt === 0 // se quantidade de erros for igual a 0, retorna true, se for maior, retorna false
}

function fieldValidationCompany (producerCode, userCNPJ, razaoSocial, nomeFantasia, userTelephone, userCEP, userNumber, userComplement, userLogradouro, userBairro, userCidade, userEstado) {
   const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
   const outputTag = ["<span class='error'>", "</span>"]

   const CodeErrorElement = errCode_CNPJ
   const CnpjErrorElement = errCnpj
   const RazaoErrorElement = errRazaoSocial_CNPJ
   const FantasiaErrorElement = errNomeFantasia_CNPJ
   const TelephoneErrorElement = errTel_CNPJ
   const CepErrorElement = errCep_CNPJ
   const NumberErrorElement = errNum_CNPJ
   const ComplementoErrorElement = errCom_CNPJ
   const LogradouroErrorElement = errLog_CNPJ
   const BairroErrorElement = errBair_CNPJ
   const CidadeErrorElement = errCid_CNPJ
   const EstadoErrorElement = errEst_CNPJ

   // elementos de exibição de erros
   CodeErrorElement.innerHTML = ""
   CnpjErrorElement.innerHTML = ""
   RazaoErrorElement.innerHTML = ""
   FantasiaErrorElement.innerHTML = ""
   TelephoneErrorElement.innerHTML = ""
   CepErrorElement.innerHTML = ""
   NumberErrorElement.innerHTML = ""
   ComplementoErrorElement.innerHTML = ""
   LogradouroErrorElement.innerHTML = ""
   BairroErrorElement.innerHTML = ""
   CidadeErrorElement.innerHTML = ""
   EstadoErrorElement.innerHTML = ""
   
   let errorQnt = 0
   console.log(userCEP)


   
   
   if (!producerCode) {
     CodeErrorElement.innerHTML = outputTag[0] + "Preencha o código de validação" + outputTag[1]
     errorQnt++
   } else if (!codeValidation(producerCode)) {
     CodeErrorElement.innerHTML = outputTag[0] + "Código inválido" + outputTag[1]
     errorQnt++
   }
   if (!userCNPJ) {
     CnpjErrorElement.innerHTML = outputTag[0] + "Preencha o CNPJ" + outputTag[1]
     errorQnt++
   } else if (userCNPJ.length !== 17 && userCNPJ.length !== 14 ) {
     CnpjErrorElement.innerHTML = outputTag[0] + "CNPJ inválido" + outputTag[1]
     errorQnt++
    }
    if (!razaoSocial) {
     RazaoErrorElement.innerHTML = outputTag[0] + "Preencha a Razão Social" + outputTag[1]
     errorQnt++
    }
   if (!nomeFantasia) {
     FantasiaErrorElement.innerHTML = outputTag[0] + "Preencha o Nome Fantasia" + outputTag[1]
     errorQnt++
   }
   if (!userTelephone) {
     TelephoneErrorElement.innerHTML = outputTag[0] + "Preencha com seu número de telefone" + outputTag[1]
     errorQnt++
    } 
  if(!userCEP){
   CepErrorElement.innerHTML= outputTag[0] + "Preencha com seu CEP" + outputTag[1]
   errorQnt++
  } else if (userCEP.length!==8 && userCEP.length!==9){
   CepErrorElement.innerHTML=outputTag[0] + "CEP preenchido incorretamente" + outputTag[1]
     errorQnt++
  }
   if(!userNumber){
     NumberErrorElement.innerHTML=outputTag[0] + "Preencha com seu número" + outputTag[1]
    errorQnt++
   } else if (isNaN(Number(userNumber))){
     NumberErrorElement.innerHTML=outputTag[0] + "Número não pode conter letras" + outputTag[1]
    errorQnt++
   }
   if(!userLogradouro){
     LogradouroErrorElement.innerHTML = outputTag[0] + "Preencha com seu logradouro" + outputTag[1]
    errorQnt++
   }
   if(!userBairro){
     BairroErrorElement.innerHTML = outputTag[0] + "Preencha com seu bairro" + outputTag[1]
    errorQnt++
   }  
   if(!userCidade){
     CidadeErrorElement.innerHTML = outputTag[0] + "Preencha com sua Cidade" + outputTag[1]
    errorQnt++
   }
   if(!userEstado){
     EstadoErrorElement.innerHTML = outputTag[0] + "Preencha com seu Estado" + outputTag[1]
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

let key = false
function moveImage () {
  key = !key
  if (key) {
    imagePanel.style.transform = 'translateX(96%)'
  } else {
    imagePanel.style.transform = 'translateX(0%)'
  }
}