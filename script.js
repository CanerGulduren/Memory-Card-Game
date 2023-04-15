let isGameActive = true;
let isCardCorrect;
let cards = Array.from(document.querySelectorAll(".card"));
let imageElem = Array.from(document.querySelectorAll(".container img"));
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
let checkArray = [];

getSrcData();

function getSrcData() {
  for (let i = 0; i < CARD_DATA.length; i++) {
    imageElem[i].dataset.src = CARD_DATA[i];
  }
}

cards.forEach((card) => {
  let cardImg = card.firstElementChild;
  card.addEventListener("click", () => {
    //if(checkArray.length > 1){return}
    flipCard(card, cardImg);
  });
});

function flipCard(card, img) {
  card.classList.add("flip-card")
  img.src = img.dataset.src;
  setRules(img);
}

function setRules(img) {
  checkArray.unshift(img.src);
  let flipImg = Array.from(document.querySelectorAll(".flip-card"))
  console.log(flipImg)
  if(flipImg.length < 2){return}
  else{
    correctCards()
  }
}

function correctCards(){
  checkArray[0] == checkArray[1]
  ? (isCardCorrect = true)
  : (isCardCorrect = false);
  console.log(isCardCorrect)
}

