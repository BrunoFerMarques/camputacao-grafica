function main(){
    drawClown()
    drawFlower()
    drawCar()
}



function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
    return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
    return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}


function setTriangleVertices(gl, x1, y1, x2, y2, x3, y3) {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1, // Primeiro vértice
    x2, y2, // Segundo vértice
    x3, y3  // Terceiro vértice
    ]), gl.STATIC_DRAW);
}

function setTriangleColor(gl, color){
    const colorData = []
    for(let i = 0; i < 3; i++){
    colorData.push(...color)
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW); 
}
function setRectangleVertices(gl, x, y, width, height) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
    ]), gl.STATIC_DRAW);
}

function setRectangleColor(gl, color) {
    colorData = [];
    for (let triangle = 0; triangle < 2; triangle++) {
    for(let vertex=0; vertex<3; vertex++)
    colorData.push(...color);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

function setCircleVertices(gl, n, radius, centerX, centerY) {
    const vertexData = [];
    for (let i = 0; i < n; i++) {
    vertexData.push(centerX, centerY);
    vertexData.push(
    centerX + radius * Math.cos(i * (2 * Math.PI) / n),
    centerY + radius * Math.sin(i * (2 * Math.PI) / n)
    );
    vertexData.push(
    centerX + radius * Math.cos((i + 1) * (2 * Math.PI) / n),
    centerY + radius * Math.sin((i + 1) * (2 * Math.PI) / n)
    );
    }   
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}




function setCircleColor(gl,n,color){
    colorData = [];
    for (let triangle = 0; triangle < n; triangle++) {
    for(let vertex=0; vertex<3; vertex++)
    colorData.push(...color);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

function drawFlower(){
    const canvas = document.getElementById('flower')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
    const gl = canvas.getContext('webgl2');
    gl.viewport(0, 0, canvas.width, canvas.height)
    if (!gl) {
    throw new Error('WebGL not supported');
    }


    const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const colorLocation = gl.getAttribLocation(program, `color`);
    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.clearColor( 1, 0, 1, 0.4);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //caule
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, 0.01,-1, 0.03, 1)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [0, 1, 0])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    //petala
    const n = 80 
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl,n, 0.04, 0.02, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1, 215/255,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl, n, 0.05, 0.1, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1, 0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl,n,0.05, 0.09, -0.05)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1,0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl, n, 0.05, 0.02, -0.075)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1, 0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl, n, 0.05, -0.055, -0.045)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1, 0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl, n, 0.05, -0.05, -0.05)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1, 0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl, n, 0.05, -0.055, 0.0)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1, 0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl, n, 0.05, -0.045, 0.05)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1, 0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl, n, 0.05, 0.085, 0.06)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1, 0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setCircleVertices(gl, n, 0.05, 0.02, 0.085)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setCircleColor(gl, n, [1, 0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3* n)
}


