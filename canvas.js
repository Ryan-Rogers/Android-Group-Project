var canvas;
var context;

// Canvas creation
canvas = document.createElement("canvas");
context = canvas.getContext("2d");
document.body.appendChild(canvas);

// At load time
window.onload = function() {
    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height);
};
