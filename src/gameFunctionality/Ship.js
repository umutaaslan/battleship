export default class Ship {
	constructor(name, length) {
		this.name = name;
		this.length = length;
		this.hitTimes = 0;
	}

	hit() {
		return (this.hitTimes += 1);
	}

	isSunk() {
		return this.hitTimes >= this.length;
	}
}
