import DOM from "./DOM.js";
import { userName } from "./main.js";

export default function preGame() {
	const typeSound = new Audio("/typewriter-sound.mp3");

	const text = `All right, admiral ${userName}.`;
	const chars = text.split("");
	typeSound.play();

	const typeInterval = setInterval(() => {
		const letter = chars.shift();
		DOM.preGameText.textContent += letter;
		if (chars.length <= 0) {
			typeSound.pause();
			clearInterval(typeInterval);
		}
	}, 0.15 * 1000);

	setTimeout(() => {}, 5 * 1000);

	// const clearTextInterval = setInterval(() => {
	// 		const textContent = DOM.preGameText.textContent;
	// 		console.log(textContent);
	// 		const newContent = textContent.slice(0, textContent.length - 1);
	// 		console.log(newContent);
	// 		DOM.preGameText.textContent += newContent;

	// 		if (textContent.length <= 0) {
	// 			typeSound.pause();
	// 			clearInterval(clearTextInterval);
	// 		}
	// 	}, 0.1 * 1000);

	function fadeIn() {
		DOM.landingPage.style = "display: none";
		DOM.preGamePage.style = "opacity: 0";
		DOM.preGamePage.style = "display: block";

		let timeStart;

		function step(timestamp) {
			if (timeStart === undefined) {
				timeStart = timestamp;
			}
			const elapsed = timestamp - timeStart;

			const opacity = Math.min(elapsed * 0.002, 1);
			DOM.preGamePage.style = `opacity: ${opacity};`;

			if (opacity < 1) window.requestAnimationFrame(step);
		}

		window.requestAnimationFrame(step);
	}

    
}
