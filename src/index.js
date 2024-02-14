import { waypoints } from "./waypoints.js";
import { towerMatrix } from "./towerSpots.js";
import { c, canvas } from "./canvas.js";
import { GLOBAL } from "./global.js";
import PlacementTile from "./class/placement-tile.js";
import Enemy from "./class/enemy.js";
import Building from "./class/building.js";

let enemyCount = 3;
let coins = 100;
const placementTiles = []
const enemies = []

// go through every tile, check if it allows placement
towerMatrix.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 14) {
            // add a building tile there
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


// spawns enemies
function spawnEnemies({
    spawnCount
}) {
    for(let i = 1; i < spawnCount; i++) {
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
}
spawnEnemies({spawnCount:enemyCount});

const buildings = [];
let activeTile;

let hearts = 10;

function animate() {
    // the primary animation loop
    const animationId = window.requestAnimationFrame(animate);

    // draw the background every frame
    c.drawImage(mapImg, 0, 0)

    // update the enemies - start from the back to prevent flickering when removing enemies
    for(let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update();
        // console.log(enemies);

        // enemy leaves the map boundry
        if(enemy.position.x > canvas.width) {
            // remove that enemy from the array
            enemies.splice(i, 1);
            hearts -= 1;

            document.querySelector('#lives').textContent = hearts;

            if(hearts === 0) {
                document.querySelector('h1').style.display = 'flex';

                // clears/stops the running animation, like setTimeout
                cancelAnimationFrame(animationId);
            }
        }
    }

    // check if all enemies are gone
    if(enemies.length === 0) {
        enemyCount += 3
        spawnEnemies({spawnCount:enemyCount});
    }

    // draw the placement tiles
    placementTiles.forEach(tile => tile.update(GLOBAL.MOUSE_POSITION))

    // draw the buildings
    buildings.forEach(building => {
        building.update()
        // unset it before trying to reset it
        building.target = null;

        // array of enemies within range of tower
        const validEnemies = enemies.filter(enemy => {
            const xDiff = enemy.center.x - building.center.x;
            const yDiff = enemy.center.y - building.center.y;
            const distance = Math.hypot(xDiff, yDiff);
            return distance < enemy.radius + building.radius;
        });
        building.target = validEnemies[0];

        // iterating backwards is more efficient and prevents stutters when re-indexing already exisiting projectiles in the array
        for(let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i];

            projectile.update()

            // circular collision
            const xDiff = projectile.enemy.center.x - projectile.position.x;
            const yDiff = projectile.enemy.center.y - projectile.position.y;
            const distance = Math.hypot(xDiff, yDiff);
            if(distance < projectile.enemy.radius + projectile.radius) {
                // projectile hits enemy
                projectile.enemy.health -= 20;
                if(projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy;
                    })

                    // if we found that enemy, remove it from the current enemies
                    if(enemyIndex > -1) {
                        enemies.splice(enemyIndex, 1)
                    }
                }

                building.projectiles.splice(i, 1);
            }
        }
    })
}

// place/create tower
canvas.addEventListener('click', () => {
    if(activeTile && !activeTile.isOccupied && coins - 50 >= 0) {
        coins -= 50;
        document.querySelector('#coins').textContent = coins;
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            },
            enemies
        }))
        activeTile.isOccupied = true;
    }
})

// update the saved position of the mouse every time it moved
window.addEventListener('mousemove', (e) => {
    GLOBAL.MOUSE_POSITION.x = e.clientX;
    GLOBAL.MOUSE_POSITION.y = e.clientY;

    activeTile = null;
    for(let i = 0; i < placementTiles.length; i++) {
        let tile = placementTiles[i];
        if(
            GLOBAL.MOUSE_POSITION.x > tile.position.x &&
            GLOBAL.MOUSE_POSITION.x < tile.position.x + tile.size &&
            GLOBAL.MOUSE_POSITION.y > tile.position.y &&
            GLOBAL.MOUSE_POSITION.y < tile.position.y + tile.size
        ) {
                activeTile = tile;
                break;
        }
    }
})
