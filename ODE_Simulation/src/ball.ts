export interface vector2D {
    x: number;
    y: number;
}
export interface boxBoundary {
    left: vector2D;
    right: vector2D;
    bottom: vector2D;
    top: vector2D;
}

export class Ball {
    vel: vector2D;
    pos: vector2D;
    radius: number;
    selected: boolean;
    wallCollide: boolean;
    g: number;

    constructor(pos: vector2D, vel: vector2D, radius: number, g: number) {
        this.pos = pos;
        this.radius = radius;
        this.vel = vel;
        this.selected = false;
        this.wallCollide = false;
        this.g = g;
    }

    update(
        box: boxBoundary,
        balls: Ball[],
        x: number,
        y: number,
        vx: number,
        vy: number
    ) {
        this.pos.x = x;
        this.pos.y = y;
        this.vel.x = vx;
        this.vel.y = vy;
        this.handleBoxCollision(box);
        this.handleBallCollision(balls);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "black";

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.strokeStyle = "FF0000";
        ctx.fill();
        ctx.stroke();
    }

    clicked(ptX: number, ptY: number): boolean {
        if (
            (this.pos.x - ptX) * (this.pos.x - ptX) +
                (this.pos.y - ptY) * (this.pos.y - ptY) <=
            this.radius * this.radius
        ) {
            return true;
        }
        return false;
    }

    getPos(): vector2D {
        return { x: this.pos.x, y: this.pos.y };
    }

    setPos(pt: vector2D) {
        this.pos.x = pt.x;
        this.pos.y = pt.y;
    }

    move(delta: vector2D) {
        this.pos.x = this.pos.x + delta.x;
        this.pos.y = this.pos.y + delta.y;
    }

    handleBallCollision(balls: Ball[]) {
        const self = this;

        for (let ball of balls) {
            if (ball === self) continue;

            const vector = {
                x: ball.pos.x - this.pos.x,
                y: ball.pos.y - this.pos.y,
            };

            const norm = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

            if (norm >= this.radius + ball.radius) continue;

            const unitVector = { x: vector.x / norm, y: vector.y / norm };
            const unitTangentVector = { x: -unitVector.y, y: unitVector.x };

            const v1n = unitVector.x * this.vel.x + unitVector.y * this.vel.y;
            const v1t =
                unitTangentVector.x * this.vel.x +
                unitTangentVector.y * this.vel.y;
            const v2n = unitVector.x * ball.vel.x + unitVector.y * ball.vel.y;
            const v2t =
                unitTangentVector.x * ball.vel.x +
                unitTangentVector.y * ball.vel.y;

            const v1nTag = { x: unitVector.x * v2n, y: unitVector.y * v2n };
            const v2nTag = { x: unitVector.x * v1n, y: unitVector.y * v1n };

            const v1tTag = {
                x: unitTangentVector.x * v1t,
                y: unitTangentVector.y * v1t,
            };
            const v2tTag = {
                x: unitTangentVector.x * v2t,
                y: unitTangentVector.y * v2t,
            };

            this.vel.x = v1nTag.x + v1tTag.x;
            this.vel.y = v1nTag.y + v1tTag.y;
            ball.vel.x = v2nTag.x + v2tTag.x;
            ball.vel.y = v2nTag.y + v2tTag.y;

            const minimumDist = (this.radius + ball.radius - norm) / norm;

            this.pos.x -= 0.5 * minimumDist * vector.x;
            this.pos.y -= 0.5 * minimumDist * vector.y;
            ball.pos.x += 0.5 * minimumDist * vector.x;
            ball.pos.y += 0.5 * minimumDist * vector.y;

            if (this.wallCollide) {
                if (Math.abs(this.vel.x) <= this.g) this.vel.x = 0;
                if (Math.abs(this.vel.y) <= this.g) this.vel.y = 0;
            }
            if (ball.wallCollide) {
                if (Math.abs(ball.vel.x) <= this.g) ball.vel.x = 0;
                if (Math.abs(ball.vel.y) <= this.g) ball.vel.y = 0;
            }
        }
    }

    handleBoxCollision(box: boxBoundary) {
        this.wallCollide = false;

        if (this.pos.x - this.radius < box.left.x) {
            if (Math.abs(this.vel.x) > this.g) {
                this.vel.x = Math.abs(this.vel.x);
            } else this.vel.x = 0;

            this.pos.x = box.left.x + this.radius;
            this.wallCollide = true;
        }
        if (this.pos.x + this.radius > box.right.x) {
            if (Math.abs(this.vel.x) > this.g)
                this.vel.x = -1 * Math.abs(this.vel.x);
            else this.vel.x = 0;
            this.pos.x = box.right.x - this.radius;
            this.wallCollide = true;
        }
        if (this.pos.y - this.radius < box.bottom.y) {
            if (Math.abs(this.vel.y) > this.g)
                this.vel.y = Math.abs(this.vel.y);
            else this.vel.y = 0;
            this.pos.y = box.bottom.y + this.radius;
            this.wallCollide = true;
        }
        if (this.pos.y + this.radius > box.top.y) {
            if (Math.abs(this.vel.y) > this.g)
                this.vel.y = -1 * Math.abs(this.vel.y);
            else this.vel.y = 0;
            this.pos.y = box.top.y - this.radius;
            this.wallCollide = true;
        }
    }
}
