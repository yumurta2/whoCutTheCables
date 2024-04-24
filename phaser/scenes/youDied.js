export class youDied extends Phaser.Scene {
    constructor() {
        super({ key: 'youDied' });
    }
    preload() {

    }
    create() {
        this.text = this.add.text(150, 300, 'You died', { fill: '#aa0000', fontSize: '48px' }); 
        this.time.delayedCall(4000, () => {
            this.scene.start('opening');
        });
    }
    update() {  
    }
}
