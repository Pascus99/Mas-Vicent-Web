let listElements = document.querySelectorAll('.list_button--click');

listElements.forEach(listElement =>{
    listElement.addEventListener('click', ()=>{
        
        //listElement.classList.toggle('arrow')

        let height = 0;
        let menu = listElement.nextElementSibling;
        //console.log(menu.scrollHeight);
        if(menu.clientHeight == '0'){
            height = menu.scrollHeight
        }

        menu.style.height = `${height}px`;
    })
});

const boton_ajustes = document.querySelector('.bt_aj');
const menu_ajustes = document.querySelector('.lista_ajustes_panel');
const close = document.querySelector('.close');

boton_ajustes.addEventListener('click', ()=>{
  menu_ajustes.classList.toggle("spread")
})

close.addEventListener('click', ()=>{
  menu_ajustes.classList.toggle("spread")
})


const printCharts = () => {

  circulo()
  graficoLineas()
  barrasHorizontales()
  grafBarras()
  barrasRadio()
}

const circulo = () => {

  const data = {
      labels: ['uno', 'dos', 'tres'],
      datasets: [{
          data: [10,20,30],
          borderColor: ['orange', 'blue', 'red'],
          backgroundColor: [
          'rgba(250,159,27,0.5)',
          'rgba(27,79,250,0.5)',
          'rgba(250,35,27,0.5)'],
          cutout: '60%',
          borderRadius: 10
      }]
  }


  
  // const donutLabel = {
  //     id: 'donutLabel',
  //     beforeDatasetsDraw(chart, args, pluginOptions){
  //         const {ctx, data} = chart;

  //         ctx.save();
  //         const xCoord = chart.getDatasetMeta(0).data[0].x;
  //         const yCoord = chart.getDatasetMeta(0).data[0].y;
  //         ctx.font = 'bold 30px sans-serif';
  //         ctx.fillStyle = 'rgba(54, 162, 235, 1';
  //         ctx.textAlign = 'center';
  //         ctx.textBaseline = 'middle';
  //         ctx.fillText('text', xCoord, yCoord);
  //     }
  //}

  const options = {
      legend: {position: 'top', labels: {fontColor: "white"}
      }
  }

  // const config = {
  //     plugins: [donutLabel]
  // }

  new Chart('chart2', {type: 'doughnut',data, options})
}

const graficoLineas = () =>{

  //para hacer el gradiente del gráfico
  var ctx = document.getElementById('myChart').getContext('2d');
  var lineGradient = ctx.createLinearGradient(0, 0, 0, 350);
  
  lineGradient.addColorStop(0.2, 'rgba(180, 52, 235, 0.5)');
  lineGradient.addColorStop(1, 'blue');

  const verticalGradientBg = {
      id: 'verticalGradientBg',
      beforeDraw(chart, args, plugins){
          const {ctx, chartArea: {top, bottom, left, right, width, height}} = chart;

          ctx.save();

          const gradientBg = ctx.createLinearGradient(0,top,0,height)
          gradientBg.addColorStop(0, 'rgba(0, 0, 0, 0.1)')
          gradientBg.addColorStop(1, 'rgba(0, 0, 0, 1)');

          ctx.fillStyle = gradientBg
          ctx.fillRect(left, top, width, height);
      }
  }

  const config = {
      type: 'line',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 4, 3],
          tension: 0.5,
          borderColor: 'purple',
          backgroundColor: lineGradient,
          fill: true
      }],
      },
      options: {
        legend: {
            labels: {
                fontColor: "white",
                fontSize: 18
            }
        },
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      },
      plugins: [verticalGradientBg]
        
    };

  
  const lineChart = new Chart(
      document.getElementById('myChart'),
      config
  );
  //new Chart('myChart', {type: 'line', data, options})
}

const grafBarras = () => {
  var ctx = document.getElementById('grafbarras').getContext("2d");
  var barGradient = ctx.createLinearGradient(0,0,0,350);

  barGradient.addColorStop(0.2, 'purple');
  barGradient.addColorStop(1, 'red');

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Weekly Sales',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: [
        barGradient,
      ],
      borderColor: [
        'rgba(255, 26, 104, 0)',
        'rgba(54, 162, 235, 0)',
        'rgba(255, 206, 86, 0)',
        'rgba(75, 192, 192, 0)',
        'rgba(153, 102, 255, 0)',
        'rgba(255, 159, 64, 0)',
        'rgba(0, 0, 0, 0)'
      ],
      borderWidth: 1
    }]
  };

  //plugin vertical gradient f
  const verticalGradientBg = {
      id: 'verticalGradientBg',
      beforeDraw(chart, args, plugins){
          const {ctx, chartArea: {top, bottom, left, right, width, height}} = chart;

          ctx.save();

          const gradientBg = ctx.createLinearGradient(0,top,0,height)
          gradientBg.addColorStop(0, 'rgba(0, 0, 0, 0.1)')
          gradientBg.addColorStop(1, 'rgba(0, 0, 0, 1)');

          ctx.fillStyle = gradientBg
          ctx.fillRect(left, top, width, height);
      }
  }

  // config 
  const config = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'x',
      legend: {
          labels: {
              fontColor: "white",
              fontSize: 18
          }
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    },
    plugins: [verticalGradientBg]
      
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('grafbarras'),
    config
  );
  
}

