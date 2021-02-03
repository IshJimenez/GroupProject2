// const canvas = document.querySelector('canvas')


// //>>>> Global variables for spinning ship
// let gMouseX = 0
// let gMouseY = 0
// let gShipAngleInRads = 0;

// //>>>>>>>>>> CHECKS FOR LOCATION OF MOUSE <<<<<<<<
// document.addEventListener('mousemove', e => {
//     gMouseX=e.pageX;
//     gMouseY=e.pageY;
//     // console.log(gMouseX, gMouseY);
// })

// //>>>Makes cursor a crosshair when on canvas
// document.getElementById("canvas").style.cursor="url('./images/crosshair.cur'), auto"

// //Health and Mana
// let health = 100
// let mana = 100

// let healthPct = `${health}%`
// let manaPct = `${mana}%`

// document.getElementById('health-points').innerHTML = healthPct
// document.getElementById('mana-points').innerHTML = manaPct

// document.getElementById('health-fill').style.width = healthPct
// if (health >= 70 && health <= 100) {
//     document.getElementById('health-fill').style.backgroundColor = 'green'
// } else if (health >= 30 && health < 70) {
//     document.getElementById('health-fill').style.backgroundColor = 'yellow'
// } else if (health >= 0 && health < 30) {
//     document.getElementById('health-fill').style.backgroundColor = 'red'
// }

// document.getElementById('mana-fill').style.width = manaPct

// //Score and Level
// score = 000
// level = 1

// document.getElementById('scoreNum').innerHTML = score
// document.getElementById('levelNum').innerHTML = level
// const context = canvas.getContext('2d')

// // canvas.width = innerWidth
// // canvas.height = innerHeight

// // Background imported
// // const spaceImg = new Image()
// // spaceImg.src = "../images/falconXBackground.png"
// // const space = { x: 0, y: 0, w: canvas.width, h: canvas.height, img: spaceImg }

// // Ship imported
// const shipImg = new Image()
// shipImg.src = "../images/falconXSpaceship.png"

// class gShip {
//     constructor(x, y, w, h, img) {
//         this.x = x
//         this.y = y
//         this.w = w
//         this.h = h
//         this.img = img
// }
//     draw(){
//         //>>>>>This code gets the coord of the canvas    
//         let canvasXY = canvas.getBoundingClientRect()

//         //>>>>>This code adjusts the coord of the mouse on the page as it relates to the canvas
//         let actualMouseX = gMouseX - canvasXY.x
//         let actualMouseY = gMouseY - canvasXY.y

//         //>>>>>>this code calculates the radian for the angle as the mouse location rates to the center of the ship which is the origin 
//         gShipAngleInRads = Math.atan2(actualMouseY-this.y, actualMouseX-this.x)

//         //>>>>>>>This rotates the canvas by the calculated radian + 90 degrees
//         ctx.rotate(gShipAngleInRads + 90 * Math.PI/180)
//         ctx.translate(-250, -350)  //This moves the 0,0 origin of the canvas to the center of the ship/car

//         // console.log(gMouseX, gMouseY);

//         context.drawImage(this.img, 
//             this.x, 
//             this.y, 
//             this.w, 
//             this.h)

//         //>>>>>>>returns canvas to prior un-rotated state
//         ctx.setTransform(1, 0, 0, 1, 0, 0)
//         console.log(gMouseX, gMouseY, gShipAngleInRads, this.x, this.y);        
//     }
// }

// //Laser Weapon 1
// class Laser {
//     constructor(x, y, radius, color, velocity) {
//         this.x = x
//         this.y = y
//         this.radius = radius
//         this.color = color
//         this.velocity = velocity
//     }
// draw () {
//     context.beginPath()
//     context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     context.fillStyle = this.color
//     context.fill()
// }
// // Laser Weapon 3
// // Add velocity to each individual laser x and y 
// // For each frame set x / y coordinate for each laser
//     update() {
//         this.draw()
//         this.x = this.x + this.velocity.x
//         this.y = this.y + this.velocity.y
//     }
// }
// //Create our player
// const falcon = new gShip(canvas.width / 2 - 50, 
//     canvas.height / 2, 
//     100, 
//     100, 
//     shipImg)

//Juan changes
const falcon = new gShip(canvasW / 2 - 50, 
    canvasH / 2, 
    100, 
    100, 
    shipImg)

//Laser Weapon 2.2
  //Youll see clientX/Y when you click. 
  const laser = new Laser(
    //Since we want the lasers to start from the ship
    // event.clientX, 
    // event.clientY,
    canvas.width / 2,
    canvas.height / 2,
    10,
    'orange',
// Laser Weapon 4 
// Creating js object with 2 properties
    {
        x: 1,
        y: 1
    }
    )

//Laser Weapon 5
//To get them rendered at the same time need to create array
const lasers = []

///Asteroid 3
const sasteroids = []

