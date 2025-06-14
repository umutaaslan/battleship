import DOM from "./DOM";
import Gameboard from "./gameFunctionality/Gameboard";
import placeShipsRandomly from "./placeShipsRandomly";
import Player from "./gameFunctionality/Player";
import gameRound from "./gameFunctionality/gameRound";
import wonPage from "./wonPage";

export default function initializeGame(userGameboard) {
	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	DOM.placeShipsText.style.display = "none";
	DOM.gamePlace.style.display = "none";
	DOM.mainGame.style.display = "flex";

	const computerGameboard = new Gameboard();

	placeShipsRandomly(computerGameboard);

	const user = new Player(userGameboard, "user");

	const computer = new Player(computerGameboard, "computer");

	async function handleShot(e, gameboard) {
		DOM.computerGameboardMain.style.pointerEvents = "none";
		DOM.computerGameboardMain.style.cursor = "default";

		const x = e.target.getAttribute("data-position-x");
		const y = e.target.getAttribute("data-position-y");

		//calling two times because we are playing against computer and want to make it the next move

		//user's hit
		const usersRound = gameRound(user, computer, x, y);

		if (usersRound) {
			await wait(2000);
			wonPage("user");
		}

		//computer's hit

		await wait((Math.floor(Math.random() * 10) / 10) * 1000);
		const computersRound = gameRound(user, computer, x, y);

		if (computersRound && !usersRound) {
			await wait(2000);
			wonPage("computer");
		}

		DOM.computerGameboardMain.style.pointerEvents = "all";
		DOM.computerGameboardMain.style.cursor = "crosshair";
	}

	userGameboard.grid.forEach((x, xIndex) => {
		x.forEach((el, yIndex) => {
			const cell = document.createElement("div");
			cell.setAttribute("data-position-x", xIndex);
			cell.setAttribute("data-position-y", yIndex);
			if (el) {
				//there is a ship
				cell.style.backgroundColor = "rgb(77, 201, 77)";
			}
			DOM.userGameboardMain.appendChild(cell);
		});
	});

	computerGameboard.grid.forEach((x, xIndex) => {
		x.forEach((el, yIndex) => {
			const cell = document.createElement("div");
			cell.setAttribute("data-position-x", xIndex);
			cell.setAttribute("data-position-y", yIndex);

			cell.addEventListener("click", (e) => handleShot(e, computerGameboard));
			DOM.computerGameboardMain.appendChild(cell);
		});
	});
}
