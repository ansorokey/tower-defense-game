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
        this.projectiles = [];
        this.radius = 250; // the attack range
        this.target;
        this.frames = 0;
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

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

    update() {
        this.draw();
        this.frames += 1;

        if(this.frames % 100 === 0 && this.target) {
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.center.x,
                        y: this.center.y
                    },
                    enemy: this.target
                })
            )
        }
    }
}
