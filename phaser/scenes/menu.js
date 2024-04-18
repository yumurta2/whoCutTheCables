export class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }
    preload() {
    }
    create() {
        this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x2c3e50).setOrigin(0);
        // Create interactive buttons
        this.newGameButton = this.add.text(250, 50, 'New Game', { fill: '#ffffff', fontSize: '24px' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('chapter0');
            })
            .on('pointerover', () => this.newGameButton.setBackgroundColor('#ff0000'))
            .on('pointerout', () => this.newGameButton.setBackgroundColor(''));
    }
    update() {
    }
}
