var gl, program;
var myZeta = 0.0, myPhi = Math.PI/2.0, radius = 1.4, fovy = 1.4;
var outerAngle=0;
var middleAngle=0;
var innerAngle=0;
var texturesId = [];

function getWebGLContext() {

  var canvas = document.getElementById("webglcanvas");

  try {
    return canvas.getContext("webgl2");
  }
  catch(e) {
  }

  return null;

}

//esto es importante para poder renderizar cualquier modelo 3D
function initShaders() {
    
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, document.getElementById("myVertexShader").text);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(vertexShader));
    return null;
  }
 
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, document.getElementById("myFragmentShader").text);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(fragmentShader));
    return null;
  }
    
  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
    
  gl.linkProgram(program);
    
  gl.useProgram(program);
    
  program.vertexPositionAttribute = gl.getAttribLocation( program, "VertexPosition");
  gl.enableVertexAttribArray(program.vertexPositionAttribute);
    
  program.modelViewMatrixIndex  = gl.getUniformLocation( program, "modelViewMatrix");
  program.projectionMatrixIndex = gl.getUniformLocation( program, "projectionMatrix");
    
  // normales
  program.vertexNormalAttribute = gl.getAttribLocation ( program, "VertexNormal");
  program.normalMatrixIndex     = gl.getUniformLocation( program, "normalMatrix");
  gl.enableVertexAttribArray(program.vertexNormalAttribute);
    
  // coordenadas de textura
  program.vertexTexcoordsAttribute = gl.getAttribLocation ( program, "VertexTexcoords");
  gl.enableVertexAttribArray(program.vertexTexcoordsAttribute);
  program.myTextureIndex           = gl.getUniformLocation( program, 'myTexture');
  program.repetition               = gl.getUniformLocation( program, "repetition");
  gl.uniform1i(program.myTextureIndex, 3);
  gl.uniform1f(program.repetition,     1.0);

  // material
  program.KaIndex               = gl.getUniformLocation( program, "Material.Ka");
  program.KdIndex               = gl.getUniformLocation( program, "Material.Kd");
  program.KsIndex               = gl.getUniformLocation( program, "Material.Ks");
  program.alphaIndex            = gl.getUniformLocation( program, "Material.alpha");
    
  // fuente de luz
  program.LaIndex               = gl.getUniformLocation( program, "Light.La");
  program.LdIndex               = gl.getUniformLocation( program, "Light.Ld");
  program.LsIndex               = gl.getUniformLocation( program, "Light.Ls");
  program.PositionIndex         = gl.getUniformLocation( program, "Light.Position");
  
}

//esto inicializa el render
function initRendering() {
    
  gl.clearColor(0.95,0.95,0.95,1.0);
  gl.enable(gl.DEPTH_TEST);
    
  setShaderLight();
    
}

//esto es para poder añadir el modelo al buffer
function initBuffers(model) {
    
  model.idBufferVertices = gl.createBuffer ();
  gl.bindBuffer (gl.ARRAY_BUFFER, model.idBufferVertices);
  gl.bufferData (gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);
    
  model.idBufferIndices = gl.createBuffer ();
  gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, model.idBufferIndices);
  gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW);
    
}

//esto añade al buffer las primitivas del otro archivo
function initPrimitives() {
    
  initBuffers(examplePlane);
  initBuffers(exampleCube);
  initBuffers(exampleCover);
  initBuffers(exampleCone);
  initBuffers(exampleCylinder);
  initBuffers(exampleSphere);
    
}

function setShaderProjectionMatrix(projectionMatrix) {
    
  gl.uniformMatrix4fv(program.projectionMatrixIndex, false, projectionMatrix);
    
}

function setShaderModelViewMatrix(modelViewMatrix) {
    
  gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    
}

function setShaderNormalMatrix(normalMatrix) {
    
  gl.uniformMatrix3fv(program.normalMatrixIndex, false, normalMatrix);
    
}

function getNormalMatrix(modelViewMatrix) {
    
  return mat3.normalFromMat4(mat3.create(), modelViewMatrix);
    
}

function getProjectionMatrix() {

  return mat4.perspective(mat4.create(), fovy, 1.0, 0.1, 100.0);
    
}

