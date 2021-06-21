const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png']
  ]; // All pacmen image options
const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
      x: Math.random() * scale,
      y: Math.random() * scale
  }
} // Factory to make a PacMan at a random position with random velocity

function makePac() {
  // Returns an object with random values scaled {x: ?, y: ?}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  let game = document.getElementById('game'); 
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png'; // Adds image to match pacman img key
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y; // Sets starting position
  game.appendChild(newimg); // Adds new pacman item to game
  return {
    position,
    velocity,
    newimg
  } // Returns details in an object
}

function update() {
// Loops over pacmen array to move each one and move image in DOM
  pacMen.forEach((item) => {
  checkCollisions(item)
  item.newimg.style.left = (item.position.x += item.velocity.x);
  item.newimg.style.top = (item.position.y += item.velocity.y);
  })
  setTimeout(update, 20);
}

function checkCollisions(item) {
// Checks if pacmen are coliding with window edges
  let imgWidth = item.newimg.width;
  let imgHeight = item.newimg.height;
  if (item.position.x + item.velocity.x < 0 || item.position.x + item.velocity.x > pageWidth - imgWidth) {
    item.velocity.x = -item.velocity.x;
  }
  if (item.position.y + item.velocity.y < 0 || item.position.y + item.velocity.y > pageHeight - imgHeight) {
    item.velocity.y = -item.velocity.y;
  }
}  

function makeOne() {
  pacMen.push(makePac()); // Adds a new PacMan
}
