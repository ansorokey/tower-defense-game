import { c } from "../canvas.js";

export default class Projectile {
    constructor({
        position={x:0, y:0},
    }) {
        this.position = position;
        this.velocity = { x:0, y:0}
    }

    draw() {
        c.beginPath();
        c.arc(
            this.position.x,
            this.position.y,
            10, // radius
            0, //starting radians
            Math.PI * 2 // ending radians
        )
        c.fillStyle = 'orange';
        c.fill();
    }
}
