
 const canvas = document.getElementById("game-board");
 const ctx = canvas.getContext("2d");
 var currentTurn = "X";
 var moveCount = 0;
 var isWin = false;
 var turnTitle = document.getElementById('current-turn-title');
 var curPerc = 0;
 var circX = 0;
 var circY = 0;
 var isWinner = []

 //get full width of canvas
 const canvWidth = canvas.width;

 //canvas will always be a perfect square
 //contSize X contSize -> dimensions per box
 const containerSize = canvWidth/3;

 var tracker = {
    "(0,0)":null, "(200,0)":null, "(400,0)":null,
    "(0,200)":null, "(200,200)":null, "(400,200)":null,
    "(0,400)":null, "(200,400)":null, "(400,400)":null
 }

//initialize game board
function initGameBoard() {

    //choose turn color and display text
    if (currentTurn == "X") {
        turnTitle.style.color = '#192a53';
    } else {
        turnTitle.style.color = '#bfcfc6';
    }

    turnTitle.innerHTML = currentTurn.toLowerCase() + "'s turn";

    //clear out check for winner
    isWinner = []

    //set line thickness
    ctx.lineWidth = 15;

    //reset winner
    isWin = false;

    //reset move count
    moveCount = 0;

    //reset tracker
    Object.keys(tracker).forEach(function(index) { tracker[index] = null });

    //clear any shapes from board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = '#333';

    //draw game board
    drawShape(200, 0, 200, 600, null);
    drawShape(400, 0, 400, 600, null);
    drawShape(0, 200, 600, 200, null);
    drawShape(0, 400, 600, 400, null);
}

window.onload = initGameBoard;

//track which containers have a piece in it
function updateGameTracker(x,y,turn) {
    tracker[`(${x},${y})`] = turn
}

// print line to screen
function drawShape(startXValue, startYValue, endXValue, endYValue, state) {

    if (state == "X") {

        //draw an X with 30px padding then change turns
        drawX(startXValue, startYValue);

        //update dictionary that keeps track of values selected
        updateGameTracker(startXValue,startYValue,"X");

        //check for winner each round
        isWinner = checkForWin(currentTurn);
        if (isWinner[0]) {
            isWin = true;
        }

        //Change turn
        currentTurn = "O"
        //update turn title and color
        turnTitle.style.color = '#bfcfc6';
        turnTitle.innerHTML = currentTurn.toLowerCase() + "'s turn";



        moveCount++;

    } else if (state == "O") {

        //draw a O
        ctx.strokeStyle = '#bfcfc6';
        circX = startXValue+(containerSize/2);
        circY = startYValue+(containerSize/2);
        animateO();

        updateGameTracker(startXValue,startYValue,"O");

        //check for winner each round
        isWinner = checkForWin(currentTurn);
        if (isWinner[0]) {
            isWin = true;
        }

        //change turn
        currentTurn = "X"
        //update turn title and color
        turnTitle.style.color = '#192a53';
        turnTitle.innerHTML = currentTurn.toLowerCase() + "'s turn";

        moveCount++;

    } else if (state == "winner") {
        //draw a line for win


    } else {
        //draw game board
        ctx.moveTo(startXValue, startYValue);
        ctx.lineTo(endXValue, endYValue);
        ctx.stroke();
    }
    console.log(moveCount, isWin, moveCount == 9 && !isWinner)
    //check for winner
    if (isWin) {
        //let the shape finish drawing
        setTimeout(()=>{
            //update title turn text and color
            turnTitle.style.color = 'RED';
            turnTitle.innerHTML = "WINNER";
            ctx.beginPath();
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'tomato'
            ctx.moveTo(isWinner[1], isWinner[2]);
            ctx.lineTo(isWinner[3], isWinner[4]);
            ctx.stroke();
        }, 400);
    } else if (moveCount == 9 && !isWin) {
        turnTitle.style.color = 'RED';
        turnTitle.innerHTML = "DRAW!";
    }
}

//find upper left corner of each 'container'
function getCorner(val) {
    //return the ultimate floor corner value
    val = val - (val%200);
    return val;
}

