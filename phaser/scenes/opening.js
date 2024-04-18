export class opening extends Phaser.Scene {
    constructor() {
        super({ key: 'opening' });
    }
    preload() {
        this.load.image('incir', 'assets/logos/incir.png');
        this.load.image('gamedevjs', 'assets/logos/gamedevjs.png');
    }
    create() {
        this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x333399).setOrigin(0);
        const incir = this.add.image(150, 100, 'incir').setScale(0.1);
        const gamedevjs = this.add.image(450, 100, 'gamedevjs').setScale(0.1);

        this.tweens.add({
            targets: [incir,gamedevjs],
            scaleX: 2,
            scaleY: 2,
            angle: 360,
            duration: 800,
            ease: 'Cubic.InOut',
            onComplete: () => {
                this.time.delayedCall(500, () => {
                    this.scene.start('menu');
                });
            }
        });
    }
    update() {
    }
}