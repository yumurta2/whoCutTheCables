export class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }
    preload() {
        this.load.image('thumbnail', 'assets/thumbnails/thumbnail.png');
    }
    create() {
        //this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x2c3e50).setOrigin(0);
  

        this.thumbnail = this.add.image(350, 250, 'thumbnail').setDepth(0);
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
        this.chapter2 = this.add.text(300, 150, 'chapter2', { fill: '#ffffff', fontSize: '24px' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('chapter2');
            })
            .on('pointerover', () => this.chapter2.setBackgroundColor('#ff0000'))
            .on('pointerout', () => this.chapter2.setBackgroundColor(''));
        this.chapter3 = this.add.text(300, 200, 'chapter3', { fill: '#ffffff', fontSize: '24px' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('chapter3');
            })
            .on('pointerover', () => this.chapter3.setBackgroundColor('#ff0000'))
            .on('pointerout', () => this.chapter3.setBackgroundColor(''));
        this.chapter4 = this.add.text(300, 250, 'chapter4', { fill: '#ffffff', fontSize: '24px' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('chapter4');
            })
            .on('pointerover', () => this.chapter4.setBackgroundColor('#ff0000'))
            .on('pointerout', () => this.chapter4.setBackgroundColor(''));
        this.chapter5 = this.add.text(300, 300, 'chapter5', { fill: '#ffffff', fontSize: '24px' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('chapter5');
            })
            .on('pointerover', () => this.chapter5.setBackgroundColor('#ff0000'))
            .on('pointerout', () => this.chapter5.setBackgroundColor(''));
    }
    update() {
    }
}
