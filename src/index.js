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
        this.poisition = position;
        this.width = 100;
        this.height = 100;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(
            this.poisition.x,
            this.poisition.y,
            this.width,
            this.height
        );
    }

    // draws this enemy and changes position every frame
    update() {
        this.draw();
        this.poisition.x += 1;
    }
}

const enemy = new Enemy({
    position: {x:200, y:400},
});

const enemy2 = new Enemy({
    position: {x:100, y:400},
});

function animate() {
    // the primary animation loop
    window.requestAnimationFrame(animate);

    // draw the background every frame
    c.drawImage(mapImg, 0, 0)

    // update the enemy
    enemy.update();
    enemy2.update();
}
