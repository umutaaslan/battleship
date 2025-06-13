export default function (player1, player2, x, y) {
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
		player1.turn = false;
		player2.turn = true;
	} else if (player2.turn) {
		let isDifferentCoord = true;
		let compX;
		let compY;
		do {
			compX = Math.floor(Math.random() * 10);
			compY = Math.floor(Math.random() * 10);
			isDifferentCoord = player1.gameboard.log.every(
				(item) => item.coord[0] !== compX || item.coord[1] !== compY
			);
		} while (!isDifferentCoord);
		attack = player1.gameboard.receiveAttack(compX, compY);

		div = document.querySelector(
			`.mainGame .userGameboardMain div[data-position-x='${compX}'][data-position-y='${compY}']`
		);

		if (player1.gameboard.allShipsSunk()) {
			return true;
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
