import "./style.css";
import DOM from "./DOM";
import preGame from "./preGame";
import placeShipsPage from "./placeShipsPage";


export let userName;

DOM.playButton.addEventListener("click", () => {
    DOM.playButton.disabled = true;
    DOM.playButton.innerText = "Loading..."
    userName = DOM.userNameInput.value;
    preGame().then(() => placeShipsPage());
})

placeShipsPage();