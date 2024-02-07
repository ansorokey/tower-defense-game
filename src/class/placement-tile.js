import { GLOBAL } from "../global.js";
import { c } from "../canvas.js";

// Where the player can place a building
export default class PlacementTile {
    constructor({
        position = {x:0, y:0},
    }) {
        this.position = position;
        this.size = GLOBAL.TILE_SIZE;
        this.color = 'rgba(255, 255, 255, 0.25)';
        this.isOccupied = false;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(
            this.position.x,
            this.position.y,
            this.size,
            this.size
        )
    }

    update(mouse) {
        this.draw()

        // check if the mouse is on this sprite
        if(
            mouse.x > this.position.x &&
            mouse.x < this.position.x + this.size &&
            mouse.y > this.position.y &&
            mouse.y < this.position.y + this.size
        ) {
            this.color = 'green';
        } else {
            this.color = 'rgba(255, 255, 255, 0.25)';
        }
    }
}
