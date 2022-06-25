export class ODESolver {
    constructor(m, g, b, h, c) {
        this.param = { m: m, g: g, b: b, h: h, c: c };
    }
    rk4(t, x, v, ode) {
        let h = this.param.h;
        let kx1 = v;
        let kv1 = ode(t, x, v, this.param);
        let kx2 = v + (h * kv1) / 2;
        let kv2 = ode(t + h / 2, x + (h * kx1) / 2, v + (h * kv1) / 2, this.param);
        let kx3 = v + (h * kv2) / 2;
        let kv3 = ode(t + h / 2, x + (h * kx2) / 2, v + (h * kv2) / 2, this.param);
        let kx4 = v + h * kv3;
        let kv4 = ode(t + h, x + h * kx3, v + h * kv3, this.param);
        let dx = (h * (kx1 + 2 * kx2 + 2 * kx3 + kx4)) / 6;
        let dv = (h * (kv1 + 2 * kv2 + 2 * kv3 + kv4)) / 6;
        return { x: x + dx, v: v + dv };
    }
    Fy(tVal, xVal, vVal, param) {
        // x'' = g - b/m * x' = F/m = a
        return param.g - (param.b / param.m) * vVal;
    }
    Fx(tVal, xVal, vVal, param) {
        // x'' = g - b/m * x' = F/m = a
        return -(param.b / param.m) * vVal;
    }
}
