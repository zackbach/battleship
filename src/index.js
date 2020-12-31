import { playGame, renderBoard, renderShips } from './DOMController'
import { gameboardFactory } from './gameboard'
import { computerFactory } from './computer'
import { playerFactory } from './player';

const playerBoard = gameboardFactory();
const compBoard = gameboardFactory();
const computer = computerFactory();
const player = playerFactory();
let isOver = false

computer.placeShips(playerBoard);
computer.placeShips(compBoard);
renderBoard(true);
renderBoard(false);
renderShips(playerBoard);

//adds listeners for buttons
document.getElementById("up").onclick = () => { playerBoard.moveShip(0); renderShips(playerBoard); }
document.getElementById("right").onclick = () => { playerBoard.moveShip(1); renderShips(playerBoard); }
document.getElementById("down").onclick = () => { playerBoard.moveShip(2); renderShips(playerBoard); }
document.getElementById("left").onclick = () => { playerBoard.moveShip(3); renderShips(playerBoard); }
document.getElementById("rotate").onclick = () => { playerBoard.moveShip(4); renderShips(playerBoard); }
document.getElementById("start").onclick = () => { 
    document.getElementById("mvmt").classList.add("gone");
    document.getElementById("tip").textContent = "It is the player's turn."
    playGame(player, playerBoard, computer, compBoard, isOver);
}