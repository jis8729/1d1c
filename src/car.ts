const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
) as HTMLCanvasElement;

interface vector2D {
    x: number;
    y: number;
}

export interface boxBoundary {
    left: vector2D;
    right: vector2D;
    bottom: vector2D;
    top: vector2D;
}

export class Car {
    private accel: vector2D;
    private height: number;
    private width: number;

    constructor(private vel: vector2D, private pos: vector2D) {
        this.accel = { x: 0, y: 0 };
        this.height = 20;
        this.width = 20;
    }

    update(box: boxBoundary, dt: number) {
        this.accel.y = 9.8 * 100;
        this.vel = {
            x: this.vel.x + this.accel.x * dt,
            y: this.vel.y + this.accel.y * dt,
        };
        this.pos = {
            x: this.pos.x + this.vel.x * dt,
            y: this.pos.y + this.vel.y * dt,
        };
        this.handleBoxCollision(box);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    private handleBoxCollision(box: boxBoundary) {
        if (
            this.pos.x <= box.left.x ||
            this.pos.x + this.width >= box.right.x
        ) {
            this.vel.x = -this.vel.x;
        }
        if (
            this.pos.y <= box.bottom.y ||
            this.pos.y + this.height >= box.top.y
        ) {
            this.vel.y = -this.vel.y;
        }
    }

    private handleCarCollision(car: Car[]) {
        car.forEach((element) => {});
    }
}
