let isGameActive = true;
let isCardMatched;
const cards = Array.from(document.querySelectorAll(".card"));
const imageElem = Array.from(document.querySelectorAll(".gameboard img"));
const questionImg = "img/question.png";
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


getSrcData();

cards.forEach((card) => {
  let cardImg = card.firstElementChild;
  card.addEventListener("click", () => {
    if (matchedCards.length > 1) {
      return;
    }
    if (card.classList.contains("flipped")) {
      return;
    }
    card.classList.add("flip-card", "flipped");
    cardImg.src = cardImg.dataset.src;
    checkCardMatch(cardImg);
    setCardBehavior();
  });
});

function getSrcData() {
  for (let i = 0; i < CARD_DATA.length; i++) {
    imageElem[i].dataset.src = CARD_DATA[i];
  }
}

function checkCardMatch(img) {
  matchedCards.unshift(img.src);
  matchedCards[0] == matchedCards[1]
    ? (isCardMatched = true)
    : (isCardMatched = false);
}

function setCardBehavior() {
  let flipCard = document.querySelectorAll(".flipped");
  if (flipCard.length < 2) {
    return;
  }
  flipCard.forEach((card) => {
    if (isCardMatched) {
      card.style.backgroundColor = "#84ff46";
      card.classList.remove("flipped");
      matchedCards.length = 0;
    } else {
      setTimeout(() => {
        flipAfterAnim(card)
      }, 1000);
    }
  });
}

function flipAfterAnim(card){
  card.classList.remove("flip-card", "flipped");
  card.firstElementChild.src = questionImg;
  matchedCards.length = 0;
}
