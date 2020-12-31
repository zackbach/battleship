import { computerFactory } from './computer'
import { gameboardFactory } from './gameboard'
import { playerFactory } from './player'

test('placement ships', () => {
    const gb = gameboardFactory();
    const comp = computerFactory();

    comp.placeShips(gb);
    expect(gb.ships.length).toBe(5);

})

test('makes attacks', () => {
    const enemyGB = gameboardFactory();
    enemyGB.placeShip(3, 0, 0, false);
    const comp = computerFactory();

    comp.makeAttack(enemyGB);
    expect(enemyGB.missed.length === 1 || enemyGB.hit.length === 1).toBeTruthy();
})

test("player logic", () => {
    const player = playerFactory();
    expect(player.myTurn).toBeTruthy();
    player.swapTurns();
    expect(player.myTurn).toBeFalsy();
    player.swapTurns();
    expect(player.myTurn).toBeTruthy();
})