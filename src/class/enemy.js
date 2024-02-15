import { waypoints } from "../waypoints.js";
import { c } from "../canvas.js";

// Enemy Class Definition
export default class Enemy {
    constructor({
        position={x:0, y:0},
    }) {
        this.position = position;
        this.width = 100;
        this.height = 100;
        this.curWaypoint = 0;
        this.center = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        },
        this.radius = 50;
        this.health = 100;
        this.velocity = { x:0, y:0 };
        this.moveSpeed = 1; // working on increasing movement speed
    }

    draw() {

        // Enemy sprite
        c.beginPath();
        c.arc(
            this.center.x,
            this.center.y,
            this.radius,
            0, // starting radians
            Math.PI * 2 // ending radians
        )
        c.fillStyle = 'red';
        c.fill();

        // Max health bar
        c.fillStyle = 'red';
        c.fillRect(
            this.position.x,
            this.position.y - 15,
            this.width,
            10
        );

        // Remaining health bar
        c.fillStyle = 'green';
        c.fillRect(
            this.position.x,
            this.position.y - 15,
            this.width * this.health / 100,
            10
        );
    }

    update() {
        this.draw();

        // this calculation finds the angle to the next waypoint using trig
        const waypoint = waypoints[this.curWaypoint];
        const yDist = waypoint.y - this.center.y;
        const xDist = waypoint.x - this.center.x;
        const angle = Math.atan2(yDist, xDist);

        this.velocity.x = Math.cos(angle) * this.moveSpeed;
        this.velocity.y = Math.sin(angle) * this.moveSpeed;

        // move the enemy that much
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.center = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        }

        if(
            // prevent out of bounds errors
            this.curWaypoint < waypoints.length - 1 &&
            // round both values to integers since they would be slightly off as floating points otherwise
            // rememebr that velocity is starts at a range of -1 to 1, so 1 * moveSpeed (3)
            // would give us a range we need to be in (within 3 pixels)
            Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y)
        ) {
            this.curWaypoint += 1;
        }
    }
}
