let isGameActive;
let isCardMatched;
const cards = Array.from(document.querySelectorAll(".card"));
const imageElem = Array.from(document.querySelectorAll(".gameboard img"));
const questionImg = "img/question.png";
const gameEndScreen = document.querySelector(".game-end");
const gameEndMessage = document.querySelector(".end-message");
let difficultyChange = document.querySelector(".difficulty-change");
let selectedDifficulty =
  document.getElementsByTagName("option")[difficultyChange.selectedIndex].value;
let remainAttempt = document.querySelector(".remain-attempt");
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
let matchedCards = [];

function getSrcData() {
  for (let i = 0; i < CARD_DATA.length; i++) {
    imageElem[i].dataset.src = CARD_DATA[i];
  }
  remainAttempt.innerText = selectedDifficulty;
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
  cardBehaviour(flipCard);
  decreaseAttempt();
}

function cardBehaviour(flipCard) {
  flipCard.forEach((card) => {
    if (isCardMatched) {
      card.style.backgroundColor = "#84ff46";
      card.classList.remove("flipped");
      matchedCards.length = 0;
    } else {
      setTimeout(() => {
        flipAfterAnim(card);
      }, 1000);
    }
  });
}

function flipAfterAnim(card) {
  card.classList.remove("flip-card", "flipped");
  card.firstElementChild.src = questionImg;
  matchedCards.length = 0;
}

function decreaseAttempt() {
  if (isCardMatched) {
    return;
  }
  let currentAttempt = Number(remainAttempt.innerText);
  currentAttempt--;
  remainAttempt.innerText = currentAttempt;
  if (currentAttempt === 0) {
    isGameActive = false;
  }
}

function disableDiffChange() {
  isGameActive
    ? (difficultyChange.disabled = true)
    : (difficultyChange.disabled = false);
}

getSrcData();

cards.forEach((card) => {
  let cardImg = card.firstElementChild;
  card.addEventListener("click", () => {
    isGameActive = true;
    if (matchedCards.length > 1 || card.classList.contains("flip-card")) {
      return;
    }
    card.classList.add("flip-card", "flipped");
    cardImg.src = cardImg.dataset.src;
    checkCardMatch(cardImg);
    setRules();
    disableDiffChange();
  });
});

difficultyChange.addEventListener("change", () => {
  remainAttempt.innerText =
    document.getElementsByTagName("option")[
      difficultyChange.selectedIndex
    ].value;
});
