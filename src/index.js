import { waypoints } from "./waypoints.js";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 768;

// c.fillStyle = 'white';
// c.fillRect(0, 0, canvas.width, canvas.height);

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

    // draws this enemy and changes position every frame
    update() {
        this.draw();

        // this calculation finds the angle to the next waypoint using trig
        const waypoint = waypoints[this.curWaypoint];
        const yDist = waypoint.y - this.position.y;
        const xDist = waypoint.x - this.position.x;
        const angle = Math.atan2(yDist, xDist);

        // Rather than a static value,
        // we use the values above as the x and y velocity to move to the enxt point
        this.position.x += Math.cos(angle);
        this.position.y += Math.sin(angle);

        if(
            // prevent out of bounds errors
            this.curWaypoint < waypoints.length - 1 &&
            // round both values to integers since they would be slightly off as floating points otherwise
            Math.round(this.position.x) === Math.round(waypoint.x) &&
            Math.round(this.position.y) === Math.round(waypoint.y)
        ) {
            this.curWaypoint += 1;
        }
    }
}

const enemy = new Enemy({
    // sthat them outside the bounds of the map, at the first waypoint
    position: {
        x:waypoints[0].x,
        y: waypoints[0].y
    },
});

const enemy2 = new Enemy({
    // sthat them outside the bounds of the map, at the first waypoint
    position: {
        x:waypoints[0].x - 150,
        y: waypoints[0].y
    },
});

function animate() {
    // the primary animation loop
    window.requestAnimationFrame(animate);

    // draw the background every frame
    c.drawImage(mapImg, 0, 0)

    // update the enemy
    enemy.update();
    // enemy2.update();
}
