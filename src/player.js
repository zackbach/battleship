const playerFactory = () => {
    const isHuman = true;
    const myTurn = true;

    const makeAttack = (enemy, x, y) => {
        let valid = false;
        while (valid === false) {
            if(enemy.attack(x, y)) {
                valid = true
            } else {
                alert("Please make a valid move");
            }
        }
    }

    const swapTurns = function() {
        this.myTurn = !this.myTurn;
    }

    return { isHuman, makeAttack, myTurn, swapTurns }
}

export { playerFactory }