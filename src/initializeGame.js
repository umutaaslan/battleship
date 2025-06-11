import DOM from "./DOM"
import Gameboard from "./gameFunctionality/Gameboard";
import placeShipsRandomly from "./placeShipsRandomly";
export default function initializeGame(userGameboard){
    DOM.placeShipsText.style.display = "none"
    DOM.gamePlace.style.display = "none";
    DOM.mainGame.style.display = "flex";



    function handleShot(e, gameboard){
        const x = e.target.getAttribute("data-position-x")
        const y = e.target.getAttribute("data-position-y");

        
        const attack = gameboard.receiveAttack(x, y)
        
        console.log(gameboard.log)
        

    }

    userGameboard.grid.forEach((x, xIndex) => {
		x.forEach((el, yIndex) => {
			const cell = document.createElement("div");
			cell.setAttribute("data-position-x", xIndex);
			cell.setAttribute("data-position-y", yIndex);
            if(el){
                //there is a ship
                cell.innerText = el.name;
            }
			DOM.userGameboardMain.appendChild(cell);
		});
	});

    const computerGameboard = new Gameboard();

    placeShipsRandomly(computerGameboard);

    computerGameboard.grid.forEach((x, xIndex) => {
		x.forEach((el, yIndex) => {
			const cell = document.createElement("div");
			cell.setAttribute("data-position-x", xIndex);
			cell.setAttribute("data-position-y", yIndex);
            if(el){
                //there is a ship
                cell.innerText = el.name;
            }
            cell.addEventListener("click", (e) => handleShot(e, computerGameboard));
			DOM.computerGameboardMain.appendChild(cell);
		});
	});


}