const barrasHorizontales = () => {
  var ctx = document.getElementById('grafhorizontal').getContext('2d');
  var barGradient = ctx.createLinearGradient(0, 0, 0, 350);
  
  barGradient.addColorStop(0.2, 'purple');
  barGradient.addColorStop(1, 'red');

  
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Weekly Sales',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: [
        barGradient,
        /*'rgba(54, 162, 235, 1)', //azul
        'rgba(255, 206, 86, 1)', //amarillo
        'rgba(75, 192, 192, 1)', //verdecito
        'rgba(153, 102, 255, 1)', //morado
        'rgba(255, 159, 64, 1)', //naranja
        'rgba(196, 58, 214, 1)'*/ //morao
      ],
      borderColor: [
        'rgba(255, 26, 104, 0)',
        'rgba(54, 162, 235, 0)',
        'rgba(255, 206, 86, 0)',
        'rgba(75, 192, 192, 0)',
        'rgba(153, 102, 255, 0)',
        'rgba(255, 159, 64, 0)',
        'rgba(0, 0, 0, 0)'
      ],
      borderWidth: 1
    }]
  };

  //plugin vertical gradient f
  const verticalGradientBg = {
      id: 'verticalGradientBg',
      beforeDraw(chart, args, plugins){
          const {ctx, chartArea: {top, bottom, left, right, width, height}} = chart;

          ctx.save();

          const gradientBg = ctx.createLinearGradient(0,top,0,height)
          gradientBg.addColorStop(0, 'rgba(0, 0, 0, 0.1)')
          gradientBg.addColorStop(1, 'rgba(0, 0, 0, 1)');

          ctx.fillStyle = gradientBg
          ctx.fillRect(left, top, width, height);
      }
  }

  // config 
  const config = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'y',
      legend: {
          labels: {
              fontColor: "white",
              fontSize: 18
          }
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    },
    plugins: [verticalGradientBg]
      
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('grafhorizontal'),
    config
  );
}

const barrasRadio = () => {
  const data = {
      labels: ['uno', 'dos', 'tres'],
      datasets: [{
        //label: 'Weekly Sales',
        data: [18],
        backgroundColor: [           
          'rgba(250,159,27,1)'
        ],borderColor: 'grey',
        circumference: (ctx) => {
          console.log(ctx.dataset.data[0])
          return ctx.dataset.data[0]/18 *270
          },
          borderWidth: 5,
          borderRadius: 10
      },{
          //label: 'Weekly Sales',
          data: [12],
          backgroundColor: [             
              'rgba(27,79,250,1)'
          ],borderColor: 'grey',
          circumference: (ctx) => {
              console.log(ctx.dataset.data[0])
              return ctx.dataset.data[0]/18 *270
          },
          borderWidth: 5,
          borderRadius: 10
        },
        {
          //label: 'Weekly Sales',
          data: [6],
          backgroundColor: [
              'rgba(250,35,27,1)'
          ],borderColor: 'grey',
          circumference: (ctx) => {
              console.log(ctx.dataset.data[0])
              return ctx.dataset.data[0]/18 *270
          },
          borderWidth: 5,
          borderRadius: 10
        }]
      
    };

    // config 
    const config = {
      type: 'doughnut',
      data,
      options: {
        legend: {

        },
        scales: {
          //display: false
        }
      },
      
        
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('chartradial'),
      config
    );

}

printCharts()

const indicadores = document.getElementById('pop_indicadores');
const pop_indicadores = document.getElementById('indicadores');
const cancelar = document.getElementById('cerrar_ind');
const add_ind = document.getElementById('add_ind');
const pop_tipo_ind = document.getElementById('tipo_indicadores')
const anterior = document.getElementById('anterior')
const cerrar_2 = document.getElementById('cerrar_ind_2')


indicadores.addEventListener('click', ()=>{
  //alert('ey')
  pop_indicadores.style.display = "flex";
})

cancelar.addEventListener('click', ()=>{
  pop_indicadores.style.display = "none";
})

add_ind.addEventListener('click', ()=>{
  pop_indicadores.style.display = "none";
  pop_tipo_ind.style.display = "flex";
})

anterior.addEventListener('click', ()=>{
  pop_tipo_ind.style.display = "none";
  pop_indicadores.style.display = "flex";
})
cerrar_2.addEventListener('click', ()=>{
  pop_tipo_ind.style.display = "none";
})

const modo_asistido = document.getElementById('modo_asist');
const modo_sql = document.getElementById('modo_sql')
const panel_sql = document.getElementById('cont_sql');
const panel_asist = document.getElementById('cont_asist')

// modo_asistido.addEventListener('click', ()=>{
//   panel_sql.style.display = 'none';
//   panel_asist.style.display = 'flex';
// })

// modo_sql.addEventListener('click', ()=>{
  
//   panel_asist.style.display = 'none';
//   panel_sql.style.display = 'flex';

// })

const add_panel = document.getElementById('add_panel')
const cerrar_nuevo_panel = document.getElementById('cerrar_panel')
const cont_nuevo_panel = document.getElementById('nuevo_panel_cont')

add_panel.addEventListener('click', ()=>{
  cont_nuevo_panel.style.display = 'flex';
})

cerrar_nuevo_panel.addEventListener('click', ()=>{
  cont_nuevo_panel.style.display = 'none';
})

const bt_filtros = document.getElementById('bt_filtros')
const filtros = document.getElementById('cont_filtros')

const bt_guardar_filtro = document.getElementById('bt_guadar_filtro')

bt_filtros.addEventListener('click', ()=>{
  filtros.style.display = 'flex';
})

bt_guardar_filtro.addEventListener('click', ()=>{
  filtros.style.display = 'none';
})

const bt_editar = document.getElementById('bt_edit')
const cont_edit = document.getElementById('cont_edit')
const cancelar_estilo = document.getElementById('cancelar_estilo')

bt_editar.addEventListener('click', ()=>{
  cont_edit.style.display = 'flex'
})

cancelar_estilo.addEventListener('click', ()=>{
  cont_edit.style.display = 'none'
})

