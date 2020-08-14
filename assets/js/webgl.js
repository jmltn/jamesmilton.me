"use strict";
var fragShaderSource = "precision highp float;\n#define POINTS 3 // try between 2 and 256, gets slow fast\n#define PI 3.1415926536\n#define TAU (2.0 * PI)\nuniform vec2 u_resolution;\nuniform float u_time;\nuniform int u_shouldInvert;\nvec3 rgb(float r, float g, float b) {\n  return vec3(r / 256.0, g / 256.0, b / 256.0);\n}\nvec3 hsv2rgb(vec3 c) {\n    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\nvoid main() {\n  // These colors will come in to use at the end to help constrain the final\n  // output colors\n  vec3 col1 = hsv2rgb(vec3(0.7922, 0.5255, 0.9451));\n  vec3 col2 = hsv2rgb(vec3(0.2039, 0.2314, 0.2118));\n    \n  vec2 uv = gl_FragCoord.xy/u_resolution;\n  vec2 mouse = vec2(0.1, 1.0);\n  float bias = pow(10.0, (-0.5) * 20.0);\n  float power = 8.0;\n  float cN = 0.0;\n  // array used to store contributions in first loop\n  float contribution[POINTS];\n  for (int i = 0; i < POINTS; i++) {\n    float f = float(i) / float(POINTS) * TAU;\n    vec2 pos = 0.5 + 0.35 * vec2(\n      cos(-u_time * 0.15 + f+ float(i) * 0.1),\n      sin(u_time * 0.8 + f * 2.0) - float(i) * 0.1\n    );\n    pos = uv - pos;\n    float dist = length(pos);\n    // calculate contribution\n    float c = 1.0 / (bias + pow(dist, power));\n    contribution[i] = c;\n    // sum total contribution\n    cN += c;\n  }\n  // normalize contributions and weigh colors\n  vec3 col = vec3(0, 0, 0);\n  cN = 1.0 / cN;\n  for (int i = 0; i < POINTS; i++) {\n    float f = float(i) / float(POINTS) * TAU + u_time * 0.5;\n    vec3 pcol = 0.5 + 0.5 * sin(mix(col1, col2, f * 3.0));\n    col += contribution[i] * cN * pcol * mix(col1, col2, uv.y);\n  }\n  vec3 finalCol = u_shouldInvert == 0 ? col : 1.0 - col;\n  gl_FragColor = vec4(finalCol, 1.0);\n}";
var vertShaderSource = "attribute vec2 a_position;\nvoid main() {\n  gl_Position = vec4(a_position, 0, 1);\n}";
// We're going to use `then` to track the delta between rendered frames
var then = 0;
// And we're going to use `strikes` to track how many times the
// frame delta exceeds the tolerance.
var strikes = -1;
var tolerance = 100;
// Tracking the URL changes to reset performance checkers on page changes
var url;
var initialUrl;
function init(canvas) {
  initialUrl = url = window.location.toString();
  // These values will be mutated according to whether or not we can use
  // OffscreenCanvas
  var glCanvas;
  var ctx;
  canvas.width = canvas.clientWidth * 0.75;
  canvas.height = canvas.clientHeight * 0.75;
  // If we can use an OffscreenCanvas, we should. It's up to the User Agent
  // whether OffscreenCanvas work happens on the main thread. Ideally I'd use
  // a Web Worker for this, but I'm too dumb
  var offscreen = false;
  if ("OffscreenCanvas" in window) {
    glCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    offscreen = true;
    ctx = canvas.getContext("bitmaprenderer");
  } else
  {
    glCanvas = document.createElement("canvas");
    glCanvas.width = canvas.width;
    glCanvas.height = canvas.height;
    ctx = canvas.getContext("2d");
  }
  var gl = glCanvas.getContext("webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);
  // Create the buffer
  // This buffer just renders two triangles as a rectangle the size of the
  // canvas
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1.0,
  -1.0,
  1.0,
  -1.0,
  -1.0,
  1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  1.0]),
  gl.STATIC_DRAW);
  // Create the shaders
  // This vertex shader is dead simple and just returns its input attribute
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertShaderSource);
  gl.compileShader(vertexShader);
  // The fragment shader does a bunch of cool stuff, mostly rotating points,
  // coloring them, and constraining the output colors
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragShaderSource);
  gl.compileShader(fragmentShader);
  // Connect the shaders and program to the renderer
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  // Delete components early to improve performance
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  gl.deleteProgram(program);
  // Connect to the position attribute for the vertex shader
  var positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  // Set the resolution uniform and create a connection to the time uniform
  var resolution = [canvas.clientWidth, canvas.clientHeight];
  var resolutionPosition = gl.getUniformLocation(program, "u_resolution");
  var timePosition = gl.getUniformLocation(program, "u_time");
  var shouldInvertPosition = gl.getUniformLocation(program, "u_shouldInvert");
  var mql = window.matchMedia("(prefers-color-scheme: dark)");
  var shouldInvert = !mql.matches;
  mql.addListener(function (e) {
    if (e.matches) {
      shouldInvert = false;
    } else
    {
      shouldInvert = true;
    }
  });
  // Reset the spike counter when focusing away since requestAnimationFrame
  // doesn't tick on inactive windows anyway
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      strikes = -1;
    }
  });
  // The main render loop
  // First, we'll start a random seed to create a different starting scene on
  // each canvas mount
  var seed = Math.round(Math.random() * 20000);
  var running = true;
  function render(now) {
    // Early in the loop, we'll do some performance monitoring.
    var diff = now - then;
    then = now;
    // If the loop is lagging and the document is in focus, keep lags below
    // three strikes
    if (diff > tolerance && document.hasFocus()) {
      url = window.location.toString();
      // Only if the page URL has changed do we really need to worry about
      // FPS spikes
      if (url === initialUrl) {
        strikes++;
      } else
      {
        // Otherwise, reset the spike counter ready for the next mount
        strikes = -1;
      }
    }
    // Three strikes and we're out
    if (strikes >= 3) {
      cancelLoop();
      return;
    }
    // Clear GLSL canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Update GLSL attributes and uniforms
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2fv(resolutionPosition, resolution);
    gl.uniform1f(timePosition, now / 2000.0 + seed);
    gl.uniform1i(shouldInvertPosition, Number(shouldInvert));
    // Draw arrays
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    // Output image to canvas
    if (offscreen) {
      var frame = glCanvas.transferToImageBitmap();
      var castContext = ctx;
      castContext.transferFromImageBitmap(frame);
    } else
    {
      var castContext = ctx;
      castContext.drawImage(gl.canvas, 0, 0);
    }
    // Call the render loop again before the next pain cycle
    if (running) {
      window.requestAnimationFrame(render);
    }
  }
  function cancelLoop() {
    running = false;
  }
  // Kick off our render loop
  render(0);
  return { canceller: cancelLoop };
}
function renderWebGLLayer(canvas) {
  return init(canvas);
}
var canvas = document.getElementById("canvas");
renderWebGLLayer(canvas);
