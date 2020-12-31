const shipFactory = (len, x, y, isRot) => {
    let location = [x, y];
    let isRotated = isRot; //false => horizontal
    let length = len;
    let health = new Array(len); 
    for (let i = 0; i < len; i++) health[i] = 0;
    let occupied = new Array(len);

    const updateOccupied = (x, y) => {
        if (isRotated) {
            //vertical
            for (let i = 0; i < len; i++) {
                occupied[i] = [x , y + i]
            }
        } else {
            //horizontal
            for (let i = 0; i < len; i++) {
                occupied[i] = [x + i, y]
            }
        }
    }
    updateOccupied(location[0], location[1]);

    const checkSunk = () => {
        for (let i = 0; i < len; i++) {
            if (health[i] === 0) return false;
        }
        return true;
    }

    //note: no duplicate protection here
    //takes in a coordinate pair, updates health of ship, returns if it is hit or not
    const hit = (a, b) => {
        for (let i = 0; i < len; i++) {
            if (occupied[i][0] === a && occupied[i][1] === b /* there should be a better way to do 
              this with like includes or something */) {
                health[a + b - location[0] - location[1]] = 1;
                //IDK if this is how I want to check if sunk
                return true;
            }
        }
        return false;
    } 

    const updateLocation = function(x, y) {
        //note: this does NOT do any sort of checking
        this.location = [x, y];
        updateOccupied(x, y);
    }

    const rotate = function() {
        this.isRotated = !this.isRotated;
    }

    return { location, health, occupied, hit, checkSunk, updateLocation, rotate, length, isRotated }
}

export { shipFactory }