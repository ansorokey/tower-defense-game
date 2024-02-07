import { c } from "../canvas.js";
import { GLOBAL } from "../global.js";

export default class Building{
    constructor({
        position = {
            x: 0,
            y: 0
        }
    }) {
        this.position = position;
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(
            this.position.x,
            this.position.y,
            GLOBAL.TILE_SIZE * 2,
            GLOBAL.TILE_SIZE
        )
    }
}
