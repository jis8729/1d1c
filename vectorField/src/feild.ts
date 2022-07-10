import { Vector2D } from "./vector";
export type force = (x: number, y: number) => number;

export class Field {
    field: Vector2D[][];
    xCount: number;
    yCount: number;
    width: number;
    height: number;
    Fx: force;
    Fy: force;

    constructor(xCount: number, yCount: number, width: number, height: number) {
        this.field = this.makeField(xCount, yCount, width, height);
        this.xCount = xCount;
        this.yCount = yCount;
        this.width = width;
        this.height = height;
        this.Fx = () => 0;
        this.Fy = () => 0;
    }

    makeField(xCount: number, yCount: number, width: number, height: number) {
        let result: Vector2D[][] = new Array(yCount);

        for (let j = 0; j < yCount; j++) {
            result[j] = new Array(xCount);
            for (let i = 0; i < xCount; i++) {
                let x = (i * width) / xCount - width / 2;
                let y = (j * height) / yCount - height / 2;
                result[j][i] = new Vector2D(
                    x + width / xCount / 2,
                    y + height / yCount / 2
                );
            }
        }
        return result;
    }

    drawArrow(
        ctx: CanvasRenderingContext2D,
        offset_x: number,
        offset_y: number,
        len: number,
        theta: number
    ) {
        const vector1 = new Vector2D(len, 0);
        const vector2 = new Vector2D(len, len / 5);
        const vector3 = new Vector2D(len, -len / 5);

        vector1.roatate(theta);
        vector2.roatate(theta);
        vector3.roatate(theta);

        ctx.beginPath();
        ctx.moveTo(offset_x, offset_y);
        ctx.lineTo(offset_x + vector1.x, offset_y + vector1.y);
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = len / 10;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(offset_x + vector1.x * 1.3, offset_y + vector1.y * 1.3);
        ctx.lineTo(offset_x + vector2.x, offset_y + vector2.y);
        ctx.lineTo(offset_x + vector3.x, offset_y + vector3.y);
        ctx.fillStyle = "#00FF00";
        ctx.fill();
    }

    drawField(ctx: CanvasRenderingContext2D) {
        let thetas: number[][] = new Array(this.yCount);
        let lengths: number[][] = new Array(this.yCount);
        let len_max = 0;
        let len_min = 0;

        for (let j = 0; j < this.yCount; j++) {
            thetas[j] = new Array(this.field[j].length);
            lengths[j] = new Array(this.field[j].length);
            for (let i = 0; i < this.xCount; i++) {
                let theta = Math.atan2(
                    this.Fy(this.field[j][i].x, this.field[j][i].y),
                    this.Fx(this.field[j][i].x, this.field[j][i].y)
                );
                let length = Math.sqrt(
                    this.Fy(this.field[j][i].x, this.field[j][i].y) *
                        this.Fy(this.field[j][i].x, this.field[j][i].y) +
                        this.Fx(this.field[j][i].x, this.field[j][i].y) *
                            this.Fx(this.field[j][i].x, this.field[j][i].y)
                );

                thetas[j][i] = theta;
                lengths[j][i] = length;

                if (length > len_max) len_max = length;
                if (length < len_min) len_min = length;
            }
        }

        for (let j = 0; j < this.yCount; j++) {
            for (let i = 0; i < this.xCount; i++) {
                let normalized =
                    (lengths[j][i] - len_min) / (len_max - len_min);

                let length = (this.width / this.xCount) * 0.7 * normalized;
                if (length < this.width / this.xCount / 4)
                    length = this.width / this.xCount / 4;
                this.drawArrow(
                    ctx,
                    this.field[j][i].x + this.width / 2,
                    this.field[j][i].y + this.height / 2,
                    length,
                    thetas[j][i]
                );
            }
        }
    }
}
