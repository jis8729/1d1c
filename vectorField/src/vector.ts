export class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this["x"] = x;
        this["y"] = y;
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

export function vectorRotation(x_0: number, y_0: number, theta: number) {
    let x_1 = Math.cos(theta) * x_0 - Math.sin(theta) * y_0;
    let y_1 = Math.sin(theta) * x_0 + Math.cos(theta) * y_0;

    return { x: x_1, y: y_1 };
}
