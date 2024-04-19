export class chapter1 extends Phaser.Scene {
    constructor() {
        super({ key: 'chapter1' });
    }
    preload() {
        this.load.spritesheet('alset', 'assets//characters/alset/idle32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('mom', 'assets/characters/mom/momidle32x64.png', { frameWidth: 32, frameHeight: 64 });
        // this.load.image("roomTileSet", "assets/maps/room/tileset.png");
        // this.load.tilemapTiledJSON('roomTilemap', "assets/maps/room/tilemap.json");
    }
    create() {
        this.alset = this.physics.add.sprite(200, 100, 'alset');
        this.mom = this.physics.add.sprite(150, 100, 'mom');
        this.anims.create({
            key:'alsetIdle',
            frames:this.anims.generateFrameNumbers('alset', {start:0 , end:7}),
            frameRate: 5,
        });
        this.anims.create({
            key:'momIdle',
            frames:this.anims.generateFrameNumbers('mom', {start:0 , end:6}),
            frameRate: 5,
        });
        this.cameras.main.setZoom(1);
        //this.cameras.main.startFollow(this.alset);
    }
    update() {  
        this.alset.anims.play('alsetIdle',true);
        this.mom.anims.play('momIdle',true);
    }
}
