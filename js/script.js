"use strict";
var ctx, canvas;
var PARAM_C = 1, 
    PARAM_D = 1, 
    SIZE = 2, 
    T_INTERVAL = .0001;

var mobileScreen = false, colorize = false;

function init() {
    if (screen.width >= 375 && screen.width <= 667) {
        mobileScreen = true;
    }
    if (!mobileScreen) {
        window.addEventListener('resize', onWindowResize);
    }
    
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
    
    if (mobileScreen) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 400;
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#00FF7F";
    ctx.fillStyle = "#00FF7F";
}

function beginCurve() {
    var t = Math.PI * 13.334;

    var r = Math.floor(Math.random()*155),
        g = Math.floor(Math.random()*155),
        b = Math.floor(Math.random()*155);

    setInterval(() => {
        if (colorize) {
            r += Math.random() > 0.5 ? 1 : -1;
            g += Math.random() > 0.5 ? 1 : -1;
            //b += Math.random() > 0.5 ? 1 : -1;
            var newColor = `rgba(${100 + r % 155},${100 + g % 155},${100 + b % 155},1)`;
            ctx.fillStyle = newColor;
        }

        t = plotLissajous(t);
    }, 2);
}

function plotLissajous(t) {
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var speed = document.getElementById("speed").value;

    var xAmplitude = canvas.width * 0.465;
    var yAmplitude = canvas.height * 0.45;
    var allPoints = !mobileScreen ? Math.floor(speed * 200) : Math.floor(speed * 100);

    for (var n = 0; n < allPoints; n++) {
        var x = xAmplitude * Math.sin(t*a + PARAM_C);
        var y = yAmplitude * Math.sin(t*b + PARAM_D);
        drawPoint(x, y);
        t += !mobileScreen ? T_INTERVAL : T_INTERVAL * 2;
    }

    return t;
}

function drawPoint(x, y) {
    var xCenter = canvas.width * 0.5;
    var yCenter = canvas.height * 0.5;

    ctx.beginPath();
    ctx.arc(xCenter + x, yCenter + y, SIZE/2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function reset() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    console.log(document.getElementById("a").value);
    console.log(document.getElementById("b").value);
    console.log("~~~");
}

function toggleColorize() {
    colorize = !colorize;
    var colorButton = document.getElementById('colorizeButton');

    if (!colorize) {
        colorButton.style.backgroundColor = "#d3d3d3";
        colorButton.style.border = "none";
        ctx.strokeStyle = "#00FF7F";
        ctx.fillStyle = "#00FF7F";
    } else {
        colorButton.style.backgroundColor = "white";
        colorButton.style.border = "1px solid #d3d3d3";
    }
}

init();