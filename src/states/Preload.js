class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */

		this.game.load.tilemap('tilemap', 'assets/2d_platformer_v2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', 'assets/tiles_spritesheet.png');

		this.game.load.spritesheet('player', 'assets/platformer_sprites_pixel.png', 64, 64);

		this.game.load.image('crystal_sword', 'assets/items/2.png');
		this.game.load.image('scroll', 'assets/items/9.png');
		this.game.load.image('crystal_blue', 'assets/items/11.png');
		//this.game.load.audio('myAudio', 'assets/my-audio.wav');
		//this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
	}

	create() {
		//NOTE: Change to GameTitle if required

		this.game.state.start("Main");
	}

}

export default Preload;
