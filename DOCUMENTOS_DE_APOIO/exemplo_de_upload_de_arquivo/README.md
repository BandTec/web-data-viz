_Implementação de referência de como fazer upload de arquivos e salvar **Local**_

# Como usar

1. Clone este repositório em sua máquina.


1. Crie, no Banco de Dados, as tabelas necessárias para o funcionamento deste projeto.
- Siga as instruções no arquivo **/site/src/database/script-tabelas.sql**


3. Adicione as credenciais de Banco de Dados no arquivo **/site/src/database/config.js**, seguindo as instruções neste.

4. Execute os comandos abaixo:

```
npm i
``` 
_O comando acima irá instalar as bibliotecas necessárias para o funcionamento do projeto. As bibliotecas a serem instaladas estão listadas no arquivo **package.json** então é muito importante que este não seja alterado. Será criada uma nova pasta/diretório chamado **node_modules** quando o comando for finalizado, que é onde as bibliotecas estão localizadas. Não altere a pasta/diretório._

```
npm start
``` 

_O comando acima irá iniciar seu projeto e efetuar os comandos de acordo com a sua parametrização feita nos passos anteriores._

6. Para "ver" seu projeto funcionando, acesse em seu navegador o caminho **informado no terminal**.

7. Caso queira parar a execução, tecle **CTRL+C** no terminal em que o projeto está rodando.


# Como implementar no seu próprio projeto

1. Você deve adicionar no seu projeto a dependência multer:

```
npm install multer
```

2. Criar o arquivo de configuração do multer. 
- Exemplo de configuração: [configUpload.js](https://github.com/fernandacaramico/exemplo-upload-imagem-local/blob/main/src/config/configUpload.js)

3. Criar uma rota para receber o upload.
- Exemplo de rota: [usuarioRouter.js](https://github.com/fernandacaramico/exemplo-upload-imagem-local/blob/main/src/routes/usuarioRouter.js)

_Este projeto foi desenvolvido por [@WilliamMN](https://github.com/WilliamMN/)_