export class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }
    preload() {
    }
    create() {
        this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x2c3e50).setOrigin(0);
        // Create interactive buttons
        this.chapter0 = this.add.text(300, 50, 'chapter0', { fill: '#ffffff', fontSize: '24px' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('chapter0');
            })
            .on('pointerover', () => this.chapter0.setBackgroundColor('#ff0000'))
            .on('pointerout', () => this.chapter0.setBackgroundColor(''));
        this.chapter1 = this.add.text(300, 100, 'chapter1', { fill: '#ffffff', fontSize: '24px' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('chapter1');
            })
            .on('pointerover', () => this.chapter1.setBackgroundColor('#ff0000'))
            .on('pointerout', () => this.chapter1.setBackgroundColor(''));
    }
    update() {
    }
}
