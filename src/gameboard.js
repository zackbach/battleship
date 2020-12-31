import { shipFactory } from './ships'

const gameboardFactory = () => {
    let ships = [];
    let hit = [];
    let missed = [];
    let board = [ [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0] ];
            //coordinates are reversed when accessing board
            //if there is a ship there, the number on the board will be the length of the ship

    const updateBoard = () => {        
        let nboard = [ [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0] ];
        
        ships.forEach(ship => {
            ship.occupied.forEach(coord => {
                nboard[coord[1]][coord[0]] = ship.length;
            })
        })
        return nboard
    }

    //THIS TOOK SO LONG: I had to rewrite using 'this' and no arrow notation and I still don't really know why (some weird scoping stuff)
    const placeShip = function(len, x, y, isRot) {
        //checks if coords are even valid
        
        if (isRot === false) {
            if (x > -1 && y > -1 && x+len-1 < 10 && y < 10) {
                //checks to see if board spaces are empty, returns false if not
                for (let i = 0; i < len; i++) {
                    if (this.board[y][x+i] !== 0) {
                        return false;
                    }
                }

                this.ships.push(shipFactory(len, x, y, false));
                this.board = updateBoard();
                return true;
                }
            return false;
        } else if (isRot === true) {
            if (x > -1 && y > -1 && x < 10 && y+len-1 < 10) {
                //checks to see if board spaces are empty, returns false if not
                for (let i = 0; i < len; i++) {
                    if (this.board[y+i][x] !== 0) {
                        return false;
                    }
                }

                this.ships.push(shipFactory(len, x, y, true));
                this.board = updateBoard();
                return true;
                }
            return false;
        }
        alert('ERROR: ROTATED IS NEITHER TRUE NOR FALSE')
    } 
    
    //returns false if the attack has been made already and true if it either hits or misses (used for testing now)
    const attack = function(i, j) {
        //checks if the coordinate pair has been hit before

        let hasBeenHit = false
        
        this.hit.forEach(coord => {
            if (coord[0] === i && coord[1] === j) {
                hasBeenHit = true
            }
        })

        this.missed.forEach(coord => {
            if (coord[0] === i && coord[1] === j) {
                hasBeenHit = true
            }
        })
        
        //actually hits the coord: updates ship
        if (hasBeenHit === false) {
            if (this.board[j][i] === 0) {
                this.missed.push([i, j]);
                return true
            } else {
                this.hit.push([i, j]);
                for (let k = 0; k < this.ships.length; k++) {
                    if (this.ships[k].hit(i, j)) {
                        if (this.ships[k].checkSunk()) {
                            this.ships.splice(k, 1);
                            this.board = updateBoard();
                        }
                    }
                }
                return true
            }
        }
        return false
    }

    //later: have it return the new selected ship index
    const moveShip = function(dir) {
        //dir = 0 (up), 1 (right), 2 (down), 3 (left), or 4 (rotate)
        let index = this.ships.length - 1
        let ship = this.ships[index]

        //NOTE: the splicing and updating before and after is suboptimal, but oh well
        switch(dir) {
            case 0:
                this.ships.splice(index, 1);
                this.board = updateBoard();
                if (this.placeShip(ship.length, ship.location[0], ship.location[1]-1, ship.isRotated)) {
                } else {
                    this.placeShip(ship.length, ship.location[0], ship.location[1], ship.isRotated);
                }
                break
            case 1:
                this.ships.splice(index, 1);
                this.board = updateBoard();
                if (this.placeShip(ship.length, ship.location[0]+1, ship.location[1], ship.isRotated)) {
                } else {
                    this.placeShip(ship.length, ship.location[0], ship.location[1], ship.isRotated);
                }
                break
            case 2:
                this.ships.splice(index, 1);
                this.board = updateBoard();
                if (this.placeShip(ship.length, ship.location[0], ship.location[1]+1, ship.isRotated)) {
                } else {
                    this.placeShip(ship.length, ship.location[0], ship.location[1], ship.isRotated)
                }
                break
            case 3:
                this.ships.splice(index, 1);
                this.board = updateBoard();
                if (this.placeShip(ship.length, ship.location[0]-1, ship.location[1], ship.isRotated)) {
                } else {
                    this.placeShip(ship.length, ship.location[0], ship.location[1], ship.isRotated);
                }
                break
            case 4:
                this.ships.splice(index, 1);
                this.board = updateBoard();

                if (this.placeShip(ship.length, ship.location[0], ship.location[1], !ship.isRotated)) {
                } else {
                    this.placeShip(ship.length, ship.location[0], ship.location[1], ship.isRotated);
                }
                break
            default:
                alert("ERROR: DIRECTION IS INVALID");
        }
    }

    const select = function(index) {
        this.ships.push(this.ships.splice(index, 1)[0]);
    }
    
    return { ships, placeShip, attack, hit, missed, board, moveShip, select }

    }


export { gameboardFactory }