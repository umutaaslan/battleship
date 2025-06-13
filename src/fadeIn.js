export default function fadeIn(elOut, elIn, speed = 1) {
			elOut.style = "display: none";
			elIn.style = "opacity: 0";
			elIn.style = "display: block";

			let timeStart;

			function step(timestamp) {
				if (timeStart === undefined) {
					timeStart = timestamp;
				}
				const elapsed = timestamp - timeStart;

				const opacity = Math.min(elapsed * 0.002 * speed, 1);
				elIn.style = `opacity: ${opacity};`;

				if (opacity < 1) window.requestAnimationFrame(step);
			}

			window.requestAnimationFrame(step);
		}