var gameState = [];
var lastedGS = [];
var generation = 0;
var keepLoop = false;

keyboardEvent();

function start(){
    var W = (Math.floor( window.innerWidth/10 ) *10 )-20;
    var H = (Math.floor( window.innerHeight/10 ) *10 )-20;
    var canvas = document.getElementById("space");
    canvas.width = W;
    canvas.height = H;
    gameState = initGS((H/10),(W/10));
    lastedGS = initGS((H/10),(W/10));
    draw();
    loop();
}

//Loop

function loop(){
    draw();
    if (keepLoop) {
        console.log("Generation: " + generation);
        update();
        setTimeout(() => {
            generation += 1;
            requestAnimationFrame(loop);
        }, 100);
    }else{
        setTimeout(() => {
            requestAnimationFrame(loop);
        }, 100);
    }
}

//Draw the array

function draw() {
    var canvas = document.getElementById('space');
    if (!canvas.getContext) {
        alert("Bye");
    }
    var ctx = canvas.getContext('2d');

    
    ctx.strokeStyle = '#3a3f47';

    for (var i = 0; i < gameState.length; i++) {
        for (var j = 0; j < gameState[0].length; j++) {
            if (gameState[i][j] === 1) {
                ctx.fillStyle = '#000000e3';
                ctx.fillRect(j * 10, i * 10, 10, 10);
            } else if (gameState[i][j] === 0) {
                ctx.fillStyle = '#FFF';
                ctx.fillRect(j * 10, i * 10, 10, 10);
                ctx.strokeRect(j * 10, i * 10, 10, 10);
            }
        }
    }
}

//Rules and Update Array

function update(){
    for(let i=0; i<gameState.length-1; i++){
        for(let j=0; j<gameState[0].length-1; j++){
            var cellAlive = 0;
            
            if (i === 0 && j === 0) {
                cellAlive += gameState[i][j + 1];

                cellAlive += gameState[i + 1][j];
                cellAlive += gameState[i + 1][j + 1];
            }

            if (i === 0) {
                cellAlive += gameState[i][j - 1];
                cellAlive += gameState[i][j + 1];

                cellAlive += gameState[i + 1][j - 1];
                cellAlive += gameState[i + 1][j];
                cellAlive += gameState[i + 1][j + 1];
            }

            if (j === 0 && i != 0) {
                cellAlive += gameState[i - 1][j];
                cellAlive += gameState[i - 1][j + 1];

                cellAlive += gameState[i][j + 1];

                cellAlive += gameState[i + 1][j];
                cellAlive += gameState[i + 1][j + 1];
            }

            if (i != 0 && j != 0) {
                cellAlive += gameState[i - 1][j - 1];
                cellAlive += gameState[i - 1][j];
                cellAlive += gameState[i - 1][j + 1];

                cellAlive += gameState[i][j - 1];
                cellAlive += gameState[i][j + 1];

                cellAlive += gameState[i + 1][j - 1];
                cellAlive += gameState[i + 1][j];
                cellAlive += gameState[i + 1][j + 1];
            }

            if( ((gameState[i][j] === 1 || gameState[i][j] === 0) && cellAlive === 3) || gameState[i][j] === 1 && cellAlive === 2){
                lastedGS[i][j] = 1;
            }else{
                lastedGS[i][j] = 0;
            }
        }
    }

    for(let i=0; i<gameState.length; i++){
        for(let j=0; j<gameState[0].length; j++){
            gameState[i][j] = lastedGS[i][j];
        }
    }
}


//Initializing GameState

function initGS(H, W) {
    var array = [];
    for (var i = 0; i < H; i++) {
        array.push(rows(W));
    }
    return array;
}

function rows(W) {
    var row = [];
    for (var i = 0; i < W; i++) {
        row.push(0);
    }
    return row;
}

//KeyBoard Events

function keyboardEvent() {
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 32) {
            keepLoop = !keepLoop;
        }
    }, true);
}

function mouseEvent(event){
    var x = (Math.floor(event.pageX/10))-1;
    var y = (Math.floor(event.pageY/10))-1;
    //console.log(x + " : " + y);
    if(gameState[y][x] === 0){
        gameState[y][x] = 1;
    }else{
        gameState[y][x] = 0;
    }
}