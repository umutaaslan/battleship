import DOM from "./DOM.js";
import { userName } from "./main.js";

export default async function preGame() {
	const typeSound = new Audio("/typewriter-sound.mp3");

	fadeIn();
	return new Promise((resolve) => {
		type(`All right, admiral ${userName}.`, typeSound).then(() =>
			setTimeout(
				() =>
					clearText(typeSound).then(() => {
						setTimeout(() => {
							type(`Let's give 'em the hell!`, typeSound).then(() => {
								setTimeout(() => {
									DOM.preGamePage.style.display = "none";
									DOM.gamePage.style.display = "flex";
                                    resolve();
								}, 2 * 1000);
							});
						}, 1 * 1000);
					}),
				1 * 1000
			)
		);
	});

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

	function type(text, audio) {
		return new Promise((resolve) => {
			const chars = text.split("");
			audio.play();

			const typeInterval = setInterval(() => {
				const letter = chars.shift();
				DOM.preGameText.textContent += letter;
				if (chars.length <= 0) {
					audio.pause();
					resolve();
					clearInterval(typeInterval);
				}
			}, 0.15 * 1000);
		});
	}

	function clearText(audio) {
		return new Promise((resolve) => {
			audio.play();
			const clearTextInterval = setInterval(() => {
				const textContent = DOM.preGameText.textContent;
				const newContent = textContent.slice(0, textContent.length - 1);
				DOM.preGameText.textContent = newContent;

				if (textContent.length <= 0) {
					audio.pause();
					resolve();
					clearInterval(clearTextInterval);
				}
			}, 0.1 * 1000);
		});
	}
}
