const links = document.querySelectorAll('.menu a');
const main = document.getElementById('main-content');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    loadPage(link.dataset.page);
  });
});

function loadPage(page) {
  let html = "";
  main.style.opacity = 0;

  setTimeout(() => {
    switch (page) {
      case "visao":
        html = `
          <h2>Visão Geral</h2>
          <p>Bem-vindo ao painel do projeto <strong>C.T.G.P.B</strong>. Aqui você encontra uma visão ampla sobre os principais dados relacionados à carga tributária e aos gastos públicos no Brasil.</p>
          <div>
            <div>
              <h3>Carga Tributária por Esfera de Governo</h3>
              <canvas id="graficoCargaTributaria"></canvas>
            </div>
            <div>
              <h3>Classificação Econômica</h3>
              <canvas id="graficoClassificacaoEconomica"></canvas>
            </div>
            <div>
              <h3>Evolução da Carga Tributária</h3>
              <canvas id="graficoEvolucaoCargaTributaria"></canvas>
            </div>
          </div>
        `;
        main.innerHTML = html;
        createCharts();
        break;

      case "dados":
        html = `
          <h2>Visualizar Dados</h2>
          <p>Explore os dados de forma interativa. Você pode selecionar anos ou esferas de governo para analisar a carga tributária.</p>
          <div>
            <div>
              <h3>Interativo: Carga Tributária por Esfera</h3>
              <canvas id="graficoInterativo1"></canvas>
            </div>
            <div>
              <h3>Interativo: Classificação Econômica</h3>
              <canvas id="graficoInterativo2"></canvas>
            </div>
            <div>
              <h3>Interativo: Evolução da Carga</h3>
              <canvas id="graficoInterativo3"></canvas>
            </div>
          </div>
        `;
        main.innerHTML = html;
        createInteractiveCharts();
        break;

      case "educacao":
        html = `
          <h2>Educação Fiscal</h2>
          <p>A carga tributária no Brasil tem uma história que acompanha a própria formação do Estado e sua relação com a sociedade. Durante o período colonial, a tributação estava voltada quase exclusivamente para atender aos interesses da Coroa Portuguesa. Impostos como o "quinto do ouro", que recolhia 20% de toda a produção mineradora, e o dízimo sobre a agricultura eram os principais mecanismos de arrecadação. Essa cobrança pesada gerou insatisfação e até revoltas, como a Inconfidência Mineira de 1789, que tinha entre suas motivações a pressão fiscal.

          Com a independência, em 1822, o Império manteve uma estrutura simples, na qual as tarifas alfandegárias, tanto sobre importações quanto exportações, eram a principal fonte de receita. O Brasil vivia uma economia agrária e dependente do café, e os impostos internos ainda tinham pouca relevância. Essa lógica se manteve na República Velha, entre 1889 e 1930, quando o federalismo permitiu aos estados certa autonomia para arrecadar, mas a União continuou dependendo majoritariamente dos tributos sobre o comércio exterior.

          A partir da Era Vargas, nos anos 1930, a situação começou a mudar. Com o avanço da industrialização, o governo buscou fontes de receita mais modernas e estáveis. O imposto de renda, criado em 1922, ganhou maior importância e novos tributos foram instituídos, fortalecendo o papel da União na centralização da arrecadação. Esse movimento se intensificou no Estado Novo, quando o crescimento da máquina estatal exigiu uma base tributária mais sólida.
          No período pós-guerra e, sobretudo, durante a ditadura militar, o sistema tributário passou por reformas profundas. A mais</p>
        `;
        main.innerHTML = html;
        break;

      case "transparencia":
        html = `
          <h2>Transparência Pública</h2>
          <p>Veja onde o dinheiro público é aplicado, acompanhe investimentos e compare a distribuição de gastos entre diferentes áreas e estados.</p>
          <div>
            <div>
              <h3>Gastos por Área (2024)</h3>
              <canvas id="graficoGastosArea"></canvas>
            </div>
            <div>
              <h3>Gastos por Estado (2024)</h3>
              <canvas id="graficoGastosEstado"></canvas>
            </div>
          </div>
        `;
        main.innerHTML = html;
        createTransparencyCharts();
        break;

      default:
        main.innerHTML = "<h2>Página não encontrada</h2>";
    }
    main.style.opacity = 1;
  }, 200);
}

