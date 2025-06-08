function domFunc() {
	const playButton = document.querySelector("#play-button");
	const landingPage = document.querySelector("#landingPage");
	const preGamePage = document.querySelector("#preGamePage");
	const preGameText = document.querySelector("#preGamePage > h1");
	const userNameInput = document.querySelector("#name-input");

	return { playButton, landingPage, preGamePage, preGameText, userNameInput };
}

const DOM = domFunc();

export default DOM;
