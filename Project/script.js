const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//>>>> Global variables for spinning ship
let gMouseX = 0;
let gMouseY = 0;
let gShipAngleInRads = 0;
let centerOfShipX = 0;
let centerOfShipY = 0;
let actualMouseX = 0;
let actualMouseY = 0;

//>>>>>>>>>> CHECKS FOR LOCATION OF MOUSE <<<<<<<<
document.addEventListener("mousemove", (e) => {
  gMouseX = e.clientX;
  gMouseY = e.clientY;
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SCORE/GAME CONTROL/INTERFACE

//>>>Makes cursor a crosshair when on canvas
document.getElementById("canvas").style.cursor =
  "url('../images/crosshair.cur'), auto";

//Juan updates
let canvasW = window.innerWidth;
let canvasH = window.innerHeight;

canvas.width = canvasW;
canvas.height = canvasH;

window.onresize = function () {
  canvas.width = canvasW;
  canvas.height = canvasH;
};

const scoreNum = document.querySelector('#scoreNum');

//Health and Mana Bars
let health = 100;
let mana = 100;

let healthPct = `${health}%`;
let manaPct = `${mana}%`;

document.getElementById("health-points").innerHTML = healthPct;
document.getElementById("mana-points").innerHTML = manaPct;

document.getElementById("health-fill").style.width = healthPct;
if (health >= 70 && health <= 100) {
  document.getElementById("health-fill").style.backgroundColor = "green";
} else if (health >= 30 && health < 70) {
  document.getElementById("health-fill").style.backgroundColor = "yellow";
} else if (health >= 0 && health < 30) {
  document.getElementById("health-fill").style.backgroundColor = "red";
}

document.getElementById("mana-fill").style.width = manaPct;

//Score and Level Counters
score = 000;
level = 1;

document.getElementById("scoreNum").innerHTML = score;
document.getElementById("levelNum").innerHTML = level;

//Buttons
function startGame() {
  let startScreen = document.getElementById("start-screen");
  if (startScreen.style.display === "none") {
    startScreen.style.display = "flex";
  } else {
    startScreen.style.display = "none";
  }
} //Should initiate animation

function pause() {
  let startScreen = document.getElementById("start-screen");
  if (startScreen.style.display === "none") {
    startScreen.style.display = "flex";
  } else {
    startScreen.style.display = "none";
  }
} //Should halt animation

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SPACESHIP
// Ship Image imported
const shipImg = new Image();
shipImg.src = "../images/falconXSpaceship.png";

class gShip {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }

  draw() {
    //>>>>>This code gets the coord of the canvas
    let canvasXY = canvas.getBoundingClientRect();

    let actualMouseX = gMouseX - canvasXY.x;
    let actualMouseY = gMouseY - canvasXY.y;
    let centerOfShipX = this.x + 52;
    let centerOfShipY = this.y + 70;

    gShipAngleInRads = Math.atan2(
      actualMouseY - centerOfShipY,
      actualMouseX - centerOfShipX
    );

    context.translate(centerOfShipX, centerOfShipY);
    context.rotate(gShipAngleInRads + (90 * Math.PI) / 180);
    context.translate(-centerOfShipX, -centerOfShipY);
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
    context.setTransform(1, 0, 0, 1, 0, 0);

    // //>>>>>> Draw line from ship to mouse for clarification of points while coding
    // context.beginPath();
    // context.moveTo(centerOfShipX, centerOfShipY);
    // context.lineTo(actualMouseX, actualMouseY);
    // context.lineWidth = 5;
    // context.stroke();
  }
}

//Declare FalconX Ship
const falcon = new gShip(canvasW / 2 - 50, canvasH / 2 - 50, 100, 100, shipImg);

//>>>>>This is the code that moves the ship
window.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowLeft":
      if (falcon.x >= 20) {
        falcon.x -= 10;
      }
      break;
    case "ArrowRight":
      if (falcon.x <= canvas.width - 100) {
        falcon.x += 10;
      }
      break;
    case "ArrowUp":
      if (falcon.y >= 1) {
        falcon.y -= 10;
      }
      break;
    case "ArrowDown":
      if (falcon.y <= canvas.height - 150) {
        falcon.y += 10;
      }
      break;
  }
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Collisions
let explosion = new Image();
explosion.src = "../images/explosion.png";

let explosion2 = new Image();
explosion2.src = "../images/explosion2.png";

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Power Up
let powerUp = new Image();
powerUp.src = "../images/powerUp.png";

