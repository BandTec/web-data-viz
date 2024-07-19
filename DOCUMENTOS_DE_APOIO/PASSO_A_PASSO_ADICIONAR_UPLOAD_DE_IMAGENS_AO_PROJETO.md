Caso você queira adicionar a funcionalidade de "upload de imagens" no seu projeto, você pode:

- OPÇÃO 1 - Criar uma coluna no banco de dados com tipo VARCHAR que irá receber a URL da sua imagem, como por exemplo " http: // meusite. com/ minhaimagem .png". Assim o campo que será preenchido pelo usuário será uma input de texto.
  - Prós: Simples de implementar, uma vez que os campos de login e cadastro também são assim.
  - Contras: Seu usuário precisará ter a URL da imagem desejada.
- OPÇÃO 2 - Possibilitar o upload das imagens a um diretório no seu próprio projeto, seguindo: [exemplo_de_upload_de_arquivo](https://github.com/BandTec/web-data-viz/tree/main/DOCUMENTOS_DE_APOIO/exemplo_de_upload_de_arquivo)
  - Prós: Esta implementação simula que há um diretório específico para arquivos multimídia, o que é uma prática de mercado, podendo usar já o conceito de "buckets".
  - Contras: Seu repositório pode ficar "pesado", fazendo com que seu git clone fique demorado. Arquivos de imagens e vídeos tendem a ter mais bytes de tamanho, chegando a MBs (megabytes) ou até GBs (gigabytes).
- OPÇÃO 3 - NÃO RECOMENDADO - Criar uma coluna no banco de dados com tipo BLOB (Binary Large Object) que irá receber o arquivo de mídia
  - Prós: Você irá pesquisar algo novo.
  - Contras: Nem todos os Bancos de Dados suportam este tipo de dado. Trazer a imagem do banco para exibi-la na sua tela pode ser trabalhoso demais e te atrasar em relação a outros entregáveis.

**Não há a "melhor opção" e nenhuma destas opções "vale mais pontos" ou "seu projeto vai necessariamente ficar melhor porque você escolheu tal opção".**
