export class Vector2D {
    x: number;
    y: number;
    theta: number;

    constructor(x: number, y: number) {
        this["x"] = x;
        this["y"] = y;
        this.theta = Math.atan2(this.y, this.x);
    }

    roatate(theta: number) {
        let x_1 = Math.cos(theta) * this.x - Math.sin(theta) * this.y;
        let y_1 = Math.sin(theta) * this.x + Math.cos(theta) * this.y;

        this.x = x_1;
        this.y = y_1;
    }

    translate(vector: Vector2D) {
        this.x += vector.x;
        this.y += vector.y;
    }

    getDivergence() {}
}
