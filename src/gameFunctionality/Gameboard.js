export default class Gameboard {
	constructor() {
		this.grid = Array.from({ length: 10 }, () =>
			Array.from({ length: 10 }, () => null)
		);

		this.log = [];

		this.placeLog = [];

		// for(let i = 0; i < 9; i++){
		//     this.grid[i] = [];
		//     for(let j = 0; j < 10; j++){
		//         this.grid[i].push(null);
		//     }
		// }
	}

	placeShip(ship, x, y) {
		if (this.isShipPlaceable(ship.length, x, y)) {
			let coords = [];
			for (let i = x; i < x + ship.length; i++) {
				this.grid[i][y] = ship;
				coords.push([i, y]);
			}
			this.placeLog.push({
				name: ship.name,
				length: ship.length,
				coord: coords,
			});
			return true;
		}
		return false;
	}

	isShipPlaceable(length, x, y) {
		if (x >= 0 && x < 10 && y >= 0 && y < 10) {
			for (let i = x; i < x + length; i++) {
				if (!Array.isArray(this.grid[i]) || this.grid[i][y] !== null) {
					return false;
				}
			}
			return true;
		}
	}

	receiveAttack(x, y) {
		const hit = this.grid[x][y];
		let didHitShip;
		if (hit != null && hit !== "hit") {
			hit.hit();
			didHitShip = true;
		}
		this.grid[x][y] = "hit";

		if (hit === "hit") didHitShip = "hit";
		else if (hit === null) didHitShip = false;

		const result = { coord: [Number(x), Number(y)], hitShip: didHitShip, ship: hit };
		this.log.unshift(result);
		return result;
	}

	allShipsSunk() {
		const hitLogsFiltered = this.log.filter((log) => {
			return log.hitShip;
		});
		const hitLogs = hitLogsFiltered.map((log) => {
			return log.coord;
		});


		for (const placedShip of this.placeLog) {
			for (const pLog of placedShip.coord) {
				if (
					!hitLogs.some((coord) => coord[0] === pLog[0] && coord[1] === pLog[1])
				) {
					return false;
				}
			}
		}
		return true;
	}
}
