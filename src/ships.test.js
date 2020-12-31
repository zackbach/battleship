import { shipFactory } from './ships.js';

const ship = shipFactory(3, 0, 0, false);
test('checks health array', () => {
    expect(ship.health).toEqual([0, 0, 0]);
});


test('checks occupied', () => {
    expect(ship.occupied).toEqual([[0,0], [1,0], [2,0]])
})

test('successful hit', () => {
    expect(ship.hit(0,2)).toEqual(false);
    expect(ship.health).toEqual([0, 0, 0]);

    expect(ship.hit(1,0)).toEqual(true);
    expect(ship.health).toEqual([0, 1, 0]);
})

test('change of location', () => {
    const newShip = shipFactory(4, 1, 1, false);
    expect(newShip.location).toEqual([1,1]);
    newShip.updateLocation(2, 2);
    expect(newShip.location).toEqual([2,2]);
    expect(newShip.occupied).toEqual([[2,2], [3,2], [4,2], [5, 2]]);
})

test('rotated ships', () => {
    const newShip = shipFactory(2, 1, 1, true);
    expect(newShip.location).toEqual([1, 1]);
    expect(newShip.occupied).toEqual([[1,1], [1,2]]);
})