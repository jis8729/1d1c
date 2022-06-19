import { Ball, vector2D } from "./ball.js";

const canvas = document.getElementById(
    "canvas"
) as HTMLCanvasElement;

canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext("2d");
const clientRect = canvas.getBoundingClientRect();
//const ball = new Ball({ x: 100, y: 20 }, { x: 50, y: 50 });

const box = {
    left: { x: 0, y: 0 },
    right: { x: canvas.width, y: 0 },
    bottom: { x: 0, y: 0 },
    top: { x: 0, y: canvas.height },
};

const fps = 60;
let delta;
let now;
let then = Date.now();
const interval = 1000 / fps;


let balls = new Array<Ball>;

for (let i = 0; i < 10; i++) {
    balls.push(new Ball({x: Math.random()*500, y: 0},{x: Math.random()*canvas.width, y: Math.random()*canvas.height/2}));
}

function addMouseEventListener() {
    let isMouseDown = false;
    let selected: Ball | null;
    let prevMouseX: number, prevMouseY: number;
    let prevAccel: vector2D;
    let prevTime: number;
    let dx: number;
    let dy: number;
    let dt: number;

    canvas.onmousedown = function (e) {
        const x = e.clientX - clientRect.left;
        const y = e.clientY - clientRect.top;

        prevMouseX = x;
        prevMouseY = y;
        prevTime = performance.now();
        isMouseDown = true;
        let ball: Ball;
        for (ball of balls) {
            if (ball.clicked(x, y)) {
                selected = ball;
                prevAccel = selected.getAccel();
                selected.setAccel({ x: 0, y: 0 });
                selected.setVel({ x: 0, y: 0 });
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
        const w = 10; // acceleration weight
        let velNorm = Math.sqrt((w*dx*dx) + (w*dy*dy))*fps;
        velNorm = Math.min(velNorm, 1000);
        let theta = Math.atan2(dy,dx);
        let velUnitVectX = Math.cos(theta);
        let velUnitVectY = Math.sin(theta);  

        selected?.setAccel(prevAccel);
        selected?.setVel({x: velNorm*velUnitVectX, y: velNorm*velUnitVectY});
        isMouseDown = false;
        selected = null;
    };

    window.onmouseup = function (e) {
        if (canvas.onmouseup) canvas.onmouseup(e);
    };
}

function animate() {
    let ball;
    now = Date.now();
    delta = now - then;
    
    if (delta >= interval) {
        then = now - (delta % interval);
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        for (ball of balls) {
            ball.update(box, balls, 1/fps);

            if (ctx) {
                ball.draw(ctx);
            }
        }
    }
    requestAnimationFrame(animate);
}

let button1 = document.getElementById("button1") as HTMLButtonElement;
let button2 = document.getElementById("button2") as HTMLButtonElement;
button1.onclick = function(e) {
    let ball: Ball;
    for (ball of balls) {
                ball.setAccel({ x: 0, y: 0 });
                ball.setVel({ x: 0, y: 0 });
    }
}
button2.onclick = function(e) {
    let ball: Ball;
    for (ball of balls) {
                ball.setAccel({ x: 0, y: 1000 });
                ball.setVel({ x: Math.random()*500, y: 0 });
    }
}
addMouseEventListener();
animate();
button1.click();