//aqui se establece la cámara
function getCameraMatrix() {
    
  // coordenadas esféricas a rectangulares: https://en.wikipedia.org/wiki/Spherical_coordinate_system
  var x = radius * Math.sin(myPhi) * Math.sin(myZeta);
  var y = radius * Math.cos(myPhi);
  var z = radius * Math.sin(myPhi) * Math.cos(myZeta);

  return mat4.lookAt(mat4.create(), [x, y, z], [0, 0, 0], [0, 1, 0]);
    
}

function setShaderMaterial(material) {
    
  gl.uniform3fv(program.KaIndex,    material.mat_ambient);
  gl.uniform3fv(program.KdIndex,    material.mat_diffuse);
  gl.uniform3fv(program.KsIndex,    material.mat_specular);
  gl.uniform1f (program.alphaIndex, material.alpha);
    
}

function setShaderLight() {
    
  gl.uniform3f(program.LaIndex,       1.0, 1.0, 1.0);
  gl.uniform3f(program.LdIndex,       1.0, 1.0, 1.0);
  gl.uniform3f(program.LsIndex,       1.0, 1.0, 1.0);
  gl.uniform3f(program.PositionIndex, 0.2, 0.2, 0.0); // en coordenadas del ojo
    
}

function drawSolid(model) {
    
  gl.bindBuffer (gl.ARRAY_BUFFER, model.idBufferVertices);
  gl.vertexAttribPointer (program.vertexPositionAttribute,  3, gl.FLOAT, false, 8*4,   0);
  gl.vertexAttribPointer (program.vertexNormalAttribute,    3, gl.FLOAT, false, 8*4, 3*4);
  gl.vertexAttribPointer (program.vertexTexcoordsAttribute, 2, gl.FLOAT, false, 8*4, 6*4);
    
  gl.bindBuffer   (gl.ELEMENT_ARRAY_BUFFER, model.idBufferIndices);
  gl.drawElements (gl.TRIANGLES, model.indices.length, gl.UNSIGNED_SHORT, 0);
    
}

