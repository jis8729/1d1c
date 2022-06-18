const canvas = document.getElementById("canvas");
export class Car {
    constructor(vel, pos) {
        this.vel = vel;
        this.pos = pos;
        this.accel = { x: 0, y: 0 };
        this.height = 20;
        this.width = 20;
    }
    update(box, dt) {
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
    draw(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    handleBoxCollision(box) {
        if (this.pos.x <= box.left.x ||
            this.pos.x + this.width >= box.right.x) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y <= box.bottom.y ||
            this.pos.y + this.height >= box.top.y) {
            this.vel.y = -this.vel.y;
        }
    }
    handleCarCollision(car) {
        car.forEach((element) => { });
    }
}
