document.getElementById('myForm').addEventListener('submit', saveDetails);
let gameAreaBtn = document.getElementById('gameArea');

gameAreaBtn.style.display = "none";

// document.getElementById('hideBtn').addEventListener('click',()=>{
//     document.getElementById('GamePad').style.display = "none"
// })

function saveDetails(e) {
    let player1 = document.getElementById('player1name').value;
    let playerOneChoice = document.getElementById('player1choice').value;

    let player2 = document.getElementById('player2name').value;
    let playerTwoChoice = document.getElementById('player2choice').value;

    let player3 = document.getElementById('player3name').value;
    let playerThreeChoice = document.getElementById('player3choice').value;

    let stat = document.getElementById('stat').value;

    let userData = {
        player1,
        playerOneChoice,
        player2,
        playerTwoChoice,
        player3,
        playerThreeChoice,
        stat
    }

    if (localStorage.getItem('details') === null) {
        let userDetails = [];
        userDetails.push(userData);
        localStorage.setItem('details', JSON.stringify(userDetails));

    } else {

        let userDetails = JSON.parse(localStorage.getItem('details'));
        userDetails.push(userData);
        localStorage.setItem('details', JSON.stringify(userDetails));

    }

    document.getElementById('GamePad').style.display = "none";
    gameAreaBtn.style.display = "block";
    // gameOn();

    e.preventDefault();
}

function generateResult() {
    let min = 1, max = 4;
    let random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
}

function assignLabel(x) {
    if (x == 1) {
        return "Stone";
    } else if (x == 2) {
        return "Paper";
    } else if (x == 3){
        return "Scissors";
    } else if(x == 0) {
        return "Tie";
    }
}


function gameOn() {

    let playerDetails = JSON.parse(localStorage.getItem('details'));
    let currMatch = playerDetails[playerDetails.length - 1];
    console.log(currMatch);

    let playerScores = {
        player1score: generateResult(),
        player2score: generateResult(),
        player3score: generateResult()
    }
    currMatch = Object.assign(currMatch, playerScores);
    
    console.log(playerScores);

    playerDetails[playerDetails.length - 1] = currMatch;
    localStorage.setItem('details', JSON.stringify(playerDetails));

    document.getElementById('player1').innerHTML = assignLabel(currMatch.player1score);
    document.getElementById('player2').innerHTML = assignLabel(currMatch.player2score);
    document.getElementById('player3').innerHTML = assignLabel(currMatch.player3score);

    let set = new Set([playerScores.player1score, playerScores.player2score, playerScores.player3score]);
    console.log(set);

    let label = evaluator(set);
    // console.log(label);
    // document.getElementById('result').innerHTML = assignLabel(label);

    
        
    let arr = Object.values(playerScores);
    // console.log(arr);
    let win =  winner(label,arr,currMatch);
    console.log(win);
    // let allSame = new Set();
    // allSame = win;
    // if(allSame.size == 1)
    //     console.log(allSame);
    let z = win.toString();
    document.getElementById('result').innerHTML = `<h3>${z}</h3>`;


    
}

function winner(x,y,z) {

    // let player = ["Player 1","Player 2","Player 3"];
    let player = [z.player1,z.player2,z.player3];
    let w = [];
    if(x == 0)
        return "Match Tie";
    else if(x == 4){
        // console.log(player[x]);
        return "Match Tie";
    }
    else {
    for(let i=0;i<y.length;i++){
        if(x==y[i])
            w.push(player[i]);
        }
    return w;
    }
}


function evaluator(y){
    
    if(y.size == 1){
        return 4;
    }
    else if(y.size == 3){
        return 0;
    }
    else if(y.size == 2){
        if(y.has(1) && y.has(2))
            return 2;
        else if(y.has(2) && y.has(3))
            return 3;
        else if(y.has(1) && y.has(3))
            return 1;
    }
}