function drawScene() {

  // se inicializan los buffers de color y de profundidad
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
  // se obtiene la matriz de transformacion de la proyeccion y se envia al shader
  setShaderProjectionMatrix( getProjectionMatrix() );

  // se calcula la matriz de transformación del modelo
  var modelMatrix = mat4.create();  
  mat4.fromScaling (modelMatrix, [0.5, 0.5, 0.5]);
  
  // se opera la matriz de transformacion de la camara con la del modelo y se envia al shader
  var modelViewMatrix = mat4.create();
  mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
  setShaderModelViewMatrix(modelViewMatrix);

  // se obtiene la matriz de transformacion de la normal y se envia al shader
  setShaderNormalMatrix(getNormalMatrix(modelViewMatrix));
    
  // se envia al Shader el material del objeto
  // En este ejemplo es el mismo material para los dos objetos
  setShaderMaterial(White_plastic);
    
  // se selecciona una unidad de textura
  gl.activeTexture(gl.TEXTURE3);

  gl.bindTexture(gl.TEXTURE_2D, texturesId[1]);

  matS=mat4.create();
    matT=mat4.create();
    matR=mat4.create();
    matR2=mat4.create();
    matR3=mat4.create();
    matR4=mat4.create();
    
    // establece la matriz de transformación de la proyección
  
    
  
    //cubo grande
    mat4.fromScaling(matS, [1,1,1]);
    mat4.fromTranslation(matT, [0,0,0]);
    mat4.multiply(modelMatrix, matT, matS);
    mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
    gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    setShaderModelViewMatrix(modelViewMatrix);
    setShaderNormalMatrix( getNormalMatrix(modelViewMatrix) );
    gl.bindTexture(gl.TEXTURE_2D, texturesId[0])
    drawSolid(exampleCube);

    //cilindro chimenea
    mat4.fromScaling(matS, [0.15,0.15,1]);
    mat4.fromTranslation(matT, [0,1.5,0]);
    mat4.fromRotation(matR, Math.PI/2, [1,0,0]);
    mat4.multiply(modelMatrix, matR, matS);
    mat4.multiply(modelMatrix, matT, modelMatrix);
    mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
    gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    setShaderModelViewMatrix(modelViewMatrix);
    setShaderNormalMatrix( getNormalMatrix(modelViewMatrix) );
    gl.bindTexture(gl.TEXTURE_2D, texturesId[0])
    drawSolid(exampleCylinder);

    //cubo grande 2
    mat4.fromScaling(matS, [1,1,1]);
    mat4.fromTranslation(matT, [1,0,0]);
    mat4.multiply(modelMatrix, matT, matS);
    mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
    gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    setShaderModelViewMatrix(modelViewMatrix);
    setShaderNormalMatrix( getNormalMatrix(modelViewMatrix) );
    gl.bindTexture(gl.TEXTURE_2D, texturesId[0])
    drawSolid(exampleCube);

    //cilindro chimenea 2
    mat4.fromScaling(matS, [0.15,0.15,1]);
    mat4.fromTranslation(matT, [1,1.5,0]);
    mat4.fromRotation(matR, Math.PI/2, [1,0,0]);
    mat4.multiply(modelMatrix, matR, matS);
    mat4.multiply(modelMatrix, matT, modelMatrix);
    mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
    gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    setShaderModelViewMatrix(modelViewMatrix);
    setShaderNormalMatrix( getNormalMatrix(modelViewMatrix) );
    gl.bindTexture(gl.TEXTURE_2D, texturesId[0])
    drawSolid(exampleCylinder);
    
    
    //lado bandeja izq
    mat4.fromScaling(matS, [0.5,0.5,0.5]);
    mat4.fromTranslation(matT, [-1,-0.25,0]);
    mat4.fromRotation(matR, Math.PI/2, [0,0,1]);
    mat4.multiply(modelMatrix, matR, matS);
    mat4.multiply(modelMatrix, matT, modelMatrix);
    mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
    gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    setShaderModelViewMatrix(modelViewMatrix);
    setShaderNormalMatrix( getNormalMatrix(modelViewMatrix) );
    gl.bindTexture(gl.TEXTURE_2D, texturesId[0])
    drawSolid(examplePlane);

    //lado bandeja frente
    mat4.fromScaling(matS, [0.5,0.5,0.5]);
    mat4.fromTranslation(matT, [-0.75,-0.25,0.25]);
    mat4.fromRotation(matR, Math.PI/2, [1,0,0]);
    mat4.multiply(modelMatrix, matR, matS);
    mat4.multiply(modelMatrix, matT, modelMatrix);
    mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
    gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    setShaderModelViewMatrix(modelViewMatrix);
    setShaderNormalMatrix( getNormalMatrix(modelViewMatrix) );
    gl.bindTexture(gl.TEXTURE_2D, texturesId[0])
    drawSolid(examplePlane);

    //lado bandeja fondo
    mat4.fromScaling(matS, [0.5,0.5,0.5]);
    mat4.fromTranslation(matT, [-0.75,-0.25,-0.25]);
    mat4.fromRotation(matR, Math.PI/2, [1,0,0]);
    mat4.multiply(modelMatrix, matR, matS);
    mat4.multiply(modelMatrix, matT, modelMatrix);
    mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
    gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    setShaderModelViewMatrix(modelViewMatrix);
    setShaderNormalMatrix( getNormalMatrix(modelViewMatrix) );
    gl.bindTexture(gl.TEXTURE_2D, texturesId[0])
    drawSolid(examplePlane);

    //base bandeja
    mat4.fromScaling(matS, [0.5, 0.5, 0.5]);
    mat4.fromTranslation(matT, [-0.75,-0.5,0]);
    mat4.multiply(modelMatrix, matT, matS);
    mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
    gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    setShaderModelViewMatrix(modelViewMatrix);
    setShaderNormalMatrix( getNormalMatrix(modelViewMatrix) );
    drawSolid(examplePlane);

    //plano base
    mat4.fromScaling(matS, [3, 2.4, 2.4]);
    mat4.fromTranslation(matT, [0.25,-0.5,0]);
    mat4.multiply(modelMatrix, matT, matS);
    mat4.multiply(modelViewMatrix, getCameraMatrix(), modelMatrix);
    gl.uniformMatrix4fv(program.modelViewMatrixIndex, false, modelViewMatrix);
    setShaderModelViewMatrix(modelViewMatrix);
    setShaderNormalMatrix( getNormalMatrix(modelViewMatrix) );
    gl.bindTexture(gl.TEXTURE_2D, texturesId[1])
    drawSolid(examplePlane);

}

