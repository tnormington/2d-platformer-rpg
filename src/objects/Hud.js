class Hud extends Phaser.Group {
    constructor({game, player}) {
        super(game);

        this.game = game;

        this.player = player;
        this.width = 600;

        this.health = this.player.health;
        this.healthLabel = 'Health: ';
        this.healthText = new Phaser.Text(this.game, 20, 14, this.healthLabel + this.health, {
            font: '16px Verdana',
            fill: 'white',
            align: 'left'
        });

        this.inventory = this.game.add.group();
        this.inventory.x = 20;
        this.inventory.y = 20;
        this.inventory.inputEnableChildren = true;

        this.inventory.onChildInputOver.add(this.mouseOverInventoryItem, this);
        this.inventory.onChildInputOut.add(this.mouseOutInventoryItem, this);
        this.inventory.onChildInputDown.add(this.mouseDownInventoryItem, this);

        this.add(this.inventory);


        this.equipment = this.game.add.group();
        this.equipment.x = window.innerWidth - 20;
        this.equipment.y = 20;
        this.equipment.inputEnableChildren = true;
        this.checkEquipment(this.player);

        this.add(this.equipment);
    }

    checkEquipment(player) {
        // player.equipment.removeAll();
        for(let slot in player.equipment) {
            console.log(slot);
            let newSlot;
            if(player.equipment[slot] == null) {
                newSlot = this.equipment.create(new Phaser.Rectangle(0, 0, 64, 64));
            } else {
                newSlot = player.equipment[slot];
            }
            newSlot.addChild(new Phaser.Text(this.game, -74, 28, slot, {
                font: '16px Verdana',
                fill: 'white',
                align: 'right'
            }));
        }
        // player.equipment.forEach((slot) => {
        // });
        this.equipment.align(2, -1, 250, 64, Phaser.RIGHT);
    }

    mouseDownInventoryItem(item) {
        // bring up tooltip?
        this.player.equipItem(item);
        this.checkEquipment(this.player);
    }

    mouseOverInventoryItem(item) {
        item.tint = 0x00FF00;
    }

    mouseOutInventoryItem(item) {
        item.tint = 0xffffff;
    }

    updateInventory(game, player, item) {
        let newItem = this.inventory.create(0, 0, item.key);
        newItem.addChild(new Phaser.Text(game, 74, 28, item.name, {
            font: '16px Verdana',
            fill: 'white',
            align: 'left'
        }));
        this.inventory.align(1, -1, 64, 64, Phaser.LEFT);
    }

    showEquipment() {

    }

    update() {

    }

    // updateHealth(newHealth) {
    //     this.healthText.text = this.healthLabel + newHealth;
    // }
}

export default Hud