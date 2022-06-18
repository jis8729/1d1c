import { Car } from "./car.js";
const canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");
const car = new Car({ x: 200, y: 50 }, { x: 0, y: 0 });
const box = {
    left: { x: 0, y: 0 },
    right: { x: 500, y: 0 },
    bottom: { x: 0, y: 0 },
    top: { x: 0, y: 500 },
};
const fps = 120;
let now;
let then = Date.now();
const interval = 1000 / fps;
let delta;
function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        car.update(box, 1 / fps);
        if (ctx) {
            car.draw(ctx);
        }
    }
}
animate();
