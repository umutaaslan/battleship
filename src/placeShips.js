import DOM from "./DOM";
import Gameboard from "./gameFunctionality/Gameboard";
import Ship from "./gameFunctionality/Ship";
import shipsInfo from "./shipsInfo";
import initializeGame from "./initializeGame";

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

	let currentShipId;

	function getPlaceableDivs(length, x, y) {
		let divs = [];
		for (let i = x; i < x + length; i++) {
			divs.push(
				document.querySelector(
					`#gamePage div[data-position-x='${i}'][data-position-y='${y}']`
				)
			);
		}
		return divs;
	}

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
			const id = currentShipId;
			e.preventDefault();
			const x = Number(e.target.getAttribute("data-position-x"));
			const y = Number(e.target.getAttribute("data-position-y"));
			const length = shipsInfo[id].length;
			if (userGameboard.isShipPlaceable(length, x, y)) {
				const divs = getPlaceableDivs(length, x, y);
				divs.forEach((div) => {
					if (!div.classList.contains("allowed")) {
						div.classList.add("allowed");
					}
					if (!DOM.placeShipsText.classList.contains("allowed-text")) {
						DOM.placeShipsText.classList.add("allowed-text");
					}
				});
			} else {
				if (!DOM.placeShipsText.classList.contains("not-allowed-text")) {
					DOM.placeShipsText.classList.add("not-allowed-text");
				}
			}
		});

		document.querySelectorAll("div[data-position-x]").forEach((cell) => {
			cell.addEventListener("dragleave", () => {
				const id = currentShipId;
				const length = shipsInfo[id].length;
				const x = Number(cell.getAttribute("data-position-x"));
				const y = Number(cell.getAttribute("data-position-y"));
				const divs = getPlaceableDivs(length, x, y);
				divs.forEach((div) => {
					if (div && div.classList.contains("allowed")) {
						div.classList.remove("allowed");
					}
					if (DOM.placeShipsText.classList.contains("allowed-text")) {
						DOM.placeShipsText.classList.remove("allowed-text");
					}
				});
			});
		});

		DOM.userGameboard.addEventListener("drop", (e) => {
			e.preventDefault();

			const id = e.dataTransfer.getData("text/plain");

			const x = Number(e.target.getAttribute("data-position-x"));
			const y = Number(e.target.getAttribute("data-position-y"));
			const length = shipsInfo[id].length;

			const divs = getPlaceableDivs(length, x, y);
			divs.forEach((div) => {
				if (div && div.classList.contains("allowed")) {
					div.classList.remove("allowed");
				}
				if (DOM.placeShipsText.classList.contains("allowed-text")) {
					DOM.placeShipsText.classList.remove("allowed-text");
				}
				if (DOM.placeShipsText.classList.contains("not-allowed-text")) {
					DOM.placeShipsText.classList.remove("not-allowed-text");
				}
			});

			if (userGameboard.isShipPlaceable(length, x, y)) {
				const ship = new Ship(shipsInfo[id].name, length);
				userGameboard.placeShip(ship, x, y);
				const w = 48 * length;
				divs[0].style = `grid-column: ${x + 1} / span ${length}; grid-row: ${
					y + 1
				} / ${y + 2}`;
				const shipEl = document.getElementById(id);
				shipEl.style.height = "44px";
				shipEl.style.width = `${w}px`;
				shipEl.style.pointerEvents = "none";
				divs[0].appendChild(shipEl);

				for (let i = 1; i < divs.length; i++) {
					divs[i].remove();
				}
			}

			if (userGameboard.placeLog.length === 5) {
				DOM.placeShipsText.innerText = "START!";
				setTimeout(() => initializeGame(userGameboard), 2 * 1000);
			}
		});
	});
}
