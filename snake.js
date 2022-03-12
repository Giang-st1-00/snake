
const canvas = document.querySelector('#snake');
const ctx = canvas.getContext('2d');

const lenx1 = 20;

canvas.width = 600;
const gamezone_width = canvas.width;
canvas.height = 600;
const gamezone_height = canvas.height;
ctx.fillStyle = '#002200';
ctx.fillRect(0 , 0 , 600, 600);
var score=0;

//vi tri va huong
class vector {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}
// thuc an 
class food {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    randomfood() {
        var randomfoodx = Math.floor(Math.random() * (gamezone_width/lenx1))*lenx1;
        var randomfoody = Math.floor(Math.random() * (gamezone_height/lenx1))*lenx1;
        this.x=randomfoodx;
        this.y=randomfoody;
        
    }

    drawfood(x,y) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x , y , lenx1, lenx1);
    }
}


let food1 = new food(100,100);
food1.drawfood(food1.x,food1.y);

// snake
class snake {
    
    constructor() {
        this.body = [
            new vector(3*lenx1,4*lenx1),
            new vector(4*lenx1,4*lenx1),
            new vector(5*lenx1,4*lenx1),
        ]
        this.speed = new vector(-1,0);
    }



    draw() {
        ctx.fillStyle  = 'white';
        ctx.fillRect(this.body[0].x,this.body[0].y,lenx1,lenx1);
        ctx.fillStyle  = 'green';
        for (var i=1;i<this.body.length;i++) {
            ctx.fillRect(this.body[i].x,this.body[i].y,lenx1,lenx1);
        }
    }

    clear() {
        ctx.fillStyle  = '#002200';
        ctx.fillRect(this.body[this.body.length-1].x,this.body[this.body.length-1].y,lenx1,lenx1);
    }

    move() {
        for (var i = 2;i<this.body.length;i++) {
            if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
                ctx.font = 'italic 60px Calibri, sans-serif';
                ctx.fillText('GAME OVER', 100, 200);
                return;
            }
        }
        this.clear();

        for (let i=this.body.length-1;i>=1;i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        
        if (this.body[0].x == 0 && this.speed.x == -1) {
            this.body[0].x = gamezone_width-lenx1;
        } 
        else if (this.body[0].y == 0 && this.speed.y == -1) {
            this.body[0].y = gamezone_width-lenx1;

        }
        else if (this.body[0].x == gamezone_width && this.speed.x == 1) {
            this.body[0].x = 0;
        }
        else if (this.body[0].y == gamezone_width && this.speed.y == 1) {
            this.body[0].y = 0;
        }
        else {
            this.body[0].x += this.speed.x * lenx1;
            this.body[0].y += this.speed.y * lenx1;
        }

        if (this.body[0].x == food1.x && this.body[0].y == food1.y) {
            food1.randomfood();
            food1.drawfood(food1.x,food1.y);
            this.body.push(
                new vector(this.body[this.body.length-1].x,this.body[this.body.length-1].y)
            )
            var score1 = document.querySelector('.score');
            score++;
            score1.innerHTML = `Score : ${score}`;
        }

        this.draw();
    }
}

var snake1 = new snake();
snake1.draw();
// snake1.draw();

setInterval(()=>{
    snake1.move();
},70)

const left = 37;
const right = 39;
const up = 38;
const down = 40;



document.onkeydown = function(e) {
    let presentspeedx = snake1.speed.x;
    let presentspeedy = snake1.speed.y;
    switch(e.keyCode) {
        case left :
            if (presentspeedx == 1) {
                break;
            }
            snake1.speed = new vector(-1,0);
            
            break;
        case right:
            if (presentspeedx == -1) {
                break;
            }
            snake1.speed = new vector(1,0);
            break;
        case up :
            if (presentspeedy == 1) {
                break;
            }
            snake1.speed = new vector(0,-1);
            break;
         case down :
            if (presentspeedy == -1) {
                break;
            }
            snake1.speed = new vector(0,1);
            break;
        default :
            break;
    }
}