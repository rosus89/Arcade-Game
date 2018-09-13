let list = [
    {sprite:'images/char-boy.png', x:0},
    {sprite:'images/char-cat-girl.png', x:101},
    {sprite:'images/char-horn-girl.png', x:202},
    {sprite:'images/char-pink-girl.png', x:303},
    {sprite:'images/char-princess-girl.png', x:404}];

class Character {
    constructor(sprite, x){
    this.sprite = sprite;
    this.x = x;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, 405);
    }
}

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
        // collision check
        if (this.x < player.x + player.width && this.x + this.width > player.x &&
            this.y < player.y + player.height && this.y + this.height > player.y) {
            player.x = 202;
            player.y = 405;
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Player {
    constructor(sprite) {
        this.sprite = sprite;
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
        if (key === "up" && this.y == 405) {
            updatePlayer(this.x);
        }
        if (key === "down" && this.y == 322) {
            returnSelector();
            console.log("selector")
        }
        if (key === "up" && this.y > 0){
            this.y -= this.ySize;
        }
        else if (key === "down" && this.y < 404){
            this.y += this.ySize;
        }
        else if (key === "left" && this.x > 0){
            this.x -= this.xSize;
        }
        else if (key === "right" && this.x < 404){
            this.x += this.xSize;
        }

    }
    update(){
        //resets player position and increases score once player reaches the water
        if (this.y == -10) {
            this.x = 202;
            this.y = 322;
            this.score = this.score + 5 * this.level;
            this.level++;
            hud(this.level, this.score)
            start.difficulty();
        }

    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    }
}
function hud(level, score) {
    document.querySelector(".score-value").textContent = score;
    document.querySelector(".level-value").textContent = level;
};

let player = new Player("images/Selector.png");

// Changes the player sprite
function updatePlayer(x){
    for (let item of list){
        if (x == item.x)
            player.sprite = item.sprite;
    }
}
function returnSelector(){
    player.sprite = "images/Selector.png";
}
let start = {
    rowPositions: [65, 148, 229],
    allEnemies: [],
    allCharacters: [],
    nextRow: 0,
    newValues :function() {
        // formula taken from https://www.w3schools.com/jsref/jsref_random.asp

        let speed = Math.floor(Math.random() * 100 + 10 * player.level);
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
    difficulty: function(){
        let values = this.newValues();
        let row = this.rowPositions[this.nextRow];
        this.nextRow++;
        if(this.nextRow == 3){
            this.nextRow = 0;
        }
        if(this.allEnemies.length == 6){
            this.allEnemies.splice(0,1);
        }
        enemy = new Enemy(values.initX, row, values.speed);
        this.allEnemies.push(enemy);
    }

}
start.create();
for (let char of list) {
    character = new Character(char.sprite, char.x);
    start.allCharacters.push(character);
}


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
