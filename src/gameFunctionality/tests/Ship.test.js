import Ship from "../Ship";

test("ship's name is true", () => {
	const ship = new Ship("destroyer", 5);
	expect(ship.name).toBe("destroyer");
});

test("hit the ship properly", () => {
	const ship = new Ship("destroyer", 5);
	ship.hit();
	ship.hit();
	const hitTimes = ship.hit();
	expect(hitTimes).toBe(3);
});

test("check whether ship is sunk", () => {
	const ship = new Ship("destroyer", 5);
	ship.hit();
	ship.hit();
	ship.hit();
	expect(ship.isSunk()).toBe(false);
	ship.hit();
	expect(ship.isSunk()).toBe(false);
	ship.hit();
	expect(ship.isSunk()).toBe(true);
});
