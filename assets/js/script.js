//variable for the div that holds the time counter
var timerEl = document.getElementById("timer");

//variable for the button that starts the game
var startButton = document.getElementById("start-button");

//variable for reset button
var resetButton = document.getElementById("reset-button");

//variable for the span containing the win counter
var winCounter = document.getElementById("win");

//variable for content of guessable word
var targetWord = document.getElementById("target-word");

//variable for actual win counter
var win = localStorage.getItem("wins");
winCounter.textContent = win;
if (win === null) {
  win = 0;
}

//variable for the span containing the loss counter
var loseCounter = document.getElementById("lose");

//variable for actual loss counter
var lose = localStorage.getItem("losses");
loseCounter.textContent = lose;
if (lose === null) {
  lose = 0;
}

//variable for the h3 saying "seconds remaining"
var timerText = document.getElementById("subTimer");

//make an array of words to select
var wordList = ["dog", "cat", "goat", "alligator", "bird", "snake"];

var wordSelect = "";

var displayWord = [];

//if all letters are guessed, cancel countdown() a   nd run displayMessage()

//starts the countdown
startButton.addEventListener("click", countdown);

//resets scores
resetButton.addEventListener("click", reset);

//starts the timer countdown and should have the function that picks a word activate
function countdown() {
    //deactivates button until function completes
    startButton.disabled = true;

    //runs timer
    var timeLeft = 10;
    var timeInterval = setInterval(function () {
    
    if (wordSelect === displayWord.join("")) {
      clearInterval(timeInterval);
      scoreUpdate();
      setTimeout(displayMessage, 100);
      startButton.removeAttribute('disabled');
    }
    else if (timeLeft > 1) {
      timerEl.textContent = timeLeft;
      timerText.textContent = 'seconds remaining';
      timeLeft--;
    }
    else if (timeLeft === 1) {
      timerEl.textContent = timeLeft;
      timerText.textContent = 'second remaining';
      timeLeft--;
    }
    else {
      timerEl.textContent = timeLeft;
      timerText.textContent = 'seconds remaining';
      clearInterval(timeInterval);
    
      //runs win/loss message after slight delay to allow timer to go to 0
      setTimeout (displayMessage, 100);
    
      //runs score update function 
      scoreUpdate();
    
      //reactivates button
      startButton.removeAttribute('disabled');
    }
  }, 500);

    //make a variable that will be the randomly selected word -- MUST BE IN FUNCTION TO CHANGE EACH TIME
    wordSelect = wordList[Math.floor(Math.random() * wordList.length)];

    //replaces letters with underscores
    displayWord = [];
    for (var i = 0; i < wordSelect.length; i++) {
        displayWord[i] = "_";
    }
    


    //displays target word as underscores without commas
    targetWord.textContent = displayWord.join(" ");

    //function to test an input against wordSelect
    // if (displayWord != wordSelect) {
      document.addEventListener("keydown", keyPress);
      function keyPress(event) {
        var guess = event.key;
        guess = guess.toLowerCase();
        for (var j = 0; j < wordSelect.length; j++) {
            if (wordSelect[j] === guess) {
              displayWord[j] = guess;
              targetWord.textContent = displayWord.join(" ");
            }
          }
        }
      }
    
  //displays alert telling user whether they win or lose
function displayMessage() {
    if (wordSelect === displayWord.join("")) {
        alert("Congratulations, you win!");
    }
    else {
        alert("You lose!");
    }
}

//updates the win/lose record
function scoreUpdate() {
    if (wordSelect === displayWord.join("")) {
      win++;
      winCounter.textContent = win;
      localStorage.setItem("wins", win);
    }
    else {
      lose++;
      loseCounter.textContent = lose;
      localStorage.setItem("losses", lose);
    }
}

//resets score when button is clicked
function reset() {
    winCounter.textContent = 0;
    win = 0;
    loseCounter.textContent = 0;
    lose = 0;
    localStorage.setItem("wins", 0);
    localStorage.setItem("losses", 0);
}