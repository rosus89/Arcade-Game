'use strict';
// characters used for sprite Selection
class Character {
    constructor(sprite, x){
    this.sprite = sprite;
    this.x = x;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, 405);
    }
}

//
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
        // makes enemies loop on screen
        if (this.x > 500){
            this.x = -100;
        }
        // collision check
        if (this.x < player.x + player.width && this.x + this.width > player.x &&
            this.y < player.y + player.height && this.y + this.height > player.y) {
            player.x = 202;
            player.y = 322;
            // controls lifes amound and their display
            player.lifes--;
            start.displayLifes();
            // ends game when player is ouf of lifes
            if(player.lifes == 0){
                start.modal(start.endModal);
            }
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
        this.lifes = 3;
        //current position / initial position
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
        // character selection controls: Start
        if (key === "up" && this.y == 405) {
            start.updatePlayer(this.x);
        }
        if (key === "down" && this.y == 322) {
            start.returnSelector();
        }
        // character selection controls: Start
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
        // resets player position and increases score once player reaches the water
        // increases Score, Level and difficulty
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

// Updates DOM: score and player level
function hud(level, score) {
    document.querySelector(".score-value").textContent = score;
    document.querySelector(".level-value").textContent = level;
};

let player = new Player("images/Selector.png");

const start = {
    // Enemy row posiions
    rowPositions: [65, 148, 229],
    // Character Sprites and their position on X axis
    charList : [
        { sprite: 'images/char-boy.png', x: 0 },
        { sprite: 'images/char-cat-girl.png', x: 101 },
        { sprite: 'images/char-horn-girl.png', x: 202 },
        { sprite: 'images/char-pink-girl.png', x: 303 },
        { sprite: 'images/char-princess-girl.png', x: 404 }],

    init: function(){
        this.allEnemies = [];
        this.allCharacters = [];
        this.nextRow = 0;
        this.create();
        this.renderCharacters();
        this.displayLifes();
    },

    reset: function(){
        hud(1,0);
        this.modal(this.endModal);
        return (() => {
            player = new Player("images/Selector.png");
            this.init();
        })();
        
    },

    //Generates: speed of enemies and their position on X axis
    newValues:function() {
        // formula taken from https://www.w3schools.com/jsref/jsref_random.asp
        let speed = Math.floor(Math.random() * 100 + 10 * player.level);
        let initX = - Math.floor(Math.random() * 500 + 100);
        return {
            speed: speed,
            initX: initX
        }
    },

    // creates enemies and characters
    create: function(){
        // enemies
        for (let row of this.rowPositions) {
            let values = this.newValues();
            let enemy = new Enemy(values.initX, row, values.speed);
            this.allEnemies.push(enemy);
        }

    },
    renderCharacters: function() {
        for (let char of this.charList) {
            let character = new Character(char.sprite, char.x);
            start.allCharacters.push(character);
        }
    },
    // increases difficulty by adding new enemies to a maximum of 6 
    // keeps adding faster enemies at the end of the array while deleting first enemy in the array
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
        let enemy = new Enemy(values.initX, row, values.speed);
        this.allEnemies.push(enemy);
    },
    // Changes the player sprite
    updatePlayer: function(x){
        for (let item of this.charList) {
            if (x == item.x){
                player.sprite = item.sprite;
                let index = this.charList.indexOf(item);
                this.allCharacters.splice(index,1);
            }
        }
    },
    returnSelector: function(){
        player.sprite = "images/Selector.png";
        this.allCharacters = [];
        this.renderCharacters();
    },
    displayLifes: function(){
        let lifes = document.querySelector(".lifes");
        lifes.innerHTML = "";
        for (let i = 0; i < player.lifes; i++) {
            let heart = document.createElement("IMG");
            heart.setAttribute("src", "images/Heart.png");
            lifes.appendChild(heart);
        }
    },
    endModal: document.querySelector("#end-game"),
    modal: function(selector){
        if (selector.style.display == "flex") {
            selector.style.display = "none";
        }
        else {
            selector.style.display = "flex";
        }
    }
}
start.init();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
