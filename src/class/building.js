import { c } from "../canvas.js";
import { GLOBAL } from "../global.js";
import Projectile from "./projectile.js";

export default class Building{
    constructor({
        position = {
            x: 0,
            y: 0
        },
        enemies=[]
    }) {
        this.position = position;
        this.width = GLOBAL.TILE_SIZE * 2;
        this.height = GLOBAL.TILE_SIZE;
        this.center = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        }
        this.projectiles = [
            new Projectile({
                position: {
                    x: this.center.x,
                    y: this.center.y
                },
                enemy: enemies[0]
            })
        ];
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
}