function createCharts() {
  const ctx1 = document.getElementById('graficoCargaTributaria').getContext('2d');
  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],
      datasets: [
        { label: 'Governo Central', data: [14.5,14.8,15,15.2,15.5,15.7,15.9,16.1,16.3,16.5,16.7,16.9,17.1,17.3,17.5], borderColor: '#FF5733', fill: false },
        { label: 'Estados', data: [5.0,5.2,5.4,5.6,5.8,6.0,6.2,6.4,6.6,6.8,7.0,7.2,7.4,7.6,7.8], borderColor: '#33FF57', fill: false },
        { label: 'Municípios', data: [2.0,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.0,3.1,3.2,3.3,3.4], borderColor: '#3357FF', fill: false }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const ctx2 = document.getElementById('graficoClassificacaoEconomica').getContext('2d');
  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Bens e Serviços','Renda','Contribuições'],
      datasets: [{ data: [13.91,9.09,6.65], backgroundColor: ['#FF5733','#33FF57','#3357FF'] }]
    },
    options: { responsive:true, maintainAspectRatio: false }
  });

  const ctx3 = document.getElementById('graficoEvolucaoCargaTributaria').getContext('2d');
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],
      datasets: [{ label: 'Carga Tributária Bruta (% do PIB)', data:[30.1,30.3,30.5,30.7,31.0,31.2,31.5,31.7,32.0,32.2,32.4,32.6,32.8,33.0,33.2], backgroundColor:'#FF5733' }]
    },
    options: { responsive:true, maintainAspectRatio: false }
  });
}

function createInteractiveCharts() {
  const ctx1 = document.getElementById('graficoInterativo1').getContext('2d');
  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],
      datasets: [
        { label: 'Governo Central', data: [14.5,14.8,15,15.2,15.5,15.7,15.9,16.1,16.3,16.5,16.7,16.9,17.1,17.3,17.5], borderColor: '#FF5733', fill: false },
        { label: 'Estados', data: [5.0,5.2,5.4,5.6,5.8,6.0,6.2,6.4,6.6,6.8,7.0,7.2,7.4,7.6,7.8], borderColor: '#33FF57', fill: false }
      ]
    },
    options: { responsive:true, maintainAspectRatio:false, interaction:{mode:'nearest', intersect:true} }
  });

  const ctx2 = document.getElementById('graficoInterativo2').getContext('2d');
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Bens e Serviços','Renda','Contribuições'],
      datasets: [{ data: [13.91,9.09,6.65], backgroundColor: ['#FF5733','#33FF57','#3357FF'] }]
    },
    options: { responsive:true, maintainAspectRatio:false, plugins:{ tooltip:{ enabled:true } } }
  });

  const ctx3 = document.getElementById('graficoInterativo3').getContext('2d');
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],
      datasets: [{ label:'Carga Tributária Bruta (% do PIB)', data:[30.1,30.3,30.5,30.7,31.0,31.2,31.5,31.7,32.0,32.2,32.4,32.6,32.8,33.0,33.2], backgroundColor:'#FF5733' }]
    },
    options: { responsive:true, maintainAspectRatio:false, interaction:{mode:'index', intersect:false} }
  });
}

function createTransparencyCharts() {
  const ctxArea = document.getElementById('graficoGastosArea').getContext('2d');
  new Chart(ctxArea, {
    type: 'bar',
    data: {
      labels: ['Saúde','Educação','Segurança','Infraestrutura','Outros'],
      datasets: [{ label:'Gastos (Bilhões R$)', data:[250, 180, 90, 130, 70], backgroundColor:'#33FF57' }]
    },
    options: { responsive:true, maintainAspectRatio:false }
  });

  const ctxEstado = document.getElementById('graficoGastosEstado').getContext('2d');
  new Chart(ctxEstado, {
    type: 'pie',
    data: {
      labels: ['SP','RJ','MG','RS','PR','Outros'],
      datasets: [{ data:[120, 80, 60, 50, 40, 200], backgroundColor:['#FF5733','#33FF57','#3357FF','#FF33A8','#FFC300','#8C33FF'] }]
    },
    options: { responsive:true, maintainAspectRatio:false }
  });
}

loadPage('visao');