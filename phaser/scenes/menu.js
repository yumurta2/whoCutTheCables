export class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }
    preload() {
        this.load.image('thumbnail', 'assets/thumbnails/thumbnail.png');
        this.load.audio('menuMusic', 'assets/sounds/MenuMusic.wav');
    }
    create() {
        //this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x2c3e50).setOrigin(0);
        this.menuMusic = this.sound.add('menuMusic', { loop: true });

        this.menuMusic.play();
        this.thumbnail = this.add.image(300, 250, 'thumbnail').setDepth(0);
        this.chapter0 = this.add.text(350, 350, 'Start the Game', { fill: '#ffffff', fontSize: '32px' })
            .setInteractive()
            .on('pointerdown', () => {
                this.menuMusic.stop();
                this.scene.start('chapter0');
            })
            .on('pointerover', () => this.chapter0.setBackgroundColor('#ff0000'))
            .on('pointerout', () => this.chapter0.setBackgroundColor(''));
    }
    update() {
    }
}
