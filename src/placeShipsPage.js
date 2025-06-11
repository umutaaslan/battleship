import DOM from "./DOM";
import Gameboard from "./gameFunctionality/Gameboard";
import Ship from "./gameFunctionality/Ship";
import shipsInfo from "./shipsInfo";

export default function placeShipsPage() {
	const userGameboard = new Gameboard();

	userGameboard.grid.forEach((x, xIndex) => {
		x.forEach((y, yIndex) => {
			const cell = document.createElement("div");
			cell.setAttribute("data-position-x", xIndex);
			cell.setAttribute("data-position-y", yIndex);
			DOM.userGameboard.appendChild(cell);
		});
	});

    // guess you shouldn't do this, it is against the dataTransfer rules. Search a better way to do it.
    let currentShipId;

	function dragstartHandler(e) {
		e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.dropEffect = "move";
        currentShipId = e.target.id;
	}

	window.addEventListener("DOMContentLoaded", () => {
		DOM.ships.forEach((ship) => {
			ship.addEventListener("dragstart", dragstartHandler);
		});

		// DOM.userGameboard.addEventListener("dragenter", (e) => {
        //     e.preventDefault();
        // });


		DOM.userGameboard.addEventListener("dragover", (e) => {
			const id = e.dataTransfer;
			e.preventDefault();
			console.log(id);
            const x = Number(e.target.getAttribute("data-position-x"));
            const y = Number(e.target.getAttribute("data-position-y"));

            const shipInfo = shipsInfo[id];
            const ship = new Ship();
            // console.log(userGameboard.isShipPlaceable(x, y));
		});

		DOM.userGameboard.addEventListener("drop", (e) => {
			e.preventDefault();
			const id = e.dataTransfer.getData("text/plain");
			console.log(id);
            const x = Number(e.target.getAttribute("data-position-x"));
            const y = Number(e.target.getAttribute("data-position-y"));
            const ship = document.getElementById(id);
            console.log(ship.getAttribute("data-width"))
            
            //place ship with x and y like grid[x][y] 
            //update the logic and re render your gameboard
            

		});
	});
}
