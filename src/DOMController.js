import { playerFactory } from "./player";

const renderBoard = (isHuman) => {
    //If it is rendering the player's board, player = true

    let container;
    let id;
    if (isHuman) {
        container = document.getElementById("playerBoard");
        id = "player";
    } else {
        container = document.getElementById("compBoard");
        id = "comp";
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const square = document.createElement('div')
            square.classList.add('square');
            square.id = `${id}${j}${i}`
            container.appendChild(square);
        }
    }
}

const renderShips = (gb) => {
    let array = Array.prototype.slice.call(document.getElementById("playerBoard").childNodes);
    array.forEach(div => {
        div.classList.remove('len2');
        div.classList.remove('len3');
        div.classList.remove('len4');
        div.classList.remove('len5');
    })

    let index = 0;
    gb.ships.forEach(ship => {
        ship.occupied.forEach(coord => {
            let x = coord[0];
            let y = coord[1];
    
            document.getElementById(`player${x}${y}`).classList.add(`len${ship.length}`);
            document.getElementById(`player${x}${y}`).onclick = () => {
                gb.select(gb.ships.indexOf(ship));
            }
        })
        index++
    })
}

//takes enemy and THEIR gameboard
const renderHits = (enemy, enemyGB) => {
    let id;
    if (enemy.isHuman) {
        id="player"
    } else {
        id="comp"
    }
    
    enemyGB.hit.forEach(coord => {
        let x = coord[0];
        let y = coord[1];
    
        document.getElementById(`${id}${x}${y}`).classList.add("hit");
    });
    enemyGB.missed.forEach(coord => {
        let x = coord[0];
        let y = coord[1];
    
        document.getElementById(`${id}${x}${y}`).classList.add("missed");
    });
}

//actual game loop is in here LOL
const playGame = (player, playerGB, comp, compGB, isOver) => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) { 
            document.getElementById(`comp${j}${i}`).onclick = () => {
                if (isOver === false) {
                    if(compGB.attack(j, i)) {
                        renderHits(comp, compGB)
                        if (compGB.ships.length === 0) {
                            isOver = true
                            document.getElementById("winner").textContent = "Player Wins!!"
                        }
                        comp.makeAttack(playerGB);
                        renderHits(player, playerGB);
                        if (playerGB.ships.length === 0) {
                            isOver = true
                            document.getElementById("winner").textContent = "Computer Wins!!"
                        }
                    } else {
                        alert("Please make a valid move");
                    }
                }
            }
        } 
    }
}

export { renderBoard, renderShips, renderHits, playGame }