function drawClown(){
    const canvas = document.getElementById('clown')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight

    const gl = canvas.getContext('webgl2');

    if (!gl) {
    throw new Error('WebGL not supported');
    }


    const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const colorLocation = gl.getAttribLocation(program, `color`);
    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.clearColor(0, 0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //cabelo
    //cabelo esquerdo cima
    const cabeloesqCima = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, cabeloesqCima, 0.30, -0.6, 0.3); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, cabeloesqCima, [250/255, 0, 0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * cabeloesqCima)
    //
     //cabelo esquerdo baixo
    const cabeloesqBaixo = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, cabeloesqBaixo, 0.30, -0.6, -0.1); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, cabeloesqBaixo, [250/255, 0, 0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * cabeloesqBaixo)
    //
    //cabelo direito cima
    const cabelodirCima = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, cabelodirCima, 0.30, 0.6, 0.3); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, cabelodirCima, [250/255, 0, 0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * cabelodirCima)
    //
    //cabelo direito baixo
    const cabelodirBaixo = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, cabelodirBaixo, 0.30, 0.6, -0.1); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, cabelodirBaixo, [250/255, 0, 0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * cabelodirBaixo)
    //

    //cabeça
    const g = 80;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, g, 0.7, 0, 0); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, g, [1,1,1]); // Usando g
    gl.drawArrays(gl.TRIANGLES, 0, 3 * g);
    //


    //boca
    //externo
    const bocaExt = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, bocaExt, 0.25, 0, -0.4); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, bocaExt, [1,1,1]); // Usando boca
    gl.drawArrays(gl.TRIANGLES, 0, 3 * bocaExt)
    //
    //interno
    const boca = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, boca, 0.2, 0, -0.4); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, boca, [1,0,0]); // Usando boca
    gl.drawArrays(gl.TRIANGLES, 0, 3 * boca)
    //mais interno
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.2, -0.4, 0.4, 0.016)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [0, 0, 0])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    //
    //


    //olho direito
    //mais externo
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setTriangleVertices(gl, 0.24, 0.17, 0.44, 0.2, 0.34, 0.4)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setTriangleColor(gl, [1,1,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    //
    //externo
    const olhodirExt = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, olhodirExt, 0.1, 0.34, 0.2);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, olhodirExt, [0,1,0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * olhodirExt)
    //
    //interno
    const olhodir = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, olhodir, 0.05, 0.34, 0.2);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, olhodir, [0,0,0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * olhodir)
    //
    //
    //olho esquerdo

    //mais externo
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setTriangleVertices(gl, -0.24, 0.17, -0.44, 0.2, -0.34, 0.4)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setTriangleColor(gl, [1,1,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    //
    //externo
    const olhoesqExt = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, olhoesqExt, 0.1, -0.34, 0.2);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, olhoesqExt, [0,1,0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * olhoesqExt)
    //
    //olho
    const olhoesq = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, olhoesq, 0.05, -0.34, 0.2);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, olhoesq, [0,0,0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * olhoesq)
    //

    //nariz, fazer um triangulo e em cima o nariz vermelho
    //triangulo
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setTriangleVertices(gl, 0, 0.3, -0.1, -0.1, 0.1, -0.1)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setTriangleColor(gl, [1,1,0])
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    //
    //circulo
    const nariz = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, nariz, 0.15, 0.0, -0.01); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, nariz, [250/255, 0, 0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * nariz)
    //
    //

    //bochechas
    //dir
    const bochechas = 60; 
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, nariz, 0.08, 0.34, -0.05); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, nariz, [250/255, 95/255, 71/255]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * nariz)
    //
    //esq
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, nariz, 0.08, -0.34, -0.05); // Centralizado
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, nariz, [250/255, 95/255, 71/255]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * nariz)
    //
    //

    // fazer chapeu, 2 retangulos
    //parte de baixo
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.4, 0.6, 0.8, 0.1)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [0,0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    //
    //parte de cima
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.2, 0.7, 0.4, 0.2)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [0,0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    //
    //detalhe no chapeu
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.2, 0.73, 0.4, 0.05)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [192/255, 192/255, 192/255])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    //
    //

}

function drawCar(){
    const canvas = document.getElementById("car")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
    const gl = canvas.getContext('webgl2');
  
    if (!gl) {
        throw new Error('WebGL not supported');
    }
  
    const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
    
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  
    var program = createProgram(gl, vertexShader, fragmentShader);
  
    gl.useProgram(program);
  
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    
    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  
    const colorLocation = gl.getAttribLocation(program, `color`);
    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
  
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    //ceu
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -1, -0.65, 2, 1.65)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [0,1,1])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
    //estrada
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -1, -1, 2, 0.35)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [64/255,64/255,64/255])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
    //chassi
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.4, -0.7, 0.8, 0.2)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [104/255,0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.2, -0.5, 0.4, 0.2)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [104/255,0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, 0.28, -0.7, 0.13, 0.04)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [156/255,156/255,156/255])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.28, -0.7, -0.12, 0.04)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [156/255,156/255,156/255])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
  
    //janela
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.18, -0.48, 0.16, 0.16)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [156/255,156/255,156/255])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, 0.02, -0.48, 0.16, 0.16)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [156/255,156/255,156/255])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
  
    //roda esq
    aberturaRoda = 40; // ou qualquer valor >= 3
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, aberturaRoda, 0.07, -0.22, -0.7);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, aberturaRoda, [64/255,64/255,64/255]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * aberturaRoda)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.23, -0.63, 0.022, -0.05)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [0,0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 6)  
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, aberturaRoda, 0.06, -0.22, -0.7);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, aberturaRoda, [0,0,0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * aberturaRoda)
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, aberturaRoda, 0.03, -0.22, -0.7);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, aberturaRoda, [212/255,211/255,211/255]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * aberturaRoda)
    //roda dir
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, aberturaRoda, 0.07, 0.2, -0.7);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, aberturaRoda, [64/255,64/255,64/255]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * aberturaRoda)
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, 0.19, -0.63, 0.02, -0.05)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [0,0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, aberturaRoda, 0.06, 0.2, -0.7);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, aberturaRoda, [0,0,0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * aberturaRoda)
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setCircleVertices(gl, aberturaRoda, 0.03, 0.2, -0.7);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl, aberturaRoda, [1,1,1]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3 * aberturaRoda)
  
    //lantena  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setTriangleVertices(gl, 0.38, -0.58, 0.4, -0.55, 0.4, -0.6)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [225/255,239/255,23/255])
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  
    //lanterna de tras
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.4, -0.6, 0.02, 0.06)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [1,0,0])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
    //detalhe na porta
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, 0.06, -0.55, 0.05, 0.02)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [156/255,156/255,156/255])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    setRectangleVertices(gl, -0.14, -0.55, 0.05, 0.02)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setRectangleColor(gl, [156/255,156/255,156/255])
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  
  
}
main();