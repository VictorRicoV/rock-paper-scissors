// El styles lo importamos aquí para que se encargue Vite de compilar todo
import '../scss/styles.scss';

let userPoints = 0;
let pcPoints = 0;
let userPlay = null;
let pcPlat = null;

const gameContainerElement = document.getElementById('game-container');

const handleClick = event => {
  console.log(event.target);
};

gameContainerElement.addEventListener('click', handleClick);
