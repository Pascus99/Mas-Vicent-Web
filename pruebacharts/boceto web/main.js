let listElements = document.querySelectorAll('.list_button--click');

listElements.forEach(listElement =>{
    listElement.addEventListener('click', ()=>{
        
        //listElement.classList.toggle('arrow')

        let height = 0;
        let menu = listElement.nextElementSibling;
        console.log(menu.scrollHeight);
        if(menu.clientHeight == '0'){
            height = menu.scrollHeight
        }

        menu.style.height = `${height}px`;
    })
});

var canvas = document.getElementById("panel");
var ctx = canvas.getContext("2d");

var image = new Image();
image.src = 'imgs/estrella.png';

// Configuramos las dimensiones del canvas
canvas.width = 300;
canvas.height = 200;
var x_cor = 50;
var y_cor = 50;
var x_size = 200;
var y_size = 120;
var borderRadius = 20;

function drawButon(){
    ctx.fillStyle = '#b858b6'

    ctx.beginPath();
    ctx.moveTo(x_cor + borderRadius, y_cor);
    ctx.lineTo(x_cor + x_size - borderRadius, y_cor); //x
    ctx.arc(x_cor + x_size - borderRadius, y_cor + borderRadius, borderRadius, -Math.PI/2, 0);
    ctx.lineTo(x_cor + x_size, y_cor + y_size - borderRadius); //y
    ctx.arc(x_cor + x_size - borderRadius, y_cor + y_size - borderRadius, borderRadius, 0, Math.PI/2);
    ctx.lineTo(x_cor + borderRadius, y_cor + y_size);   //x
    ctx.arc(x_cor + borderRadius, y_cor + y_size - borderRadius, borderRadius, Math.PI/2, Math.PI);
    ctx.lineTo(x_cor, y_cor + borderRadius); //y
    ctx.arc(x_cor + borderRadius, y_cor + borderRadius, borderRadius, Math.PI, -Math.PI/2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.font = '16px Roboto';
    ctx.textAlign = 'center';
    ctx.fillText('Prueba', x_size/2, 30+y_size/2);

    image.onload = function(){
        ctx.drawImage(image, x_cor+x_size-40, y_cor+20, 25, 25);
    }
}

drawButon();

canvas.addEventListener('click', function(event) {
    
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;
  
    // Verificar si el clic está dentro del botón
    if (mouseX > x_cor && mouseX < x_cor + x_size && mouseY > y_cor && mouseY < y_cor + y_size) {
      // Realizar una acción cuando se hace clic en el botón
      //alert('¡Has hecho clic en el botón!');
      location.href = "panel.html";
    }
});


var canvas2 = document.getElementById("panel_pu");
var ctx = canvas2.getContext("2d");

// Configuramos las dimensiones del canvas
canvas2.width = 300;
canvas2.height = 200;
var x_cor = 50;
var y_cor = 50;
var x_size = 200;
var y_size = 120;
var borderRadius = 20;
const gradient = ctx.createLinearGradient(0, 0, canvas2.width, 0);
gradient.addColorStop(0, 'blue');
gradient.addColorStop(1, 'purple');

ctx.fillStyle = gradient

ctx.beginPath();
ctx.moveTo(x_cor + borderRadius, y_cor);
ctx.lineTo(x_cor + x_size - borderRadius, y_cor); //x
ctx.arc(x_cor + x_size - borderRadius, y_cor + borderRadius, borderRadius, -Math.PI/2, 0);
ctx.lineTo(x_cor + x_size, y_cor + y_size - borderRadius); //y
ctx.arc(x_cor + x_size - borderRadius, y_cor + y_size - borderRadius, borderRadius, 0, Math.PI/2);
ctx.lineTo(x_cor + borderRadius, y_cor + y_size);   //x
ctx.arc(x_cor + borderRadius, y_cor + y_size - borderRadius, borderRadius, Math.PI/2, Math.PI);
ctx.lineTo(x_cor, y_cor + borderRadius); //y
ctx.arc(x_cor + borderRadius, y_cor + borderRadius, borderRadius, Math.PI, -Math.PI/2);
ctx.closePath();
ctx.stroke();
ctx.fill();

ctx.fillStyle = 'black';
ctx.font = '16px Roboto';
ctx.textAlign = 'center';
ctx.fillText('Prueba 2', x_size/2, 30+y_size/2);


canvas2.addEventListener('click', ()=>{
    //alert('¡Has hecho clic en el botón!');
    location.href = "webglprueba.html";
})

const panel_cuadros = document.getElementById('cont_nuevo_cuadro');
const add_cuadro = document.getElementById('boton_add');
const cerrar_cuadros = document.getElementById('cerrar_ind_2');

add_cuadro.addEventListener('click', ()=>{
    panel_cuadros.style.display = "flex"
})

cerrar_cuadros.addEventListener('click', ()=>{
    panel_cuadros.style.display = "none"
})

const usuario = document.getElementById('bt_usuario')

usuario.addEventListener('click', ()=>{
    location.href = "usuario.html";
})