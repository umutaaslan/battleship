import Gameboard from "../Gameboard";
import Ship from "../Ship";

test("gameboard is 10x10", () => {
	const gameboard = new Gameboard();
	const grid = gameboard.grid;
	expect(grid.length).toBe(10);
	grid.forEach((el) => {
		expect(el.length).toBe(10);
	});
});

test("isShipPlaceable works", () => {
	const gameboard = new Gameboard();
	expect(gameboard.isShipPlaceable(5, 7, 1)).toBe(
		false
	);
	expect(gameboard.isShipPlaceable(5, 7, 0)).toBe(
		false
	);
	expect(gameboard.isShipPlaceable(5, 5, 0)).toBe(true);
});

test("places ships on x axis properly", () => {
	const gameboard = new Gameboard();
	const ship1 = new Ship("ship1", 5);
	expect(gameboard.placeShip(ship1, 2, 1)).toBe(true);
	expect(gameboard.grid[2][1]).toBe(ship1);
	expect(gameboard.grid[3][1]).toBe(ship1);
	expect(gameboard.grid[4][1]).toBe(ship1);
	expect(gameboard.grid[5][1]).toBe(ship1);
	expect(gameboard.grid[6][1]).toBe(ship1);
});


test("throw error when ship is off grid", () => {
	const gameboard = new Gameboard();

	expect(gameboard.placeShip(new Ship("ship1", 5), 12, 0)).toBe(false);
	expect(gameboard.placeShip(new Ship("ship1", 5), 4, -2)).toBe(false);
	expect(gameboard.placeShip(new Ship("ship1", 5), 4, 14)).toBe(false);
	expect(gameboard.placeShip(new Ship("ship1", 5), 7, 1)).toBe(false);
	gameboard.placeShip(new Ship("ship1", 5), 7, 1);
	expect(gameboard.grid[7][1]).toBe(null);
	expect(gameboard.grid[8][1]).toBe(null);
	expect(gameboard.grid[9][1]).toBe(null);
});

test("receive attack", () => {
	const gameboard = new Gameboard();
	const ship1 = new Ship("ship1", 5);

	gameboard.placeShip(ship1, 5, 0);
	gameboard.receiveAttack(1, 1);
	gameboard.receiveAttack(5, 0);

	expect(ship1.hitTimes).toBe(1);
	expect(gameboard.log).toEqual([
		{ coord: [5, 0], hitShip: ship1 },
		{ coord: [1, 1], hitShip: null },
	]);
});

test("allShipsSunk works", () => {
	const gameboard = new Gameboard();
	const ship1 = new Ship("ship1", 3);

	gameboard.placeShip(ship1, 5, 0);

	gameboard.receiveAttack(1, 1);
	gameboard.receiveAttack(5, 0);
	gameboard.receiveAttack(6, 0);
	expect(gameboard.allShipsSunk()).toBe(false);
	gameboard.receiveAttack(7, 0);
	expect(gameboard.allShipsSunk()).toBe(true);
});

