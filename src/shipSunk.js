import DOM from "./DOM"

export default function shipSunk (player, ship) {
    if(player.name === "user"){
        DOM.infoText.innerText = `YOU DESTROYED THEIR ${ship.name}, admiral.`;
    }
    else{
        DOM.infoText.innerText = `THEY DESTROYED OUR ${ship.name}! THAT'S NO GOOD...`;
    }
}