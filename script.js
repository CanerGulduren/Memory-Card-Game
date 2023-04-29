let isGameActive;
let isCardMatched;
const cards = Array.from(document.querySelectorAll(".card"));
const imageElem = Array.from(document.querySelectorAll(".gameboard img"));
const questionImg = "img/question.png";
const gameEndScreen = document.querySelector(".game-end")
const gameEndMessage = document.querySelector(".end-message")
let difficultyChange = document.querySelector(".difficulty-change")
let selectedDifficulty = document.getElementsByTagName("option")[difficultyChange.selectedIndex].value
let remainAttempt = document.querySelector(".remain-attempt")
let cardSource = [
  "img/apple.png",
  "img/banana.png",
  "img/blueBird.png",
  "img/cat.png",
  "img/grape.png",
  "img/grayBird.png",
  "img/rabbit.png",
  "img/watermelon.png",
];
let CARD_DATA = [...cardSource, ...cardSource].sort(() => Math.random() - 0.5);
let GAME_END_DATA = [
  {lostBG: "radial-gradient(#ed1818, #c89b9b)",
  winBG: "radial-gradient(#2e881e, #a2be92)", 
  
  },
   {
    lostTXT: "You Lost!",
    winTXT: "You Win!"
   }
]
let matchedCards = [];


function getSrcData() {
  for (let i = 0; i < CARD_DATA.length; i++) {
    imageElem[i].dataset.src = CARD_DATA[i];
    cards[i].dataset.matched = false
  } 
  remainAttempt.innerText = selectedDifficulty
}

function checkCardMatch(img) {
  matchedCards.unshift(img.src);
  matchedCards[0] == matchedCards[1]
    ? (isCardMatched = true)
    : (isCardMatched = false);
}

function setRules() {
  let flipCard = document.querySelectorAll(".flipped");
  if (flipCard.length < 2) {
    return;
  }
  cardBehaviour(flipCard)
  decreaseAttempt()
}

function cardBehaviour(flipCard){
  flipCard.forEach((card) => {
    if (isCardMatched) {
      card.style.backgroundColor = "#84ff46";
      card.classList.remove("flipped");
      card.dataset.matched = true
      matchedCards.length = 0;
    } else {
      setTimeout(() => {
        flipAfterAnim(card);
      }, 1000);
    }
  });
}

function flipAfterAnim(card) {
  card.dataset.matched = false
  card.classList.remove("flip-card", "flipped");
  card.firstElementChild.src = questionImg;
  matchedCards.length = 0;
}

function decreaseAttempt(){
  if(isCardMatched){return}
  let currentAttempt = Number(remainAttempt.innerText) 
  currentAttempt--
  remainAttempt.innerText = currentAttempt
}

function endGame(){
  let winCondition = cards.every((card) => card.dataset.matched === "true");
  if (remainAttempt.innerText == 0 || winCondition) {
    isGameActive = false;
  }
  if (isGameActive) {
    return;
  }
  gameEndScreen.style.display = "flex";
  gameEndScreen.style.background = `${
    winCondition ? GAME_END_DATA[0].winBG : GAME_END_DATA[0].lostBG
  }`;
  gameEndMessage.innerHTML = `${
    winCondition ? GAME_END_DATA[1].winTXT : GAME_END_DATA[1].lostTXT
  }`;
}
  

function disableDiffChange(){
  isGameActive ? difficultyChange.disabled = true : difficultyChange.disabled = false
}



getSrcData();

cards.forEach((card) => {
  let cardImg = card.firstElementChild;
  card.addEventListener("click", () => {
    isGameActive = true
    if (matchedCards.length > 1 || card.classList.contains("flip-card")) {
      return;
    }
    card.classList.add("flip-card", "flipped");
    cardImg.src = cardImg.dataset.src;
    checkCardMatch(cardImg);
    setRules();
    disableDiffChange()
    endGame()
  });
});

difficultyChange.addEventListener("change", ()=>{
  remainAttempt.innerText = document.getElementsByTagName("option")[difficultyChange.selectedIndex].value
})
