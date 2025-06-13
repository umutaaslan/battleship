import DOM from "./DOM";
import fadeIn from "./fadeIn";


export default function wonPage(winner) {
	fadeIn(DOM.gamePage, DOM.wonPage, 0.5);

	DOM.mainGame.style = "display: none";

	if (winner === "user") {
		DOM.wonPage.querySelector("h1").innerText = `Congratulations, admiral`;
	}
	if (winner === "computer") {
		DOM.wonPage.querySelector("h1").innerText = `You lost! shame on you admiral, we believed in you...`;
	}
}
