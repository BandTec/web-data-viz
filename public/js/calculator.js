 function calcular (){
    let area = Number(inp1.value)
    let caixas = Number(inp2.value)


    // O custo da adubação é o valor do Adubo Fertilizante Solúvel 06-12-36 Hidroponia 1 Kg: R$ 48 kilos
    // O preço de 100 gramas desse adubo é de 4,8
    //https://www.mercadolivre.com.br/adubo-fertilizante-soluvel-061236-hidroponia-1-kg/up/MLBU1727493521#polycard_client=search-desktop&search_layout=grid&position=6&type=product&tracking_id=982e0267-ddb4-4294-b202-5c94f449a568&wid=MLB1561443133&sid=search
    let precoAdubo = 4.8;


    //DAdos da https://agronomiacomgismonti.blogspot.com/2018/07/calculo-de-adubacao-em-gmetro-linear.html
    //Estimam 15,75 gramas por metro quadrado. Vamos arredondar para 16
    let custoAdubacao = area * (16 * precoAdubo);


    //Uma composteira de 45 litros produz cerca de 12 kilos de humus
    let areaCoberta = caixas * 12;
    

    // Produção atual se diz respeito ao quanto eu produzo monetariamente com todas as minhas caixas
    let producaoAtual = areaCoberta * precoAdubo;


    //Com o monitoramento o valor aumenta em 50%
    let producaoMonitorada = producaoAtual * 1.5;

    let ganhoExtra = producaoMonitorada - producaoAtual;

    pp.innerHTML =
        "Área: " + area + " m² <br>" +
        "Custo para adubar esta área caso você compre o adubo: R$" + custoAdubacao.toFixed(2) + "<br><br>" +

        "O preço em adubo que você produz R$" + producaoAtual.toFixed(2) + "<br>" +
        "Produção de adubo monitorada com CompostEco: R$" + producaoMonitorada.toFixed(2) + "<br><br>" +

        "Ganho extra com monitoramento: R$" + ganhoExtra.toFixed(2);
}