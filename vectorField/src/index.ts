import { Field } from "./feild";
import { Particle } from "./particle";
import { Vector2D } from "./vector";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const gridSize = 30;

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "#000000";

const field = new Field(
    Math.round(canvas.width / gridSize),
    Math.round(canvas.height / gridSize),
    canvas.width,
    canvas.height
);

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

window.onresize = function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (field)
        field.makeField(
            Math.round(canvas.width / gridSize),
            Math.round(canvas.height / gridSize),
            canvas.width,
            canvas.height
        );
};

window.onmousemove = function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
};

const scale = 0.005;

field.Fx = (x: number, y: number) => {
    x *= scale;
    y *= scale;
    //return -Math.sin(x + y) * 1 + y;

    //return 0.1 + x / 2;
    return Math.sin(x + y);
};

field.Fy = (x: number, y: number) => {
    x *= scale;
    y *= scale;
    //return -Math.sin(x + y) * 1 + x;

    //return -1 * (x - 1);
    return Math.cos(x - y);
};

let particles: Particle[] = [];
for (let i = 0; i < 5000; i++) {
    particles.push(
        new Particle(
            Math.random() * canvas.width - canvas.width / 2,
            Math.random() * canvas.height - canvas.height / 2,
            new Vector2D(0, 0),
            field.Fx,
            field.Fy
        )
    );
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    field.drawField(ctx);

    for (let particle of particles) {
        particle.update(canvas);
        particle.draw(ctx, canvas, gridSize);
    }
    requestAnimationFrame(animate);
}

animate();
