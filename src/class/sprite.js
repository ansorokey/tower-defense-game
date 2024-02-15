import { c } from "../canvas.js";

export default class Sprite {
    constructor({
        imageSrc,
        position={x:0,y:0},
        frames={
            max: 1
        }
    }) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
        this.frames = frames;
    }

    draw() {
        const crop = {
            position: {
                x: 0,
                y: 0
            },
            width: this.image.width / this.frames.max,
            height: this.image.height,
        }

        c.drawImage(
            this.image,
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.position.x,
            this.position.y,
            crop.width,
            crop.height
        )
    }
}
