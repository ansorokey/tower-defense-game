import { c } from "../canvas.js";
import { GLOBAL } from "../global.js";
import Projectile from "./projectile.js";
import Sprite from "./sprite.js";

export default class Building extends Sprite {
    constructor({
        position = {
            x: 0,
            y: 0
        },
        enemies=[]
    }) {
        super({
            position,
            imageSrc:'/assets/tilesets/tower.png',
            frames: {
                max: 19
            },
            offset: {
                x: 0, y: -80
            }
        })

        this.width = GLOBAL.TILE_SIZE * 2;
        this.height = GLOBAL.TILE_SIZE;
        this.center = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        }
        this.projectiles = [];
        this.radius = 250; // the attack range
        this.target;
    }

    draw() {
        super.draw();

        // draws the tower radius
        c.fillStyle = 'rgba(0, 0, 0, 0.25)';
        c.beginPath();
        c.arc(
            this.center.x,
            this.center.y,
            this.radius, // radius
            0, //starting radians
            Math.PI * 2 // ending radians
        )
        c.fill();
    }

    shoot() {
        this.projectiles.push(
            new Projectile({
                position: {
                    x: this.center.x - 20,
                    y: this.center.y - 110
                },
                enemy: this.target
            })
        )
    }

    update() {
        this.draw();

        // remember that a frame is held for x number of frames
        // that would result in x projectiles being shot until that frame changes
        if(
            this.target && this.frames.current === 6 &&
            this.frames.elapsed % this.frames.hold === 0
        ) {
            this.shoot();
        }
    }
}