///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ASTEROIDS
// Aseroid Images Imported
const astSm = new Image();
astSm.src = "../images/asteroidSm.png";

let astLg = new Image();
astLg.src = "../images/asteroidLg.png";

let astMed = new Image();
astMed.src = "../images/asteroidMed.png";

///SM-Asteroids 1
class Sasteroid {
  constructor(x, y, w, h, img, velocity) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    // this.hit = hit;
    this.velocity = velocity;
    // this.size = size;
  }

  draw() {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

  //*** NEW: SHIP-ASTEROID COLLISION FUNCTION *** >>> KEEP <<<
//   function shipAstCollision(ship, ast) {
//     if (ship.x < ast.x + ast.w &&
//         ship.x + ship.w > ast.x &&
//         ship.y < ast.y + ast.h &&
//         ship.y + ship.h > ast.y) {
//             console.log('Collision!');
//             sasteroids.splice(sasteroids.indexOf(rect2),1);
//     }
// }

///Asteroid 3
const sasteroids = [];

function spawnSasteroids() {
  setInterval(() => {
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - 100 : canvas.width + 100;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - 100 : canvas.height + 100;
    }
    const w = 200;
    const h = 100;
    // const hit = 0;
    const img = astSm;
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    sasteroids.push(new Sasteroid(x, y, w, h, img, velocity));
  }, 1000);
}

spawnSasteroids();

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  LASERS

let bullet = new Image();
bullet.src = "../images/bullet.png";

let bullet2 = new Image();
bullet2.src = "../images/bullet2.png";

////Laser Weapon 1
class Laser {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x * 1.5;
    this.y = this.y + this.velocity.y * 1.5;
  }
}

function detectCollision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y) {
      {
      setTimeout(() => {
      lasers.splice(lasers.indexOf(rect1),1)
      sasteroids.splice(sasteroids.indexOf(rect2),1)
      score += 100
      scoreNum.innerHTML = score
      }, 0)
    }
    }
 }

const lasers = [];

addEventListener("click", (event) => {
  let canvasXY = canvas.getBoundingClientRect();

  let actualMouseClickX = event.clientX - canvasXY.x;
  let actualMouseClickY = event.clientY - canvasXY.y;

  // console.log(event.clientX, event.clientY, actualMouseClickX, actualMouseClickY)
  const angle =
    -0.15 +
    Math.atan2(
      actualMouseClickY - falcon.y + 70,
      actualMouseClickX - falcon.x + 52
    );

  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  lasers.push(
    new Laser(falcon.x + 52, falcon.y + 70, 5, `hsl(${Math.random() * 360}, 50%, 50%)`, velocity)
  );
});

//*************SOUND*////////////////////

let audio = new Audio("../sounds/backgroundSound.mp3");
function play() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

document.querySelector("#buttonSound").onclick = play;

document.querySelector("#sound-btn").onclick = play;

let explosionAsteroid = new Audio("../sounds/Explosion+3.mp3");
let explosionSapaceShip = new Audio("../sounds/Explosion+4.mp3");
let gameOver = new Audio("../sounds/gameOver.mp3");
let gameStart = new Audio("../sounds/gameStart.mp3");
let gunSound = new Audio("../sounds/GunSound.mp3");


// ENDGAME
function endGame() {
  $("#canvasArea").hide();
  $("#score").text(score);
  $(".FinishScreen").show();
}

function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = 'rgba(0, 0, 0, 0.1)'
  context.clearRect(0, 0, canvas.width, canvas.height);

  falcon.draw();

  lasers.forEach((laser) => {
    laser.update();

    //Remove projectile off screen 
    if (laser.x - laser.radius < 0 ||
      laser.x - laser.radius > canvas.width ||
      laser.y + laser.radius < 0 ||
      laser.y - laser.radius > canvas.height
      ) {
      setTimeout(() => {
        lasers.splice(index, 1)
        }, 0)
      }
    });

  //*** NEW: SHIP-ASTEROID COLLISION ANIMATION *** >>> KEEP <<<
//   sasteroids.forEach((sasteroid) => {
//     sasteroid.update();
//     shipAstCollision(falcon, sasteroid)
// })

  sasteroids.forEach((sasteroid) => {
    sasteroid.update();

    lasers.forEach((laser) => {
      laser.w = laser.radius*2
      laser.h = laser.radius*2
     detectCollision(laser, sasteroid)
      });
      })
    }




animate();
