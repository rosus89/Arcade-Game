// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// formula taken from https://www.w3schools.com/jsref/jsref_random.asp
function generateSpeed() {
    return Math.floor(((Math.random() * 300) + 100))
} 

let allEnemies = [];
yPositions = [60, 143, 226];
for (row of yPositions){
    let speed = generateSpeed();
    enemy = new Enemy(-100, row, speed);
    allEnemies.push(enemy);
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    if (this.x > 500){
        this.x = -100;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(type) {
        this.type = type;
        this.x = 202;
        this.y = 404;
        this.alive = true;
        this.xSize = 101;
        this.ySize = 83;
    }
    handleInput(key) {
        if (key === "up" && this.y > 0){
            this.y -= this.ySize;
        }
        if (key === "down" && this.y < 404){
            this.y += this.ySize;
        }
        if (key === "left" && this.x > 0){
            this.x -= this.xSize;
        }
        if (key === "right" && this.x < 404){
            this.x += this.xSize;
        }
    }
    update(){

    }
    render(){
        ctx.drawImage(Resources.get(this.type), this.x, this.y)
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let selected = 'images/char-boy.png';
let player = new Player(selected);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
