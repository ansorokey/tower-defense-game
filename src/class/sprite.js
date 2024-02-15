import { c } from "../canvas.js";

export default class Sprite {
    constructor({
        imageSrc,
        position={x:0,y:0}
    }) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y
        )
    }
}
