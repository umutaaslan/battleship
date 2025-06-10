import DOM from "./DOM";
import Gameboard from "./gameFunctionality/Gameboard";

export default function placeShipsPage() {
	const userGameboard = new Gameboard();
	userGameboard.grid.forEach((x) => {
		const cell = document.createElement("div");
		cell.classList.add("main");
		DOM.userGameboard.appendChild(cell);
		x.forEach(() => {
            const newCell = document.createElement("div");
		    DOM.userGameboard.appendChild(newCell);

            
        });
	});
}
