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

test("places ships on x axis properly", () => {
	const gameboard = new Gameboard();
	expect(gameboard.placeShip(new Ship("ship1", 5), 2, 1, "x")).toBe(true);	
    expect(gameboard.grid[2][1]).toBe("ship1");
    expect(gameboard.grid[3][1]).toBe("ship1");
    expect(gameboard.grid[4][1]).toBe("ship1");
    expect(gameboard.grid[5][1]).toBe("ship1");
    expect(gameboard.grid[6][1]).toBe("ship1");
});

test("isShipPlaceable works", () => {
	const gameboard = new Gameboard();
	expect(gameboard.isShipPlaceable(new Ship("ship1", 5), 7, 1, "x")).toBe(false);
	expect(gameboard.isShipPlaceable(new Ship("ship1", 5), 7, 0, "x")).toBe(false);
	expect(gameboard.isShipPlaceable(new Ship("ship1", 5), 5, 0, "x")).toBe(true);
})


test("throw error when ship is off grid", () => {
	const gameboard = new Gameboard();

	expect(gameboard.placeShip(new Ship("ship1", 5), 12, 0, "x")).toBe(false);
	expect(gameboard.placeShip(new Ship("ship1", 5), 4, -2, "x")).toBe(false);
	expect(gameboard.placeShip(new Ship("ship1", 5), 4, 14, "x")).toBe(false);
	expect(gameboard.placeShip(new Ship("ship1", 5), 7, 1, "x")).toBe(false);
	gameboard.placeShip(new Ship("ship1", 5), 7, 1, "x")
	expect(gameboard.grid[7][1]).toBe(null);
	expect(gameboard.grid[8][1]).toBe(null);
	expect(gameboard.grid[9][1]).toBe(null);
});
