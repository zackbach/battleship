const computerFactory = () => {
    const isHuman = false;
    
    const placeShips = (gb) => {
        const LENGTHS = [2, 3, 3, 4, 5];
        LENGTHS.forEach(len => {
            let placed = false;
            while (placed === false) {
                let rotated = Math.random() < 0.5;
                if (gb.placeShip(len, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), rotated)) {
                    placed = true
                }
            }
        })
    }

    //this has not been tested yet
    const makeAttack = (enemyGB) => {
        let valid = false;
        while (valid === false) {
            if(enemyGB.attack(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))) {
                valid = true
            }
        }
    }

    return { placeShips, makeAttack, isHuman }
}

export { computerFactory }