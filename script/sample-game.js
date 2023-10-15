/*
WebGLUtils.resizeCanvasToDisplaySize(gl.canvas);
*/
function startRender() {
  const canvas = document.getElementById("container");
  var gl = canvas.getContext('webgl');
  if (!gl) gl = canvas.getContext('experimental-webgl');
  if (!gl) return;
  
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    250.0,  500.0, 0.0,
    0.0, 0.0, 0.0,
    500.0, 0.0, 0.0
  ]), gl.STATIC_DRAW);
  
  const shaderProgram = gl.createProgram();
  const vertexShaderSource = `
    uniform mat4 proj;
    attribute vec4 coordinates;
    void main(void) {
      gl_Position = proj * coordinates;
    }
  `;
  
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  gl.attachShader(shaderProgram, vertexShader);
  
  const fragmentShaderSource = `
    void main(void) {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `;
  
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);
  gl.attachShader(shaderProgram, fragmentShader);
  
  gl.linkProgram(shaderProgram);
  
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  
  gl.useProgram(shaderProgram);
  
  const uMat = gl.getUniformLocation(shaderProgram, "proj");
  gl.uniformMatrix4fv(uMat, false,  [
    2/canvas.width, 0, 0, 0,
    0, 2/canvas.height, 0, 0,
    0, 0, -0.01, 0,
    -1, -1, 0, 1]);
  
  const coord = gl.getAttribLocation(shaderProgram, "coordinates");
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coord);
  const render = function () {
    // Membersihkan layar
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Menggambar segitiga
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
  }
  render();
  setInterval(render, 16,66667);// 60 frame / 1000 ms
}
startRender();
