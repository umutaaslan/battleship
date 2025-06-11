import "./style.css";
import DOM from "./DOM.js";
import preGame from "./preGame.js";
import placeShipsPage from "./placeShips.js";
import initializeGame from "./initializeGame.js";

export let userName;

function startGameWithKey(e){
    if (e.key === "Enter") {
		startGame();
	}
}

function startGame() {
	DOM.playButton.disabled = true;
	DOM.playButton.innerText = "Loading...";
	userName = DOM.userNameInput.value;
	document.removeEventListener("keydown", startGameWithKey);
	preGame();
    
}

placeShipsPage();



DOM.playButton.addEventListener("click", startGame);

document.addEventListener("keydown", startGameWithKey);

