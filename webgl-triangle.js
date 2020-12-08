
  document.body = document.createElement("body");

  var canvas = document.createElement("CANVAS");
  canvas.setAttribute("id", "canvas");
  document.body.appendChild(canvas);
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

// set background color
    const gl = canvas.getContext('webgl2');
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

//write shader
	var vertexShaderData = `#version 300 es
	precision mediump float;
	in vec2 position;
	void main(){
		gl_Position = vec4(position,0.0,1.0);
	}`;


	var fragmentShaderData = `#version 300 es
	precision mediump float;
	out vec4 color;
	void main () {
		color = vec4(0.0,1.0,0.0,1.0);
	}`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexShaderData);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentShaderData);
    gl.compileShader(fragmentShader);

//create program from shader
    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program)

//create buffer

    const coordinates = [-1.0,-1.0,0.0,1.0,1.0,-1.0];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordinates), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

//link shader to buffer
    gl.useProgram(program); 
    var position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(position, 2 , gl.FLOAT, gl.FALSE,0,0);


    gl.drawArrays(gl.TRIANGLES, 0, 3);


