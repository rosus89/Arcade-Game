class Enemy {
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = "images/enemy-bug.png";
        this.height = 83;
        this.width = 70;
    }
    update(dt) {
        this.x += dt * this.speed;
        if (this.x > 500){
            this.x = -100;
        }
        if (this.x < player.x + player.width && this.x + this.width > player.x &&
            this.y < player.y + player.height && this.y + this.height > player.y) {
            player.x = 202;
            player.y = 405;
            console.log("collision")
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Player {
    constructor(type) {
        this.type = type;
        this.score = 0;
        this.level = 1;
        //current position
        this.x = 202;
        this.y = 405;
        //step size
        this.xSize = 101;
        this.ySize = 83;
        //character size
        this.height = 30;
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
        //resets player position once he reaches the water
        if (this.y == -10) {
            this.x = 202;
            this.y = 405;
            this.score = this.score + 5 * this.level;
            this.level++;
            console.log(this.score)
            select(this.level, this.score)
        }

    }
    render(){
        ctx.drawImage(Resources.get(this.type), this.x, this.y)
    }
}
function select(level, score) {
    document.querySelector(".score-value").textContent = score;
    document.querySelector(".level-value").textContent = level;
};

let start = {
    rowPositions: [65, 148, 229],
    allEnemies: [],
    character : 'images/char-boy.png',
    newValues :function() {
        // formula taken from https://www.w3schools.com/jsref/jsref_random.asp

        let speed = Math.floor(Math.random() * 100 + 50);
        let initX = - Math.floor(Math.random() * 500 + 100);
        return {
            speed: speed,
            initX: initX
        }
    },
    create: function(){
        for (row of this.rowPositions) {
            let values = this.newValues();
            enemy = new Enemy(values.initX, row, values.speed);
            this.allEnemies.push(enemy);
        }
    },
    update: function(){

        this.level ++;
        console.log("level: " + this.level);
    }

}
start.create();
let player = new Player(start.character);

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
