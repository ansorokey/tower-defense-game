import { waypoints } from "./waypoints.js";
import { towerSpots } from "./towerSpots.js";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 768;

const mapImg = new Image();
mapImg.src = '/assets/tilesets/map.png';
// image loading is slightly async,
//so we use an onload function to initiate
mapImg.onload = () => {
    animate();
}

// Enemy Class Definition
class Enemy {
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
        }
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        this.draw();

        // this calculation finds the angle to the next waypoint using trig
        const waypoint = waypoints[this.curWaypoint];
        const yDist = waypoint.y - this.center.y;
        const xDist = waypoint.x - this.center.x;
        const angle = Math.atan2(yDist, xDist);

        // Rather than a static value,
        // we use the values above as the x and y velocity to move to the enxt point
        this.position.x += Math.cos(angle);
        this.position.y += Math.sin(angle);
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

const enemies = []
for(let i = 1; i < 11; i++) {
    // space enemies out from each other, stagger entrance
    const xOffset = i * 150;

    // add new enemy to array
    enemies.push(
        new Enemy({
            position: {
                // start them at the first waypoint
                x:waypoints[0].x - xOffset,
                y: waypoints[0].y
            }
        })
    )
}

function animate() {
    // the primary animation loop
    window.requestAnimationFrame(animate);

    // draw the background every frame
    c.drawImage(mapImg, 0, 0)

    // update the enemies
    enemies.forEach(enemy => enemy.update())
}
