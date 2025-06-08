import "./style.css";
import DOM from "./DOM";
import preGame from "./preGame";

export let userName;

DOM.playButton.addEventListener("click", () => {
    DOM.playButton.disabled = true;
    DOM.playButton.innerText = "Loading..."
    userName = DOM.userNameInput.value;
    preGame();
})