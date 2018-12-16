canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
width = canvas.width;
height = canvas.height;
scale = 10;
cols = 30;
rows = 30;
velocity = 1;
px = 15;
py = 15;
foodPx = 5;
foodPy = 5
direction = "left";
tail = 5;
snake = [];
for(i=0; i<tail; i++){
    snake.push({x: px, y: py});
}

setInterval(loop, 80);

function loop(){
    ctx.clearRect(0, 0, width, height);
    drawFood(foodPx, foodPy);
    if(direction == "left"){
        px--;
    }
    else if(direction == "right"){
        px++;
    }
    else if(direction == "up"){
        py--;
    }
    else if(direction == "down"){
        py++;
    }
    if(px >= cols){
        px = 0;
    }
    if(px < 0){
        px = cols;
    }
    if(py >= rows){
        py = 0;
    }
    if(py < 0){
        py = rows;
    }
    if(px == foodPx && py == foodPy){
        foodPx = Math.floor(Math.random()*cols);
        foodPy = Math.floor(Math.random()*rows);
        tail++;
    }
    snake.unshift({x:px, y:py});
    for(i = 1; i<snake.length; i++){
        if(px == snake[i].x && py == snake[i].y){
            tail = 5;
            direction = null;
            break;
        }
    }
    while(snake.length > tail)
        snake.pop()
    drawSnake(snake);
}

function drawSnake(snake){
    snake.forEach(function(e) {
        ctx.fillStyle = "gray";
        ctx.fillRect(e.x*scale, e.y*scale, scale-1, scale-1);
    })
}
function drawFood(x ,y){
    ctx.fillStyle = "red";
    ctx.fillRect(x*scale, y*scale, scale-1, scale-1);
}
window.addEventListener("keydown", function(e){
    if(e.keyCode == 38 && direction != "down")
        direction = "up";
    else if(e.keyCode == 39 && direction != "left")
        direction = "right";
    else if(e.keyCode == 37 && direction != "right")
        direction = "left";
    else if(e.keyCode == 40 && direction != "up")
        direction = "down";
})