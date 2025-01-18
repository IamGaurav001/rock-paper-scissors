let score = JSON.parse(localStorage.getItem("score")) || {
    win: 0,
    tie: 0,
    losses: 0,
  };

  updateScore();

  //Rock Button
  document.querySelector(".js-rock").addEventListener("click", () => {
    const computerMove = pickComputerMove();
    result("rock");
  });

  //Paper Button
  document.querySelector(".js-paper").addEventListener("click", () => {
    const computerMove = pickComputerMove();
    result("paper");
  });

  //Scissor Button
  document.querySelector(".js-scissor").addEventListener("click", () => {
    const computerMove = pickComputerMove();
    result("scissors");
  });

  // Reset button
  document.querySelector(".js-reset").addEventListener("click", () => {
    score.losses = 0;
    score.win = 0;
    score.tie = 0;
    localStorage.setItem("score", JSON.stringify(score));

    updateScore();
    document.querySelector(
      ".js-result"
    ).innerHTML = `Scores have been reset.`;
  });

  //AutoPlay Button
  let isAutoPlaying = false;
  let intervalId;
  document.querySelector(".js-autoplay").addEventListener("click", () => {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        result(playerMove);
        isAutoPlaying = true;
      }, 1000);
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  });

  // Applying Keydown with eventListener
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "r":
        result("rock");
        break;
      case "p":
        result("paper");
        break;
      case "s":
        result("scissors");
        break;
    }
  });

  // Update score display
  function updateScore() {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Wins: ${score.win}, Ties: ${score.tie}, Losses: ${score.losses}`;
  }

  function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = "";
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = "paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 3 / 3) {
      computerMove = "scissors";
    }
    return computerMove;
  }

  function result(playerMove) {
    const computerMove = pickComputerMove();
    let resultMessage = "";
    if (playerMove === computerMove) {
      resultMessage = "It's a Tie";
      score.tie += 1;
    } else if (
      (playerMove === "rock" && computerMove === "scissors") ||
      (playerMove === "paper" && computerMove === "rock") ||
      (playerMove === "scissors" && computerMove === "paper")
    ) {
      resultMessage = "You win";
      score.win += 1;
    } else {
      resultMessage = "You lose";
      score.losses += 1;
    }

    // Save updated score to localStorage
    localStorage.setItem("score", JSON.stringify(score));

    updateScore();
    document.querySelector(
      ".js-result"
    ).innerHTML = `You chose ${playerMove}, computer chose ${computerMove}. ${resultMessage}`;
  }