//get clicked box
function getClickedBox(x, y) {

    //if x or y are less than the size of a container
    //they must be in the top or left containers
    //if not, get the x/y corner value
    const xCorner = x < containerSize ? 0 : getCorner(x);
    const yCorner = y < containerSize ? 0 : getCorner(y);

    if (tracker[`(${xCorner},${yCorner})`] == null && isWin == false) {
        drawShape(xCorner, yCorner, xCorner+containerSize, yCorner+containerSize, currentTurn);
    }
}

//get x/y click value
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    getClickedBox(x, y);
});

//check to see if someone one
function checkForWin(turnValue) {

    //i could have done this with some combination of loops.
    //since there are only 8 possible ways to win
    //it felt like adding complexity for the sake of adding it

    var x1, x2, y1, y2;
    x1= x2 = y1 = y2 = 0;

    //check l -> r diagonal win
    if (tracker["(0,0)"] == turnValue && tracker["(200,200)"] == turnValue && tracker["(400,400)"] == turnValue) {
        x1 = 0;
        y1 = 0;
        x2 = 600;
        y2 = 600;
        isWin = true;
    }
    //check r -> l diagonal win
    else if (tracker["(400,0)"] == turnValue && tracker["(200,200)"] == turnValue && tracker["(0,400)"] == turnValue) {
        x1 = 600;
        y1 = 0;
        x2 = 0;
        y2 = 600;
        isWin = true;
    }
    //check horizontal wins
    else if (tracker["(0,0)"] == turnValue && tracker["(200,0)"] == turnValue && tracker["(400,0)"] == turnValue) {
        x1 = 0;
        y1 = 100;
        x2 = 600;
        y2 = 100;
        isWin = true;
    }
    else if (tracker["(0,200)"] == turnValue && tracker["(200,200)"] == turnValue && tracker["(400,200)"] == turnValue) {
        x1 = 0;
        y1 = 300;
        x2 = 600;
        y2 = 300;
        isWin = true;
    }
    else if (tracker["(0,400)"] == turnValue && tracker["(200,400)"] == turnValue && tracker["(400,400)"] == turnValue ) {
        x1 = 0;
        y1 = 500;
        x2 = 600;
        y2 = 500;
        isWin = true;
    }
    //check vertical win
    else if (tracker["(0,0)"] == turnValue && tracker["(0,200)"] == turnValue && tracker["(0,400)"] == turnValue){
        x1 = 100;
        y1 = 0;
        x2 = 100;
        y2 = 600;
        isWin = true;
    }
    else if (tracker["(200,0)"] == turnValue && tracker["(200,200)"] == turnValue && tracker["(200,400)"] == turnValue){
        x1 = 300;
        y1 = 0;
        x2 = 300;
        y2 = 600;
        isWin = true;
    }
    else if (tracker["(400,0)"] == turnValue && tracker["(400,200)"] == turnValue && tracker["(400,400)"] == turnValue){
        x1 = 500;
        y1 = 0;
        x2 = 500;
        y2 = 600;
        isWin = true;
    }

    return [isWin, x1, y1, x2, y2];
}

//draw each line in X
function printXLine(xStartPoint, yStartPoint, state) {

    let xEndPoint = xStartPoint + 200;
    const size = 10;

    ctx.beginPath(); // Start a new path
    ctx.moveTo(xStartPoint, yStartPoint);
    ctx.strokeStyle = '#192a53';

    const id = setInterval(() => {

        xStartPoint += size;
        if (state == 1) {
            yStartPoint += size;
        } else if (state == 2) {
            yStartPoint -= size;
        }
         // Start a new path
        ctx.lineTo(xStartPoint, yStartPoint);
        ctx.stroke();

        if (xStartPoint >= xEndPoint-45) {
            clearInterval(id);
        }

    }, 10);
}

function drawX(startXValue, startYValue){
    printXLine(startXValue+20, startYValue+20, 1) //draw top down line
    setTimeout(()=>{
        printXLine(startXValue+20, startYValue+180, 2) //draw bottom up line
    }, 200);
}

function animateO(current) {

    //start at position x,y at 70px radius, and start point 4.75 radians
    ctx.beginPath();
    ctx.arc(circX, circY, 70, 0, ((Math.PI * 2) * current*5));
    ctx.stroke();
    curPerc++;

    //iterate over circle until 100
    if (curPerc <= 20) {
        requestAnimationFrame(function () {
            animateO(curPerc / 100)
        });
    } else {
        curPerc = 0;
    }
}
