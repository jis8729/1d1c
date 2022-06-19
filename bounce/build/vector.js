"use strict";
// interface vector {
//     elements: number[];
//     l2_norm(): number;
//     dot(vector: vector): number;
//     multi(scalar: number): vector;
//     subtract(vector: vector): vector;
// }
// export class Vector2D implements vector {
//     elements: number[];
//     constructor(public x: number, public y: number) {
//         this.elements = [x, y];
//     }
//     l2_norm(): number {
//         var result = 0;
//         return Math.sqrt(
//             this.elements
//                 .map(function (element) {
//                     return element * element;
//                 })
//                 .reduce((prev, curr) => prev + curr)
//         );
//     }
//     dot(vector: Vector2D): number {
//         return this.elements
//             .map(function (element, index) {
//                 return element * vector.elements[index];
//             })
//             .reduce((prev, curr) => prev + curr);
//     }
//     multi(scalar: number): Vector2D {
//         const temp = this.elements.map(function (element) {
//             return element * scalar;
//         });
//         return new Vector2D(temp[0], temp[1]);
//     }
//     subtract(vector: vector): Vector2D {
//         const temp = this.elements.map(function (element, index) {
//             return element - vector.elements[index];
//         });
//         return new Vector2D(temp[0], temp[1]);
//     }
// }
// // let v1 = new Vector2D([1, 3]);
// // let v2 = new Vector2D([1, 2]);
// // const w1 = 2;
// // console.log(v1.l2_norm());
// // console.log(v1.dot(v2));
// // console.log(v2.multi(w1));