function initHandlers() {
    
  var mouseDown = false;
  var lastMouseX;
  var lastMouseY;

  var canvas = document.getElementById("webglcanvas");

  canvas.addEventListener("mousedown",
    function(event) {
      mouseDown  = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    },
    false);

  canvas.addEventListener("mouseup",
    function() {
      mouseDown = false;
    },
    false);
  
  canvas.addEventListener("wheel",
    function (event) {
      
      var delta = 0.0;

      if (event.deltaMode == 0)
        delta = event.deltaY * 0.001;
      else if (event.deltaMode == 1)
        delta = event.deltaY * 0.03;
      else
        delta = event.deltaY;

      if (event.shiftKey == 1) { // fovy
          
        fovy *= Math.exp(-delta)
        fovy = Math.max (0.1, Math.min(3.0, fovy));
        
//         htmlFovy.innerHTML = (fovy * 180 / Math.PI).toFixed(1);
        
      } else {
        
        radius *= Math.exp(-delta);
        radius  = Math.max(Math.min(radius, 30), 0.05);
        
//         htmlRadius.innerHTML = radius.toFixed(1);
        
      }
      
      event.preventDefault();
      requestAnimationFrame(drawScene);

    }, false);



  canvas.addEventListener("mousemove",
    function (event) {
      
      if (!mouseDown) {
        return;
      }
      
      var newX = event.clientX;
      var newY = event.clientY;
      
      myZeta -= (newX - lastMouseX) * 0.005;
      myPhi  -= (newY - lastMouseY) * 0.005;
        
      var margen = 0.01;
      myPhi = Math.min (Math.max(myPhi, margen), Math.PI - margen);
        
//       htmlPhi.innerHTML  = (myPhi  * 180 / Math.PI).toFixed(1);
//       htmlZeta.innerHTML = (myZeta * 180 / Math.PI).toFixed(1);
     
      lastMouseX = newX
      lastMouseY = newY;
      
      event.preventDefault();
      requestAnimationFrame(drawScene);
      
    },
    false);

    document.addEventListener("keydown",
    function (event) {
    switch (event.key) {
    case 'a': outerAngle += 0.03; break;
    case 'b': middleAngle += 0.02; break;
    case 'c': innerAngle += 0.01; break;
    }
    requestAnimationFrame(drawScene);
    },
    false);
    
 var colors = document.getElementsByTagName("input");

  for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener("change",
    function(){
      switch (this.getAttribute("name")) {
        case "La": setColor(program.LaIndex, colors[0].value); break;
        case "Ld": setColor(program.LdIndex, colors[1].value); break;
        case "Ls": setColor(program.LsIndex, colors[2].value); break;
      }
      requestAnimationFrame(drawScene);
    },
    false);
  }
//     
  var textureFilename = document.getElementsByName("TextureFilename");
  
  for (var i = 0; i < textureFilename.length; i++) {
    textureFilename[i].addEventListener("change",
                                        changeTextureHandler(i),
                                        false);
  }
  
  function changeTextureHandler(texturePos) {
    return function(){
      if (this.files[0]!= undefined) {
        texturesId[texturePos].loaded = false;
        loadTextureFromFile(this.files[0], texturePos);
      }
    };
  }
    
  // var range = document.getElementsByName("Repetition");
  
  // range[0].addEventListener("mousemove",
  //                           function(){
  //                             gl.uniform1f(program.repetition, range[0].value);
  //                             requestAnimationFrame(drawScene);                              
  //                           },
  //                           false);

}

