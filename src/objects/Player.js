class Player extends Phaser.Sprite {

	constructor({game, x, y, asset, frame}){
		//Do something
		super(game, x, y, asset, frame);
		this.game = game;
		this.lastPos = {x, y};
		this.scale.x = 1.5;
		this.scale.y = 1.5;
		this.game.physics.arcade.enable(this);
		this.animations.add('walk', this.frameGenerator(32, 8), 10, true);
		this.animations.add('stance', this.frameGenerator(0, 4), 6, true);
		this.animations.add('run', this.frameGenerator(4, 8), 10, true);
		this.animations.add('jump', this.frameGenerator(42, 6), 10, true);
		this.animations.add('fall', this.frameGenerator(45, 3), 4, true);
		this.anchor.setTo(.5, 1);
		this.animations.play('stance');
		this.body.collideWorldBounds = true;
		this.body.bounce.y = 0.1;
		this.health = 10;
		// this.linearDamping = 1;
		this.inventory = [];
		this.equipment = {
			head: null,
			shoulders: null,
			chest: null,
			leftHand: null,
			rightHand: null,
			waist: null,
			pants: null,
			feet: null
		};
	}

	equipItem(item) {
		this.equipment[item.slot] = item;
	}

	collectItem(item) {
		this.inventory.push(item);
		console.log('item collected: ',item);
		item.kill();
		console.log('Inventory: ',this.inventory);
	}

	// getInventory() {
	// 	let inventory = '';
	// 	this.inventory.forEach((item) => {
	// 		inventory += '\n' + item.name;

	// 	});

	// 	return inventory;
	// }


	// Returns an array of numbers 
	frameGenerator(start, length) {
		let array = [];
		let count = start;

		for(let x = 0; x < length; x++) {
			array.push(count);
			count++;
		}

		return array;
	}

	update() {

	}

}

export default Player;