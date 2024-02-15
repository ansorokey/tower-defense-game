import { c } from "../canvas.js";

export default class Sprite {
    constructor({
        imageSrc,
        position={x:0,y:0},
        frames={
            max: 1,
            current: 1
        }
    }) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
        this.frames = frames;
    }

    draw() {
        const cropWidth = this.image.width / this.frames.max;
        const crop = {
            position: {
                x: cropWidth * this.frames.current,
                y: 0
            },
            width: cropWidth,
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
