import DOM from "./DOM";
import Gameboard from "./gameFunctionality/Gameboard";
import placeShipsRandomly from "./placeShipsRandomly";
import Player from "./gameFunctionality/Player";
import gameRound from "./gameFunctionality/gameRound";
import wonPage from "./wonPage";

export default function initializeGame(userGameboard) {
	DOM.placeShipsText.style.display = "none";
	DOM.gamePlace.style.display = "none";
	DOM.mainGame.style.display = "flex";

	const computerGameboard = new Gameboard();

	placeShipsRandomly(computerGameboard);

	const user = new Player(userGameboard);

	const computer = new Player(computerGameboard);

	

	function handleShot(e, gameboard) {
		const x = e.target.getAttribute("data-position-x");
		const y = e.target.getAttribute("data-position-y");

		//calling two times because we are playing against computer and want to make it the next move

		//user's hit
		const usersRound = gameRound(user, computer, x, y);

		//computer's hit (time out here)
		const computersRound = gameRound(user, computer, x, y);

		if (usersRound) {
			wonPage("user");
		} else if (computersRound) {
			wonPage("computer");
		}
	}

	userGameboard.grid.forEach((x, xIndex) => {
		x.forEach((el, yIndex) => {
			const cell = document.createElement("div");
			cell.setAttribute("data-position-x", xIndex);
			cell.setAttribute("data-position-y", yIndex);
			if (el) {
				//there is a ship
				cell.innerText = el.name;
			}
			DOM.userGameboardMain.appendChild(cell);
		});
	});

	computerGameboard.grid.forEach((x, xIndex) => {
		x.forEach((el, yIndex) => {
			const cell = document.createElement("div");
			cell.setAttribute("data-position-x", xIndex);
			cell.setAttribute("data-position-y", yIndex);
			if (el) {
				//there is a ship
				cell.innerText = el.name;
			}
			cell.addEventListener("click", (e) => handleShot(e, computerGameboard));
			DOM.computerGameboardMain.appendChild(cell);
		});
	});
}
