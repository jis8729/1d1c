import { vectorRotation } from "./vector";
import { Vector2D } from "./vector";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const gridSize = 50;
const vectorArrowSize = 5;
const vectorLength = Math.sqrt(gridSize * gridSize) / 2;

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "#000000";

window.onresize = function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.onmousemove = function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
};

function drawArrow(
    offset_x: number,
    offset_y: number,
    len: number,
    theta: number
) {
    const vector1 = new Vector2D(len, 0);
    const vector2 = new Vector2D(len, len / 5);
    const vector3 = new Vector2D(len, -len / 5);

    vector1.roatate(theta);
    vector2.roatate(theta);
    vector3.roatate(theta);

    ctx.beginPath();
    ctx.moveTo(offset_x, offset_y);
    ctx.lineTo(offset_x + vector1.x, offset_y + vector1.y);
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(offset_x + vector1.x * 1.2, offset_y + vector1.y * 1.2);
    ctx.lineTo(offset_x + vector2.x, offset_y + vector2.y);
    ctx.lineTo(offset_x + vector3.x, offset_y + vector3.y);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
}

function drawField() {
    let xCount = canvas.width / gridSize;
    let yCount = canvas.height / gridSize;

    for (let j = 0; j < yCount; j++) {
        for (let i = 0; i < xCount; i++) {
            let x = (i * canvas.width) / xCount;
            let y = (j * canvas.height) / yCount;
            let theta = Math.atan2(mouseY - y, mouseX - x);
            drawArrow(x, y, vectorLength, theta);
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    requestAnimationFrame(animate);
}

animate();
