import { c } from "../canvas.js";

export default class Sprite {
    constructor({
        imageSrc,
        position={x:0,y:0},
        frames={
            max: 1,
        },
        offset={x:0,y:0}
    }) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            hold: 3
        };
        this.offset = offset;
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
            this.position.y + this.offset.y,
            crop.width,
            crop.height
        )
    }

    update() {
        // only change the animation frame every Xth frame
        this.frames.elapsed += 1;
        if(this.frames.elapsed % this.frames.hold === 0) {
            this.frames.current += 1;
            if(this.frames.current >= this.frames.max) {
                this.frames.current = 0;
            }
        }
    }
}
