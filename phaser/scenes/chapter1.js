export class chapter1 extends Phaser.Scene {
    constructor() {
        super({ key: 'chapter1' });
    }
    preload() {
        this.load.spritesheet('alsetIdle', 'assets//characters/alset/idle32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetRight', 'assets//characters/alset/right32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetLeft', 'assets//characters/alset/left32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('mom', 'assets/characters/mom/momidle32x64.png', { frameWidth: 32, frameHeight: 64 });
        // this.load.image("roomTileSet", "assets/maps/room/tileset.png");
        // this.load.tilemapTiledJSON('roomTilemap', "assets/maps/room/tilemap.json");
    }
    create() {
        this.alset = this.physics.add.sprite(100, 300, 'alset');
        this.mom = this.physics.add.sprite(500, 300, 'mom');
        this.anims.create({
            key:'alsetIdle',
            frames:this.anims.generateFrameNumbers('alsetIdle', {start:0 , end:7}),
            frameRate: 7,
        });
        this.anims.create({
            key:'alsetRight',
            frames:this.anims.generateFrameNumbers('alsetRight', {start:0 , end:6}),
            frameRate: 7,
        });
        this.anims.create({
            key:'alsetLeft',
            frames:this.anims.generateFrameNumbers('alsetLeft', {start:0 , end:6}),
            frameRate: 7,
        });
        this.anims.create({
            key:'momIdle',
            frames:this.anims.generateFrameNumbers('mom', {start:0 , end:6}),
            frameRate: 7,
        });
        this.cameras.main.setZoom(1);
        //this.cameras.main.startFollow(this.alset);
    }
    update() {  
        if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown){
            this.alset.anims.play('alsetRight',true);
            this.alset.x += 1;
        }
        if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown){
            this.alset.anims.play('alsetLeft',true);
            this.alset.x -= 1;
        }
        if(!this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown){
            this.alset.anims.play('alsetIdle',true);
        }

        this.mom.anims.play('momIdle',true);
    }
}
