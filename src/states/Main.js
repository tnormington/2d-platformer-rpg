import Player from 'objects/Player';
import Hud from 'objects/Hud';
import Item from 'objects/Item';


class Main extends Phaser.State {

	create() {

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 600;
		this.game.stage.backgroundColor = '#111';

		this.keyboard = this.game.input.keyboard;
		this.cursors = this.keyboard.createCursorKeys();

		this.map = this.game.add.tilemap('tilemap');
		this.map.addTilesetImage('tiles_spritesheet', 'tiles');
		this.groundLayer = this.map.createLayer('groundLayer');
		this.map.setCollisionBetween(1, 1000, true, this.groundLayer);

		this.groundLayer.resizeWorld();

		this.collectibles = this.game.add.group();
		this.collectibles.enableBody = true;


		this.player = new Player({
			game: this.game,
			x: 15,
			y: 30,
			asset: 'player',
			frame: 1
		});

		this.game.camera.follow(this.player);

		this.hud = new Hud({
            game: this.game,
            player: this.player
        });

		this.crystalSword = new Item({
			game: this.game,
			x: this.game.world.width/6,
			y: 20,
			key: 'crystal_sword',
			frame: 1,
			name: 'Crystal Sword'
		});
		
		// console.log(this.game.world.width/4);

		this.scroll = new Item({
			game: this.game,
			x: this.game.world.width/4,
			y: 20,
			key: 'scroll',
			frame: 1,
			name: 'Scroll'
		});

		this.collectibles.add(this.crystalSword);
		this.collectibles.add(this.scroll);
		
		this.game.stage.addChild(this.player);

		// this.game.physics.arcade.collide(this.player, this.collectibles);
		


		this.game.debug.body(this.collectibles);
		// this.game.stage.addChild(this.crystalSword);
		// this.crystal_sword = this.game.add.sprite(200, 20, 'crystal_sword');
		// this.game.physics.arcade.enable(this.crystal_sword);
	}

	collectItem(player, item) {
		console.log(item);
		player.collectItem(item);
		this.hud.updateInventory(this.game, player, item);
	}



	update() {

		// When player and collectibles overlap, collect item
		this.game.physics.arcade.overlap(this.player, this.collectibles, this.collectItem, null, this);

		// this.player.body.collides(this, this.collectItem, )

		this.game.physics.arcade.collide(this.groundLayer, this.player);
		// this.game.physics.arcade.TILE_BIAS = 40;
		// this.game.physics.arcade.collide(this.collectibles, this.groundLayer);


		// Slow fade player horizontal speed
		this.player.body.velocity.x = this.player.body.velocity.x/1.25;
		let shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);



			if (this.cursors.left.isDown)
			{
				this.player.scale.x = -Math.abs(this.player.scale.x);
				if(shiftKey.isDown) {
					this.player.body.velocity.x = -250;
					if(this.player.body.velocity.y > 1) {
						this.player.animations.play('fall');
					} else {
						this.player.animations.play('run');
					}
				} 
				else {
					this.player.body.velocity.x = -150;
					if(this.player.body.velocity.y > 1) {
						this.player.animations.play('fall');
					} else {
						this.player.animations.play('walk');
					}
				}
			}
			else if (this.cursors.right.isDown)
			{
				this.player.scale.x = Math.abs(this.player.scale.x);
				if(shiftKey.isDown) {
					this.player.body.velocity.x = 250;
					if(this.player.body.velocity.y > 1) {
						this.player.animations.play('fall');
					} else {
						this.player.animations.play('run');
					}
				}
				else {
					this.player.body.velocity.x = 150;
					if(this.player.body.velocity.y > 1) {
						this.player.animations.play('fall');
					} else {
						this.player.animations.play('walk');
					}
				}
			} else if(this.player.body.velocity.y > 1) {
				this.player.animations.play('fall');
			} else {
				//  Stand still
				this.player.animations.play('stance');
			}

		// if (this.cursors.left.isDown)
		// {
		// 	this.player.scale.x = -1;
		// 	if(shiftKey.isDown) {
		// 		this.player.body.velocity.x = -250;
		// 		this.player.animations.play('run');
		// 	} else {
		// 		this.player.body.velocity.x = -150;
		// 		this.player.animations.play('walk');
		// 	}
		// }
		// else if (this.cursors.right.isDown)
		// {
		// 	this.player.scale.x = 1;
		// 	if(shiftKey.isDown) {
		// 		this.player.body.velocity.x = 250;
		// 		this.player.animations.play('run');
		// 	} else {
		// 		this.player.body.velocity.x = 150;
		// 		this.player.animations.play('walk');
		// 	}
		// }
		// else
		// {
		// 	if(this.player.body.velocity.y < 1) {
		// 		//  Stand still
		// 		this.player.animations.play('stance');
		// 	} else {
		// 		// Fall animation
		// 		this.player.animations.play('fall');
		// 	}
		// }

		// console.log(this.player.body.velocity.y);
		//  Allow the this.player to jump if they are touching the ground.
		if (this.cursors.up.isDown)
		{	
			this.player.animations.play('jump');
			this.player.body.velocity.y = -300;
		}
		
	}

}

export default Main;
