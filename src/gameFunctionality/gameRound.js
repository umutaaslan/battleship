import shipSunk from "../shipSunk";

export default function (player1, player2, x, y) {
	const randomXandY = () => {
		let isDifferentCoord;
		let cX;
		let cY;
		do {
			cX = Math.floor(Math.random() * 10);
			cY = Math.floor(Math.random() * 10);
			isDifferentCoord = player1.gameboard.log.every(
				(item) => item.coord[0] !== cX || item.coord[1] !== cY
			);
		} while (!isDifferentCoord);
		return [cX, cY];
	};

	if (!(player1.turn || player2.turn)) {
		player1.turn = true;
	}

	let attack;
	let div;
	if (player1.turn) {
		attack = player2.gameboard.receiveAttack(x, y);
		div = document.querySelector(
			`.mainGame .computerGameboardMain div[data-position-x='${x}'][data-position-y='${y}']`
		);
		if (player2.gameboard.allShipsSunk()) {
			return true;
		}
		if (attack.hitShip && attack.ship.isSunk()) {
			shipSunk(player1, attack.ship);
		}
		player1.turn = false;
		player2.turn = true;
	} else if (player2.turn) {
		let isDifferentCoord;
		let compX;
		let compY;

		[compX, compY] = randomXandY();

		//This logic might be more efficient if computer checks adjacent cells to see if they are hit before.

		if (player1.gameboard.log.length > 0 && player1.gameboard.log[0].hitShip) {
			console.log("inside");
			let num = Math.floor(Math.random() * 2) + 1;
			let estimatedX = Math.min(9, player1.gameboard.log[0].coord[0] + num);
			let isDC = (isDifferentCoord = player1.gameboard.log.every(
				(item) =>
					item.coord[0] !== estimatedX ||
					item.coord[1] !== player1.gameboard.log[0].coord[1]
			));

			if (isDC) {
				compX = estimatedX;
				compY = player1.gameboard.log[0].coord[1];
				console.log(estimatedX);
			} else {
				num = Math.floor(Math.random() * 2) + 1;
				estimatedX = Math.min(9, player1.gameboard.log[0].coord[0] - num);
				isDC = isDifferentCoord = player1.gameboard.log.every(
					(item) =>
						item.coord[0] !== estimatedX ||
						item.coord[1] !== player1.gameboard.log[0].coord[1]
				);
				if (isDC) {
					compX = estimatedX;
					compY = player1.gameboard.log[0].coord[1];
					console.log(estimatedX);
				}
			}
		}

		//fallback
		if (compX < 0 || compX > 9) {
			[compX, compY] = randomXandY();
		}

		attack = player1.gameboard.receiveAttack(compX, compY);

		div = document.querySelector(
			`.mainGame .userGameboardMain div[data-position-x='${compX}'][data-position-y='${compY}']`
		);

		if (player1.gameboard.allShipsSunk()) {
			return true;
		}

		if (attack.hitShip && attack.ship && attack.ship.isSunk()) {
			shipSunk(player2, attack.ship);
		}
		player1.turn = true;
		player2.turn = false;
	}

	if (!attack.hitShip) {
		div.classList.add("hit");
		div.classList.add("hit-water");
	} else if (attack.hitShip) {
		div.classList.add("hit");
	}
	div.style.pointerEvents = "none";
}
