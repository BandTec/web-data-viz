 function funcao(){
    let area = Number(inp1.value)
    let caixas = Number(inp2.value)


    // O custo da adubação é o valor do Adubo Fertilizante Solúvel 06-12-36 Hidroponia 1 Kg: R$ 48 kilos
    // O preço de 100 gramas desse adubo é de 4,8
    //https://www.mercadolivre.com.br/adubo-fertilizante-soluvel-061236-hidroponia-1-kg/up/MLBU1727493521#polycard_client=search-desktop&search_layout=grid&position=6&type=product&tracking_id=982e0267-ddb4-4294-b202-5c94f449a568&wid=MLB1561443133&sid=search
    let precoAdubo = 4.8;


    //DAdos da https://agronomiacomgismonti.blogspot.com/2018/07/calculo-de-adubacao-em-gmetro-linear.html
    //Estimam 15,75 gramas por metro quadrado. Vamos arredondar para 16
    let custoAdubacao = area * (16 * (precoAdubo * 0.1));


    //Uma composteira de 45 litros produz cerca de 12 kilos de humus
    let areaCoberta = caixas * 12;
    

    // Produção atual se diz respeito ao quanto eu produzo monetariamente com todas as minhas caixas
    let producaoAtual = areaCoberta * precoAdubo;


    //Com o monitoramento o valor aumenta em 50%
    let producaoMonitorada = producaoAtual * 1.5;

    let ganhoExtra = producaoMonitorada - producaoAtual;

    // pp.innerHTML =
    //     "- O valor gasto para adubar a área que você informou é de R$" + custoAdubacao.toFixed(2) + ". Considerando o preço do adubo de R$ 4,8 a cada 100 gramas." + "<br><br>" + 

    //     "- Utilizando a área informada, você produz de adubo o equivalente a R$" + producaoAtual.toFixed(2) + ". <br><br>" +
    //     "- O monitoramento garante uma boa qualidade de adubo, com o monitoramento ideal o valor aumenta cerca de 50%. O valor do adubo com o monitoramento é de R$" + producaoMonitorada.toFixed(2) + ". <br><br>" +

    //     "- Você perde cerda de R$" + ganhoExtra.toFixed(2)+ " reais por ciclo de vermicompostagem sem um monitoramento ideal.";
    output.innerHTML = `
    <div class="result-card">
        
            <span>
            💰 Custo de Adubação: 
            <strong>R$ 
            ${custoAdubacao.toFixed(2)}
            </strong> 
            R$ 4,80 a cada 100g
            </span>
            
            <span>
            🌱 Produção Atual:
            <strong class="strong-green">
            R$ ${producaoAtual.toFixed(2)}
            </strong>
            </span>
                   
            <span>
            📈 Com Monitoramento (Ideal):
            <strong class="strong-green">
            R$ ${producaoMonitorada.toFixed(2)}
            </strong>
            Aumento de 50% na qualidade
            </span>
       
            <span>
            ⚠️ Oportunidade Perdida:
            <strong class="strong-red">R$ 
            ${ganhoExtra.toFixed(2)}
            </strong>
            Valor perdido por ciclo sem o monitoramento ideal.
            </span>
            
           
      
    </div>
`;
}