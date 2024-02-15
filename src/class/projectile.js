import { c } from "../canvas.js";
import Sprite from "./sprite.js";

export default class Projectile extends Sprite {
    constructor({
        position={x:0, y:0},
        enemy,
    }) {
        super({
            position,
            imageSrc:'/assets/tilesets/projectile.png'
        })

        this.enemy = enemy;
        this.velocity = { x:0, y:0},
        this.radius = 10;
        this.moveSpeed = 5;
    }

    update() {
        this.draw()

        // calculate its velocity from spawn to enemy
        const angle = Math.atan2(
            this.enemy.center.y - this.position.y,
            this.enemy.center.x - this.position.x
        );

        // ranges from -1 to 1
        this.velocity.x = Math.cos(angle) * this.moveSpeed;
        this.velocity.y = Math.sin(angle) * this.moveSpeed;

        //move that much
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
