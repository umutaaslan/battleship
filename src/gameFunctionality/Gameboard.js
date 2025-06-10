export default class Gameboard {
	constructor() {
		this.grid = Array.from({ length: 10 }, () =>
			Array.from({ length: 10 }, () => null)
		);

		this.log = [];

		this.placeLog = [];

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
					this.grid[i][y] = ship;
					this.placeLog.unshift([i, y]);
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

	receiveAttack(x, y) {
		const hit = this.grid[x][y];
		if (hit != null) {
			hit.hit();
		}
		const result = { coord: [x, y], hitShip: hit };
		this.log.unshift(result);
		return result;
	}

	allShipsSunk() {
		const hitLogs = this.log
			.filter((log) => log.hitShip)
			.map((log) => log.coord);

		for (const pLog of this.placeLog) {
			if (
				!hitLogs.some((coord) => coord[0] === pLog[0] && coord[1] === pLog[1])
			)
				return false;
		}
		return true;
	}
}