///SM-Asteroid 2
//First argument of setInterval callback function(code you want to call for each specific interval
//you specify) Then its the time.
function spawnSasteroids (){
    // setInterval(() => {
        ///SM-Asteroid 4
        ///SM-Asteroid 6
        // Declare x/y outside so you can reference outside of.
        //Math.random produces anything from 0 to 1.
        //If anything then less 0.5 its going to be 0 minus(a num to push behind screen on left)
        //If greater than 0.5 will add and push off screen on the right
        //If x is spawned of the left. Y should be 0 to canvas height
        //If x spawned on top. Y should be 0 and X should be canvas width
        let x
        let y
        if(Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - 100 : canvas.width + 100
        y = Math.random() * canvas.height 
        } else {
        x = Math.random() * canvas.width
        y = Math.random() < 0.5 ? 0 - 100 : canvas.height + 100
        }
        const w = 100
        const h = 100
        const img = astSm
        //SM-Asteroid 5
        //canvas.height/width is replaced with the destination when you want to change 
        //Once falcon is figured out would go here 
        // const velocity = {
        //     x: 1,
        //     y: 1
        // }
        const angle = Math.atan2(canvas.height / 2 - y,
            canvas.width / 2 - x)
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
         //SM-Asteroid 5 End
        sasteroids.push(new Sasteroid(x, y, w, h, img, velocity))
        ///SM-Asteroid 4 ended here
    // }, 10000)
}

function animate() {
    requestAnimationFrame(animate)
    // context.drawImage(spaceImg, space.x, space.y, space.w, space.h)
    // Laser Weapon 10
    context.clearRect(0, 0, canvas.width, canvas.height)
    falcon.draw()
    //Laser Weapon 7
    //When we click we will add to the array
    lasers.forEach((laser) => {
        laser.update()
        })
    ///SM-Asteroid 5
    sasteroids.forEach((sasteroid) => {
        sasteroid.update()
    ////Blow stuff Up 1
    //Removing the distance from the laser to the asteroid
    }
    function Distance(laser, astSm) {
        const distX = Math.abs(laser.x - astSm.x - astSm.w / 2);
        const distY = Math.abs(laser.y - astSm.y - astSm.h / 2);
        if (distX > (astSm.w / 2 + laser.r)) {
            return false;
        }
        if (distY > (astSm.h / 2 + circle.r)) {
            return false;
        }
        if (distY <= (astSm.w /2)) {
            return true;
        }
        if (distX = (astSm.w /2)) {
            return true;
        }
        var dx = distX - astSm.w / 2;
        var dy = distY - astSm.h /2;
        return(dx * dx + dy * dy <= (laser.r * laser.r));
        {
        }
        console.log(distX)
    })
}

//Laser Weapon 2.1
//First argument it takes is what event we want to listen for hence a click.
//Second argument is a function
//Anytime you call a function in response to a click using add event listener. The first argument
//within this function is going to be an event object.
addEventListener('click', (event) => { 
//Youll see clientX/Y when you click. 

//Laser Weapon 8. Distance from mouse and center of the screen
// 0 to 6.28 is equal to 0 to 360. Get exact angle from right triangle to center
    const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
    )
//Laser Weapon 9
//Equal to an empty object with an x and y property
//Cosine is always x adjacent axis. Return and number -1 to 1
//Sine will also return any num -1 to 1
//But together are going to produce 2 dif results that have a perfect ratio to
//wherever you clicked on the screen.
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    //Laser Weapon 7
    //When we click we will add to the array
    lasers.push(new Laser(canvas.width / 2,
        canvas.height / 2,
        50,
        'orange',
        velocity
        )
    )
    })

    animate()

    ///SM-Asteroids2.5
    spawnSasteroids()






//     //STELIAN ADDING MUSIC AND IMAGES //////////// START LINE 170 
//     //*************SOUND*////////////////////

// //var audio = new Audio("../sounds/backgroundSound.mp3");
// //audio.play();

// let audio = new Audio('../sounds/backgroundSound.mp3');
// function play() {

//     if (audio.paused){
//         audio.play();
    
//     } else {
//         audio.pause();

//     }
    
// }
// document.querySelector ("#buttonSound").onclick = play



// let explosionAsteroid = new Audio('../sounds/Explosion+3.mp3');
// let explosionSapaceShip = new Audio('../sounds/Explosion+4.mp3');
// let gameOver = new Audio('../sounds/gameOver.mp3');
// let gameStart = new Audio('../sounds/gameStart.mp3');
// let gunSound = new Audio('../sounds/GunSound.mp3'); 








// //*******************IMAGES *//////////////////////


// let asteroidLg = new Image();
// asteroidLg.src = "../images/asteroidLg.png";

// let asteroidMed = new Image();
// asteroidMed.src = "../images/asteroidMed.png";

// let asteroidSm = new Image();
// asteroidSm.src = "../images/asteroidSm.png";

// let bullet = new Image();
// bullet.src = "../images/bullet.png";

// let bullet2 = new Image();
// bullet2.src = "../images/bullet2.png";

// let explosion = new Image();
// explosion.src = "../images/expplosion.png";

// let explosion2 = new Image();
// explosion2.src = "../images/expplosion2.png";

// let falconXBackground = new Image();
// falconXBackground.src = "../images/falconXBackground.png";

// let falconXSpaceship = new Image();
// falconXBSpaceship.src = "../images/falconXSpaceship.png";

// let powerUp = new Image();
// powerUp.src = "../images/powerUp.png";



// /////////END STELIAN ADDING MUSIC AND IMAGES////// LINE 240
// ///ALSO ADDED BUTTON FOR SOUND ON/OFF IN HTML ////