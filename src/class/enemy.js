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
        this.moveSpeed = 5;
    }

    draw() {
        c.fillStyle = 'red';
        // c.fillRect(
        //     this.position.x,
        //     this.position.y,
        //     this.width,
        //     this.height
        // );

        c.beginPath();
        c.arc(
            this.center.x,
            this.center.y,
            this.radius,
            0, // starting radians
            Math.PI * 2 // ending radians
        )
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

        this.velocity.x = Math.cos(angle);
        this.velocity.y = Math.sin(angle)

        // move the enemy that much
        this.position.x += this.velocity.x * this.moveSpeed;
        this.position.y += this.velocity.y * this.moveSpeed;
        this.center = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        }

        if(
            // prevent out of bounds errors
            this.curWaypoint < waypoints.length - 1 &&
            // round both values to integers since they would be slightly off as floating points otherwise
            Math.round(this.center.x) === Math.round(waypoint.x) &&
            Math.round(this.center.y) === Math.round(waypoint.y)
        ) {
            this.curWaypoint += 1;
        }
    }
}
