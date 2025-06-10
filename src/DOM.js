function domFunc() {
	const playButton = document.querySelector("#play-button");
	const landingPage = document.querySelector("#landingPage");
	const preGamePage = document.querySelector("#preGamePage");
    const gamePage = document.querySelector("#gamePage");
	const preGameText = document.querySelector("#preGamePage > h1");
	const userNameInput = document.querySelector("#name-input");
	const userGameboard = document.querySelector(".userGameboard");
	const ships = document.querySelectorAll(".ships > img[src$='.svg']");

	return { playButton, landingPage, preGamePage, preGameText, userNameInput, gamePage, userGameboard, ships };
}

const DOM = domFunc();

export default DOM;
