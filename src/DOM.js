function domFunc() {
	const playButton = document.querySelector("#play-button");
	const landingPage = document.querySelector("#landingPage");
	const preGamePage = document.querySelector("#preGamePage");
	const gamePage = document.querySelector("#gamePage");
	const preGameText = document.querySelector("#preGamePage > h1");
	const userNameInput = document.querySelector("#name-input");
	const userGameboard = document.querySelector(".userGameboard");
	const userGameboardMain = document.querySelector(".userGameboardMain");
	const computerGameboardMain = document.querySelector(
		".computerGameboardMain"
	);
	const ships = document.querySelectorAll(".ships > img[src$='.svg']");
	const placeShipsText = document.querySelector("h1#placeYourShipsText");
	const gamePlace = document.querySelector(".gamePlace");
	const mainGame = document.querySelector(".mainGame");
	const wonPage = document.querySelector(".wonPage");

	return {
		playButton,
		landingPage,
		preGamePage,
		preGameText,
		userNameInput,
		gamePage,
		userGameboard,
		userGameboardMain,
		computerGameboardMain,
		ships,
		placeShipsText,
		gamePlace,
		mainGame,
		wonPage,
	};
}

const DOM = domFunc();

export default DOM;
