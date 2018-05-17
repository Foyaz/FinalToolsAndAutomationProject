//Initial game Level and high Score
let level = 1;
let score = 0;
// Enemy of the game
const Enemy = function(x, y,s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.sprite = 'images/enemy-bug.png';
};
//enemy's position, speed
Enemy.prototype.update = function(dt) {
     this.x ++;
     this.x = this.x + this.s * (level* 1);
     if (this.x > 510){
         this.x = (-150 * dt);
    };
    if(this.x + 60 > player.x && this.x < player.x + 30 &&  this.y < player.y + 60 && this.y + 40 > player.y) {
        level = 1;
        document.getElementById('increaseLevel').innerHTML = level;
        player.reset();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Player of the game measuring along x-axis and y-axis of the canvas
const Player = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

}

// player level and score update and what happens after game is won
Player.prototype.update = function(){
    if(this.y < 50){
        level++;
        document.getElementById('increaseLevel').innerHTML= level;
        this.reset(); 
        score++; 
        document.getElementById('maxScore').innerHTML = score;
    }

}

//player's initial position
Player.prototype.reset = function() {
    this.x = 100;
    this.y = 400;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
}

// enemy instances
const enemy1 = new Enemy(409, 224, 1);
const enemy2 = new Enemy(305, 145, 3);
const enemy3 = new Enemy(201, 58, 2); 
const allEnemies = [enemy1, enemy2, enemy3];

//player instance
const player = new Player(100, 400);

//Player's movement control
Player.prototype.handleInput = function(x){
    if(x == 'left' && this.x > 1){
        this.x = this.x - 100;
    }
    else if(x == 'right' && this.x < 370){
        this.x = this.x + 100;
    }
    else if(x == 'up' && this.y > 1) {
        this.y = this.y - 87;
    }
    else if(x == 'down' && this.y < 390) {
        this.y = this.y + 87;
    }
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});