isGameActive = true;
let cards = Array.from(document.querySelectorAll(".card"));
let imageElem = document.querySelectorAll(".container img");
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

getSrcData();

function getSrcData() {
  for (let i = 0; i < CARD_DATA.length; i++) {
    imageElem[i].dataset.src = CARD_DATA[i];
  }
}


