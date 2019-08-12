document.getElementById("myForm").addEventListener("submit", saveDetails);
let gameAreaBtn = document.getElementById("gameArea");
gameAreaBtn.style.display = "none";

function saveDetails(e) {
  let player1 = document.getElementById("player1name").value;
  let playerOneChoice = document.getElementById("player1choice").value;

  let player2 = document.getElementById("player2name").value;
  let playerTwoChoice = document.getElementById("player2choice").value;

  let player3 = document.getElementById("player3name").value;
  let playerThreeChoice = document.getElementById("player3choice").value;

  let stat = document.getElementById("stat").value;

  let userData = {
    player1,
    playerOneChoice,
    player2,
    playerTwoChoice,
    player3,
    playerThreeChoice,
    stat
  };

  if (localStorage.getItem("details") === null) {
    let userDetails = [];
    userDetails.push(userData);
    localStorage.setItem("details", JSON.stringify(userDetails));
  } else {
    let userDetails = JSON.parse(localStorage.getItem("details"));
    let currUser = userDetails[userDetails.length - 1];
    currUser = Object.assign(currUser, userData);
    userDetails[userDetails - 1] = currUser;
    // userDetails.push(userData);
    localStorage.setItem("details", JSON.stringify(userDetails));
  }

  document.getElementById("GamePad").style.display = "none";
  gameAreaBtn.style.display = "block";

  document.getElementById("statement").innerHTML = userData.stat;

  document.getElementById("player1naam").innerHTML = userData.player1;
  document.getElementById("player2naam").innerHTML = userData.player2;
  document.getElementById("player3naam").innerHTML = userData.player3;

  document.getElementById("player01choice").innerHTML =
    userData.playerOneChoice;
  document.getElementById("player02choice").innerHTML =
    userData.playerTwoChoice;
  document.getElementById("player03choice").innerHTML =
    userData.playerThreeChoice;
  e.preventDefault();
}

function generateResult() {
  let min = 1,
    max = 4;
  let random = Math.floor(Math.random() * (+max - +min)) + +min;
  return random;
}

function assignLabel(x) {
  if (x == 1) {
    return "./img/stone.png";
  } else if (x == 2) {
    return "./img/paper.png";
  } else if (x == 3) {
    return "./img/scissors.png";
  } else if (x == 0) {
    return "Tie";
  }
}

function gameOn() {
  document.getElementById("playButton").disabled = true;
  let playerDetails = JSON.parse(localStorage.getItem("details"));
  let currMatch = playerDetails[playerDetails.length - 1];

  let playerScores = {
    player1score: generateResult(),
    player2score: generateResult(),
    player3score: generateResult()
  };
  currMatch = Object.assign(currMatch, playerScores);

  playerDetails[playerDetails.length - 1] = currMatch;
  localStorage.setItem("details", JSON.stringify(playerDetails));

  document.getElementById("player1").src = assignLabel(currMatch.player1score);
  document.getElementById("player2").src = assignLabel(currMatch.player2score);
  document.getElementById("player3").src = assignLabel(currMatch.player3score);
  let set = new Set([
    playerScores.player1score,
    playerScores.player2score,
    playerScores.player3score
  ]);

  let label = evaluator(set);

  let arr = Object.values(playerScores);
  let win = winner(label, arr, currMatch);

  let z = win.toString();
  startRolling(z);
  document.getElementById("playButton").dis;
}

function winner(x, y, z) {
  let player = [z.player1, z.player2, z.player3];
  let w = [];
  if (x == 0) return "Match Tie";
  else if (x == 4) {
    return "Match Tie";
  } else {
    for (let i = 0; i < y.length; i++) {
      if (x == y[i]) w.push(player[i]);
    }
    return w;
  }
}

function evaluator(y) {
  if (y.size == 1) {
    return 4;
  } else if (y.size == 3) {
    return 0;
  } else if (y.size == 2) {
    if (y.has(1) && y.has(2)) return 2;
    else if (y.has(2) && y.has(3)) return 3;
    else if (y.has(1) && y.has(3)) return 1;
  }
}

const startRolling = z => {
  let n = 1;
  let t = setInterval(() => {
    if (n == 5) {
      clearInterval();
      document.querySelectorAll(".randomImage").forEach(index => {
        index.style.display = "none";
      });
      document.querySelectorAll(".resultImg").forEach(index => {
        index.style.display = "block";
      });
      document.getElementById("result").innerHTML = `<h3>${z}</h3>`;
    } else {
      document.querySelectorAll(".randomImage").forEach(index => {
        index.style.display = "block";
        index.src = getRandomString();
        index.classList.add("heartBeat", "infinite", "animated", "faster");
      });
      n++;
    }
  }, 500);
};

function getRandomString() {
  const imageUrl = ["/img/stone.png", "/img/paper.png", "/img/scissors.png"];
  return imageUrl[Math.floor(Math.random() * Math.floor(3))];
}
