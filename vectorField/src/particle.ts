import { Vector2D } from "./vector";
import { force } from "./feild";

export class Particle {
    x: number;
    y: number;
    v: Vector2D;
    Fx: force;
    Fy: force;

    constructor(x: number, y: number, v: Vector2D, Fx: force, Fy: force) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.Fx = Fx;
        this.Fy = Fy;
    }

    update(canvas: HTMLCanvasElement) {
        this.v.x = this.Fx(this.x, this.y);
        this.v.y = this.Fy(this.x, this.y);
        this.x += this.v.x * 1;
        this.y += this.v.y * 1;

        if (Math.sqrt(this.v.x * this.v.x + this.v.y * this.v.y) < 0.01) {
            this.x = Math.random() * canvas.width - canvas.width / 2;
            this.y = Math.random() * canvas.height - canvas.height / 2;
        }
    }

    draw(
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
        gridSize: number
    ) {
        ctx.beginPath();
        ctx.arc(
            this.x + canvas.width / 2 + gridSize / 2,
            this.y + canvas.height / 2 + gridSize / 2,
            3,
            0,
            2 * Math.PI,
            false
        );
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
        ctx.fillStyle = "#FF0000";
        ctx.fill();
    }
}
