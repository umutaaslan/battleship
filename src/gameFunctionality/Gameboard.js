export default class Gameboard {
	constructor() {
		this.grid = Array.from({ length: 10 }, () =>
			Array.from({ length: 10 }, () => null)
		);

		// for(let i = 0; i < 10; i++){
		//     this.grid[i] = [];
		//     for(let j = 0; j < 10; j++){
		//         this.grid[i].push(null);
		//     }
		// }
	}

	placeShip(ship, x, y, axis) {
		if (this.isShipPlaceable(ship, x, y, axis)) {
			if (axis === "x") {
				for (let i = x; i < x + ship.length; i++) {
					if (Array.isArray(this.grid[i]) && this.grid[i][y] === null) {
						this.grid[i][y] = ship.name;
					}
				}
			}

			return true;
		}

		return false;
	}

	isShipPlaceable(ship, x, y, axis) {
		if (x >= 0 && x < 10 && y >= 0 && y < 10) {
			if (axis === "x") {
				for (let i = x; i < x + ship.length; i++) {
					if (!Array.isArray(this.grid[i]) || this.grid[i][y] !== null) {
						return false;
					}
				}
				return true;
			}
		} else {
			return false;
		}
	}
}
