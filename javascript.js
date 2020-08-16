var gameState = [];
var lastedGS = [];
var prePattern = [];
var generation;
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
    prePattern = initGS((H/10),(W/10));
    generation = 0;
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
        }, 500);
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

function reset(){
    start();
}

function glider(){
    prePattern[0][1] = 1;
    prePattern[1][2] = 1;
    prePattern[2][0] = 1;
    prePattern[2][1] = 1;
    prePattern[2][2] = 1;

    insertPattern();
}

function pulsar(){
    prePattern = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0],
    ];

    insertPattern();
}

function insertPattern(){
    for(let i=0; i<prePattern.length; i++){
        for(let j=0; j<prePattern[0].length; j++){
            gameState[i][j] = prePattern[i][j];
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

function start_stop(){
    keepLoop = !keepLoop;
}

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
    if(gameState[y][x] === 0){
        gameState[y][x] = 1;
    }else{
        gameState[y][x] = 0;
    }
}