function setColor (index, value) {

  var myColor = value.substr(1); // para eliminar el # del #FCA34D
      
  var r = myColor.charAt(0) + '' + myColor.charAt(1);
  var g = myColor.charAt(2) + '' + myColor.charAt(3);
  var b = myColor.charAt(4) + '' + myColor.charAt(5);

  r = parseInt(r, 16) / 255.0;
  g = parseInt(g, 16) / 255.0;
  b = parseInt(b, 16) / 255.0;
  
  gl.uniform3f(index, r, g, b);
  
}

function allTexturesLoaded () {

  for (var i = 0; i < texturesId.length; i++)
    if (! texturesId[i].loaded)
      return false;
  
  return true;
  
}

function setTexture (image, texturePos) {

  // se indica el objeto textura
  gl.bindTexture(gl.TEXTURE_2D, texturesId[texturePos]);

  // Descomentar si es necesario voltear la textura
  //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    
  // datos de la textura
  gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGB, image.width, image.height, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
    
  // parámetros de filtrado
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    
  // parámetros de repetición (ccordenadas de textura mayores a uno)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    
  // creación del mipmap
  gl.generateMipmap(gl.TEXTURE_2D);

  texturesId[texturePos].loaded = true; // textura ya disponible

  if (allTexturesLoaded()) {
    
    initHandlers();
    requestAnimationFrame(drawScene);
    
  }

}

function loadTextureFromFile(filename, texturePos) {

  var reader = new FileReader(); // Evita que Chrome se queje de SecurityError al cargar la imagen elegida por el usuario
  
  reader.addEventListener("load",
                          function() {
                            var image = new Image();
                            image.addEventListener("load",
                                                   function() {
                                                     setTexture(image, texturePos);
                                                  },
                                                   false);
                            image.src = reader.result;
                          },
                          false);
  
  reader.readAsDataURL(filename);

}

function loadTextureFromServer (filename, texturePos) {
    
  var image = new Image();
    
  image.addEventListener("load",
                         function() {
                           setTexture(image, texturePos);
                        },
                         false);
  image.addEventListener("error",
                         function(err) {
                           console.log("MALA SUERTE: no esta disponible " + this.src);
                        },
                         false);
  image.crossOrigin = 'anonymous'; // Esto evita que Chrome se queje de SecurityError al cargar la imagen de otro dominio
  image.src         = filename;

}

function initTextures() {

  var serverUrl    = "http://cphoto.uji.es/vj1221/assets/textures/";
  var texFilenames = ["stone_9290068.JPG","wood_1163214.JPG"];

  for (var texturePos = 0; texturePos < texFilenames.length; texturePos++) {
  
    // creo el objeto textura
    texturesId[texturePos] = gl.createTexture();
    texturesId[texturePos].loaded = false;
    
    // solicito la carga de la textura
    loadTextureFromServer(serverUrl+texFilenames[texturePos], texturePos);
    
  }

}

// function mouseMove(event){
//   mouse.x = (event.clientX/window.innerWidth) * 2 - 1;
//   mouse.y = - (event.clienY/window.innerHeight) * 2 + 1;
// }

// function parteClick(){
//   raycaster.setFromCamera(mouse, modelViewMatrix);
//   const intersects = raycaster.intersectsObjects(scene.children);
//   for(let i = 0; i<intersects.length; i++){
//     alert('ey');
//   }
// }

function initWebGL() {
    
  gl = getWebGLContext();
    
  // if (!gl) {
  //   alert("WebGL 2.0 no está disponible");
  //   return;
  // }
    
  initShaders();
  initPrimitives();
  initRendering();
  initTextures();
  // mouseMove();
  // parteClick();

}

initWebGL();

const show_info = document.getElementById('show_webgl')
const hide_info = document.getElementById('hide_webgl')
const webgl_info = document.getElementById('webgl_info')
const webgl_info2 = document.getElementById('webgl_info2')

show_info.addEventListener('click', ()=>{
  webgl_info.style.display = 'flex';
  webgl_info2.style.display = 'flex';
  show_info.style.display = 'none';
  hide_info.style.display = 'flex';
})

hide_info.addEventListener('click', ()=>{
  webgl_info.style.display = 'none';
  webgl_info2.style.display = 'none';
  hide_info.style.display = 'none';
  show_info.style.display = 'flex';
})