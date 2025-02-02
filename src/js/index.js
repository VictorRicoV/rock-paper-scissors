// El styles lo importamos aquí para que se encargue Vite de compilar todo
import '../scss/styles.scss';
const gameContainerElement = document.getElementById('game-items');
const pointsUserElement = document.getElementById('points-user');
const pointsPcElement = document.getElementById('points-pc');
const gameResultsElement = document.getElementById('game-results');
const playAgainElement = document.getElementById('play-again');
const textGameResultElement = document.getElementById('game-result');
const pickedUserImageElement = document.getElementById('picked-user-image');
const pickedPcImageElement = document.getElementById('picked-pc-image');
const rulesElement = document.getElementById('button-rules');
const modalElement = document.getElementById('modal');
const resultElement = document.getElementById('result');

const pcOptions = ['paper', 'scissors', 'rock'];

let userPoints = 0;
let pcPoints = 0;
let userPlay = null;
let pcPlay = null;

const gameOptions = {
  rock: {
    scissors: true,
    lizard: true,
    paper: false,
    spock: false
  },
  scissors: {
    paper: true,
    lizard: true,
    rock: false,
    spock: false
  },
  paper: {
    rock: true,
    spock: true,
    lizard: false,
    scissors: false
  },
  lizard: {
    paper: true,
    spock: true,
    scissors: false,
    rock: false
  },
  spock: {
    rock: true,
    scissors: true,
    paper: false,
    lizard: false
  }
};

const gameImage = {
  paper: '../assets/images/icon-paper.svg',
  rock: '../assets/images/icon-rock.svg',
  scissors: '../assets/images/icon-scissors.svg',
  lizard: '../assets/images/icon-lizard.svg',
  spock: '../assets/images/icon-spock.svg'
};

if (document.body.dataset.mode === 'advanced') {
  pcOptions.push('lizard', 'spock');
}

const removeLastClass = () => {
  const pcLastClass = pickedPcImageElement.parentElement.classList.length - 1;
  const userLastClass =
    pickedUserImageElement.parentElement.classList.length - 1;
  pickedUserImageElement.parentElement.classList.remove(
    pickedUserImageElement.parentElement.classList[pcLastClass]
  );
  pickedPcImageElement.parentElement.classList.remove(
    pickedPcImageElement.parentElement.classList[userLastClass]
  );
};

const changeResultImage = () => {
  removeLastClass();
  pickedUserImageElement.src = gameImage[userPlay];
  pickedPcImageElement.src = gameImage[pcPlay];
  pickedUserImageElement.parentElement.classList.add('game-item--' + userPlay);
  pickedPcImageElement.parentElement.classList.add('game-item--' + pcPlay);
};

const showResults = () => {
  gameResultsElement.classList.remove('hide');
  gameContainerElement.classList.add('hide');
  resultElement.classList.remove('hide');
};

const hideResults = () => {
  gameResultsElement.classList.add('hide');
  gameContainerElement.classList.remove('hide');
  resultElement.classList.add('hide');
};

const whoWins = () => {
  if (userPlay === pcPlay) {
    console.log('empate');
    textGameResultElement.textContent = 'TIE';
  } else if (gameOptions[userPlay][pcPlay]) {
    console.log('ganaste');
    textGameResultElement.textContent = 'YOU WIN';
    userPoints++;
  } else {
    console.log('perdiste');
    textGameResultElement.textContent = 'PC WIN';
    pcPoints++;
  }
  pointsUserElement.textContent = userPoints;
  pointsPcElement.textContent = pcPoints;
};

const setPcSelection = () => {
  const randomNumber = Math.floor(Math.random() * pcOptions.length);
  pcPlay = pcOptions[randomNumber];
  console.log(userPlay + '---' + pcPlay);
  whoWins();
  showResults();
  changeResultImage();
};

const setUserSelection = event => {
  const selectedElement = event.target.closest('.game-item');
  if (!selectedElement) return;

  userPlay = selectedElement.dataset.item;
  setPcSelection();
};

const hideModal = () => {
  modalElement.classList.add('hide');
};

const showModal = () => {
  modalElement.classList.remove('hide');
};

gameContainerElement.addEventListener('click', setUserSelection);
playAgainElement.addEventListener('click', hideResults);
rulesElement.addEventListener('click', showModal);
modalElement.addEventListener('click', hideModal);
