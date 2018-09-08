// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = "images/enemy-bug.png";
        this.height = 67;
        this.width = 99;
    }
    update(dt) {
        this.x += dt * this.speed;
        if (this.x > 500){
            this.x = -100;
        }
        if (this.x < player.x + player.width && this.x + this.width > player.x &&
            this.y < player.y + player.height && this.y + this.height > player.y) {
            player.x = 202;
            player.y = 404;
            console.log("collision")
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// formula taken from https://www.w3schools.com/jsref/jsref_random.asp






class Player {
    constructor(type) {
        this.type = type;
        //current position
        this.x = 202;
        this.y = 404;
        //step size
        this.xSize = 101;
        this.ySize = 83;
        //character size
        this.height = 76;
        this.width = 67;
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


let start = {
    yPositions: [65, 148, 229],
    allEnemies: [],
    generateSpeed :function() {
        // formula taken from https://www.w3schools.com/jsref/jsref_random.asp
        return Math.floor(Math.random() * 100 + 100);
    },
    create: function(){
        for (row of this.yPositions) {
            let speed = this.generateSpeed();
            enemy = new Enemy(-100, row, speed);
            this.allEnemies.push(enemy);
        }
    }

}
start.create();
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
