import Ship from "./gameFunctionality/Ship";

export default (gameboard) => {
	const randomX = (length) => Math.floor(Math.random() * (10 - length));
	const randomY = () => Math.floor(Math.random() * 10);
	const carrier = new Ship("carrier", 5);
	const battleship = new Ship("battleship", 4);
	const cruiser = new Ship("cruiser", 3);
	const submarine = new Ship("submarine", 3);
	const destroyer = new Ship("destroyer", 2);

	let isSuccess = false;
	while (!isSuccess) {
		isSuccess = gameboard.placeShip(carrier, randomX(5), randomY());
	}
	isSuccess = false;
	while (!isSuccess) {
		isSuccess = gameboard.placeShip(battleship, randomX(4), randomY());
	}
	isSuccess = false;
	while (!isSuccess) {
		isSuccess = gameboard.placeShip(cruiser, randomX(3), randomY());
	}
	isSuccess = false;
	while (!isSuccess) {
		isSuccess = gameboard.placeShip(submarine, randomX(3), randomY());
	}
	isSuccess = false;
	while (!isSuccess) {
		isSuccess = gameboard.placeShip(destroyer, randomX(2), randomY());
	}
};
