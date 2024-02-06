const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 768;

// c.fillStyle = 'white';
// c.fillRect(0, 0, canvas.width, canvas.height);

const mapImg = new Image();
// the image may take a bit to load into JS,
//so we use an onload function to draw it when loaded
mapImg.onload = () => c.drawImage(mapImg, 0, 0)
mapImg.src = '/assets/tilesets/map.png';
