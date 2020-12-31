import { gameboardFactory } from './gameboard'

test('ship addition and board update logic', () => {
    const gb = gameboardFactory();
    gb.placeShip(3, 0, 0, false);
    expect(gb.board[0][0]).toBe(3);

    expect(gb.placeShip(2, 0, 0, false)).toBe(false);
    expect(gb.placeShip(3, 1, 1, false)).toBe(true);
    expect(gb.board[1][1]).toBe(3);

    expect(gb.placeShip(5, 5, 0, false)).toBe(true);
    expect(gb.placeShip(5, 6, 0, false)).toBe(false);

})

test('an entire ship being destroyed', () => {
    const gb = gameboardFactory();
    gb.placeShip(3, 0, 0, false)

    gb.attack(3, 3);
    expect(gb.missed.length).toBe(1);

    gb.attack(0, 0);
    expect(gb.hit.length).toBe(1);
    expect(gb.missed.length).toBe(1);

    gb.attack(1, 0);
    expect(gb.hit.length).toBe(2);
    expect(gb.missed.length).toBe(1);

    gb.attack(2, 0);
    expect(gb.hit.length).toBe(3);
    expect(gb.missed.length).toBe(1);
    expect(gb.ships.length).toBe(0);
})

test('rotated ship addition', () => {
    const gb = gameboardFactory();
    expect(gb.placeShip(3, 0, 0, true)).toBe(true);
    expect(gb.board[1][0]).toBe(3); //remember, this correspnds to (0, 1) but the board coords are flipped

    expect(gb.placeShip(3, 9, 0, true)).toBe(true);
    expect(gb.placeShip(3, 0, 9, true)).toBe(false)
})

test('move ship', () => {
    const gb = gameboardFactory();
    expect(gb.placeShip(3, 0, 0, false)).toBe(true);
    
    gb.moveShip(2); //moves down
    expect(gb.board[0][0]).toBe(0);
    expect(gb.board[1][0]).toBe(3);

    gb.moveShip(1); //moves right
    expect(gb.board[1][0]).toBe(0);
    expect(gb.board[1][1]).toBe(3);

    expect(gb.placeShip(3, 0, 7, true)).toBe(true);
    gb.select(1)
    gb.moveShip(2);
    expect(gb.board[7][1]).toBe(0);
    expect(gb.board[8][0]).toBe(3);

    gb.moveShip(4);
    expect(gb.board[7][1]).toBe(3);
    expect(gb.board[8][0]).toBe(0);
    
})

test('repeated attacks', () => {
    const gb = gameboardFactory();
    gb.placeShip(3, 0, 0, false)

    expect(gb.attack(0,0)).toBe(true);
    expect(gb.attack(0,0)).toBe(false);

    expect(gb.attack(1,0)).toBe(true);
    expect(gb.attack(2,0)).toBe(true);

    expect(gb.ships.length).toBe(0);

    expect(gb.attack(2,0)).toBe(false);

})