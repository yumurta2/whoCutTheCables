export class youDied extends Phaser.Scene {
    constructor() {
        super({ key: 'youDied' });
    }
    preload() {
        this.load.audio('diemusic', 'assets/sounds/diemusic.wav');
    }
    create() {
        this.music = this.sound.add('diemusic');
        this.music.play();
        this.text = this.add.text(150, 300, 'You died', { fill: '#aa0000', fontSize: '48px' }); 
        this.time.delayedCall(6000, () => {
            this.music.stop();
            this.scene.start('opening');
        });
    }
    update() {  
    }
}
