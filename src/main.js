import "./style.css";
import DOM from "./DOM.js";
import preGame from "./preGame.js";
import placeShipsPage from "./placeShipsPage.js";


export let userName;

DOM.playButton.addEventListener("click", () => {
    DOM.playButton.disabled = true;
    DOM.playButton.innerText = "Loading..."
    userName = DOM.userNameInput.value;
    preGame().then(() => placeShipsPage());
})

placeShipsPage();