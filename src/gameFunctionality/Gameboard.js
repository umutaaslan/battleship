export default class Gameboard{
    constructor(){
        this.grid = Array.from({length:10}, () => Array.from({length: 10}, () => null));
        // for(let i = 0; i < 10; i++){
        //     this.grid[i] = [];
        //     for(let j = 0; j < 10; j++){
        //         this.grid[i].push(null);
        //     }
        // }
    }
    
    placeShip(ship, x, y, axis){

    }
}

console.log((new Gameboard()).grid)