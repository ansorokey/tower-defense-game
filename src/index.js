import { waypoints } from "./waypoints.js";
import { towerMatrix } from "./towerSpots.js";
import { c, canvas } from "./canvas.js";
import { GLOBAL } from "./global.js";
import PlacementTile from "./class/placement-tile.js";
import Enemy from "./class/enemy.js";


const placementTiles = []

towerMatrix.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 14) {
            // add a building tile here
            placementTiles.push(new PlacementTile({
                position: {
                    x: x * GLOBAL.TILE_SIZE,
                    y: y * GLOBAL.TILE_SIZE
                }
            }))
        }
    })
})

const mapImg = new Image();
mapImg.src = '/assets/tilesets/map.png';
// image loading is slightly async,
//so we use an onload function to initiate
mapImg.onload = () => {
    animate();
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

    // draw the placement tiles
    placementTiles.forEach(tile => tile.update(GLOBAL.MOUSE_POSITION))
}

// update the saved position of the mouse every time it moved
window.addEventListener('mousemove', (e) => {
    GLOBAL.MOUSE_POSITION.x = e.clientX;
    GLOBAL.MOUSE_POSITION.y = e.clientY;
})
