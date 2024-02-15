import { c } from "../canvas.js";

export default class Projectile {
    constructor({
        position={x:0, y:0},
        enemy,
    }) {
        this.position = position;
        this.velocity = { x:0, y:0},
        this.enemy = enemy;
        this.radius = 10;
        this.moveSpeed = 5;
        this.image = new Image();
        this.image.src = '/assets/tilesets/projectile.png';
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y
        );
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
