class Item extends Phaser.Sprite {
    constructor({game, x, y, key, frame, name, equipSlot}) {
        super(game, x, y, key, frame, name, equipSlot);

        this.lastPos = {x, y};
        // this.x = x;
        // this.y = y;
        this.game = game;
        this.name = name;
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 500;
        this.body.bounce.y = 0.1;
        this.equipSlot = equipSlot;
        // this.game.debug.body(this);
    }
}

export default Item;