export class opening extends Phaser.Scene {
    constructor() {
        super({ key: 'opening' });
    }
    preload() {
        this.load.image('incir', 'assets/logos/incir.png');
        //this.load.image('gamedevjs', 'assets/logos/gamedevjs.png');
        this.load.image('jam24', 'assets/logos/jam24.png');
    }
    create() {

        this.jam24 = this.add.image(-50, -10, 'jam24').setOrigin(0);
        this.incir = this.add.image(200, 300, 'incir').setScale(0.1);
        //this.gamedevjs = this.add.image(550, 200, 'gamedevjs').setScale(0.1);

        this.tweens.add({
            targets: [this.incir, this.gamedevjs],
            scaleX: 3,
            scaleY: 3,
            angle: 360,
            duration: 1000,
            ease: 'Cubic.InOut',
            onComplete: () => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('menu');
                });
            }
        });
    }
    update() {
    }
}