const printCharts = () => {

    circulo()
    graficoLineas()
    barrasHorizontales()
    barrasHorizontales2()
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


    
    const donutLabel = {
        id: 'donutLabel',
        beforeDatasetsDraw(chart, args, pluginOptions){
            const {ctx, data} = chart;

            ctx.save();
            const xCoord = chart.getDatasetMeta(0).data[0].x;
            const yCoord = chart.getDatasetMeta(0).data[0].y;
            ctx.font = 'bold 30px sans-serif';
            ctx.fillStyle = 'rgba(54, 162, 235, 1';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('text', xCoord, yCoord);
        }
    }

    const options = {
        legend: {position: 'left'
                //display: false
        },
    }

    const config = {
        plugins: [donutLabel]
    }

    /*legend: {//position: 'left'
                display: false
            }*/

    new Chart('chart2', {type: 'doughnut',data, options})
}

const graficoLineas = () =>{

    var ctx = document.getElementById('graflineas').getContext('2d');
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
        document.getElementById('graflineas'),
        config
    );
    //new Chart('graflineas', {type: 'line', data, options})
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

const barrasHorizontales2 = () => {
    var ctx = document.getElementById('grafhorizontal2').getContext('2d');
    var barGradient = ctx.createLinearGradient(0, 0, 700, 0);
    
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
    const horizontalGradientBg = {
        id: 'horizontalGradientBg',
        beforeDraw(chart, args, plugins){
            const {ctx, chartArea: {top, bottom, left, right, width, height}} = chart;

            ctx.save();

            const gradientBg = ctx.createLinearGradient(left,0,width,0)
            gradientBg.addColorStop(1, 'rgba(0, 0, 0, 0.1)')
            gradientBg.addColorStop(0, 'rgba(0, 0, 0, 1)');

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
      plugins: [horizontalGradientBg]
        
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('grafhorizontal2'),
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
        document.getElementById('barrasArriba'),
        config
      );
  
}

printCharts()