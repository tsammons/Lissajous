"use strict";

var ctx, canvas;
var PARAM_C = 1, 
    PARAM_D = 1, 
    SIZE = 2, 
    T_INTERVAL = .0002;

function init() {
    window.addEventListener('resize', onWindowResize);
    setupCanvas();
    beginCurve();
}

function onWindowResize(event) {
    setupCanvas()
    reset();
}

function setupCanvas() {
    canvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    canvas.width = window.innerWidth - 125;
    canvas.height = window.innerHeight;
    ctx.lineWidth=10;
    ctx.strokeStyle="#FF0000";
    ctx.fillStyle="#00FF00";
}

function beginCurve() {
    var t = Math.PI * 0;

    setInterval(() => {
        t = plotLissajous(t);
    }, 2);
}

function plotLissajous(t) {
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var speed = document.getElementById("speed").value;

    var xAmplitude = canvas.width * 0.465;
    var yAmplitude = canvas.height * 0.45;

    for (var n = 0; n < speed*100; n++) {
        var x = xAmplitude * Math.sin(t*a + PARAM_C);
        var y = yAmplitude * Math.sin(t*b + PARAM_D);
        drawPoint(x, y);
        t += T_INTERVAL;
    }

    return t;
}

function drawPoint(x, y) {
    var xCenter = canvas.width * 0.5;
    var yCenter = canvas.height * 0.5;
    ctx.fillRect(xCenter + x, yCenter + y, SIZE, SIZE)
}

function reset() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    console.log(document.getElementById("a").value);
    console.log(document.getElementById("b").value);
    console.log("~~~");
}

init();