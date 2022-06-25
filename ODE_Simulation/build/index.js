import { ODESolver } from "./solver.js";
import { Ball } from "./ball.js";
// HTML Canvas
const canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");
const clientRect = canvas.getBoundingClientRect();
// simulation environment
const fps = 60;
let delta;
let now;
let then = Date.now();
const interval = 1000 * 1 / fps;
// solver
const mass = 1;
const gravity = 9.8;
const drag = 0.05;
const h = 1 / fps * 10;
const box = {
    left: { x: 0, y: 0 },
    right: { x: canvas.width, y: 0 },
    bottom: { x: 0, y: 0 },
    top: { x: 0, y: canvas.height },
    radius: 20
};
let solver = new ODESolver(mass, gravity, drag, h, box);
// create balls
let balls = new Array;
for (let i = 0; i < 20; i++) {
    balls.push(new Ball({ x: Math.random() * canvas.width, y: Math.random() * canvas.height / 2 }, { x: Math.random() * 500, y: 0 }, box.radius, gravity));
    //balls.push(new Ball({x: 200, y: 200},{x: 0, y: 0}, box.radius));
}
// animation loop
let Ts = 0;
function animate() {
    let ball;
    let result;
    let x, y, vx, vy;
    now = Date.now();
    delta = now - then;
    if (delta >= interval) {
        then = delta;
        Ts = Ts + h;
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (ball of balls) {
            if (!ball.selected) {
                if ((canvas.height - ball.pos.y) + Math.sqrt(ball.vel.x * ball.vel.x + ball.vel.y * ball.vel.y) < 10) {
                }
                result = solver.rk4(Ts, ball.pos.y, ball.vel.y, solver.Fy);
                y = result.x;
                vy = result.v;
                result = solver.rk4(Ts, ball.pos.x, ball.vel.x, solver.Fx);
                x = result.x;
                vx = result.v;
                ball.update(box, balls, x, y, vx, vy);
            }
            if (ctx) {
                ball.draw(ctx);
            }
        }
    }
    requestAnimationFrame(animate);
}
// mouse event
function addMouseEventListener() {
    let isMouseDown = false;
    let selected;
    let prevMouseX, prevMouseY;
    let prevAccel;
    let prevTime;
    let dx;
    let dy;
    let dt;
    canvas.onmousedown = function (e) {
        const x = e.clientX - clientRect.left;
        const y = e.clientY - clientRect.top;
        prevMouseX = x;
        prevMouseY = y;
        prevTime = performance.now();
        isMouseDown = true;
        let ball;
        for (ball of balls) {
            if (ball.clicked(x, y)) {
                selected = ball;
                ball.selected = true;
                selected.vel.x = 0;
                selected.vel.y = 0;
                break;
            }
        }
    };
    canvas.onmousemove = function (e) {
        if (isMouseDown && selected) {
            let x = e.clientX - clientRect.left;
            let y = e.clientY - clientRect.top;
            let t = performance.now();
            dx = x - prevMouseX;
            dy = y - prevMouseY;
            dt = t - prevTime;
            let pos = selected.getPos();
            //ball.setPos({ x: pos.x + dx, y: pos.y + dy });
            selected.move({ x: dx, y: dy });
            prevMouseX = x;
            prevMouseY = y;
            prevTime = t;
        }
    };
    canvas.onmouseup = function (e) {
        const w = 1; // acceleration weight
        let velNorm = Math.sqrt((w * dx * dx) + (w * dy * dy)) * fps;
        velNorm = Math.min(velNorm, 500);
        let theta = Math.atan2(dy, dx);
        let velUnitVectX = Math.cos(theta);
        let velUnitVectY = Math.sin(theta);
        if (selected) {
            selected.vel.x = velNorm * velUnitVectX;
            selected.vel.y = velNorm * velUnitVectY;
        }
        isMouseDown = false;
        if (selected)
            selected.selected = false;
        selected = null;
    };
    window.onmouseup = function (e) {
        if (canvas.onmouseup)
            canvas.onmouseup(e);
    };
}
// execute
addMouseEventListener();
animate();
