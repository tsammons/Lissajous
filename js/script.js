"use strict";
var ctx, canvas;
var a, b;

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    canvas.width = window.innerWidth-100;
    canvas.height = window.innerHeight;//-100;
    ctx.lineWidth=10;
    ctx.strokeStyle="#FF0000";
    ctx.fillStyle="black";
}

function sinCurve(x) {
    var i = x*10;
    var y = Math.sin(x)*10;
    y = y-400;

    for (var n = 0; n < 150; n++) {
	ctx.fillRect((canvas.width/2+i),(canvas.height/2+y),1,1);
	y = y+5;
    }
    x = x+0.1;
    return x;
}

function lissajous(x) {
    var i;
    var y;
    
    //var a = 12.25;
    //var b = 11.25;
    a = document.getElementById("a").value;
    b = document.getElementById("b").value;
    var c = 1;
    var d = 1;
    var speed =document.getElementById("speed").value;
    var size = 2;

    for (var n = 0; n < speed*100; n++) {
	i = (canvas.width*0.5)*Math.sin(a*x+c);
	y = (canvas.height*0.495)*Math.sin(b*x+d);
	ctx.fillRect((canvas.width/2+i),(canvas.height/2+y),size,size);
	x+=.0002;
    }


    return x;
}

function reset() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    console.log(a);
    console.log(b);
    console.log("~~~");
}

function go() {
    var n = -22*Math.PI;
    var end = setInterval(function() { n = sinCurve(n);}, 10);
}

function go2() {
    var n = Math.PI/4;
    var end = setInterval(function() { n = lissajous(n);}, 2);
}



init();
go2();