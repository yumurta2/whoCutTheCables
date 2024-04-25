export class youDied extends Phaser.Scene {
    constructor() {
        super({ key: 'youDied' });
    }
    preload() {
        this.load.audio('diemusic', 'assets/sounds/diemusic.wav');
        this.load.audio('electricShock', 'assets/sounds/electricShock.wav');
        this.load.spritesheet('alsetDie', 'assets/characters/alset/alsetcarp32x64right.png', { frameWidth: 32, frameHeight: 64 });
    }
    create() {
        this.dieShock = this.sound.add('electricShock');
        this.dieShock.play();
        
        this.alsetDied = this.physics.add.sprite(500, 200, 'alsetDie').setDepth(3).setScale(3);
        this.music = this.sound.add('diemusic');

        this.music.play();
        this.text = this.add.text(150, 300, 'You died', { fill: '#aa0000', fontSize: '48px' }); 
        this.anims.create({
            key:'alsetDie',
            frames:this.anims.generateFrameNumbers('alsetDie', {start:0 , end:4}),
            frameRate: 5,
        });
        this.alsetDied.anims.play('alsetDie', true);
        this.time.delayedCall(6000, () => {
            this.music.stop();
            this.scene.start('opening');
        });

    }
    update() {  
    }
}
