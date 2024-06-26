export class chapter1 extends Phaser.Scene {
    constructor() {
        super({ key: 'chapter1' });
    }

    preload() {
        this.loadAssets();
    }

    create() {
        this.createCharacters();
        this.createEnvironment();
        this.createAnimations();
        this.createColliders();
    }

    update() { 
        this.updateMercekPosition();
        this.updateAlsetMovement();
    }

    loadAssets() {
        this.load.spritesheet('alsetIdleRight', 'assets/characters/alset/idle32x64right.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetIdleLeft', 'assets/characters/alset/idle32x64left.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetRight', 'assets/characters/alset/right32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetLeft', 'assets/characters/alset/left32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('invisWall', 'assets/invisWall.png');
        this.load.spritesheet('mom', 'assets/characters/mom/momidle32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('mercek', 'assets/mercek.png');
        this.load.image('corridor', 'assets/maps/corridor/corridor.png');
        // this.load.image("roomTileSet", "assets/maps/room/tileset.png");
        // this.load.tilemapTiledJSON('roomTilemap', "assets/maps/room/tilemap.json");
    }

    createEnvironment() {
        this.leftWall = this.physics.add.image(0, 200, 'invisWall');
        this.leftWall.setCollideWorldBounds(true);
        this.corridor = this.add.image(300, 100, 'corridor').setDepth(1);
        this.game.canvas.style.cursor = "none";
        this.mercek = this.add.image(0, 0, 'mercek').setDepth(31);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(this.alset);
        //this.physics.world.setBounds(0, 0, 20000, 20000);
    }

    createCharacters() {
        this.alset = this.physics.add.sprite(100, 200, 'alsetIdleRight').setDepth(3);
        this.alset.setCollideWorldBounds(true);
        this.mom = this.physics.add.sprite(300, 200, 'mom').setDepth(2);
    }

    createAnimations() {
        this.anims.create({
            key:'alsetIdleRight',
            frames:this.anims.generateFrameNumbers('alsetIdleRight', {start:0 , end:7}),
            frameRate: 8,
        });
        this.anims.create({
            key:'alsetIdleLeft',
            frames:this.anims.generateFrameNumbers('alsetIdleLeft', {start:0 , end:7}),
            frameRate: 8,
        });
        this.anims.create({
            key:'alsetRight',
            frames:this.anims.generateFrameNumbers('alsetRight', {start:0 , end:4}),
            frameRate: 4,
        });
        this.anims.create({
            key:'alsetLeft',
            frames:this.anims.generateFrameNumbers('alsetLeft', {start:0 , end:4}),
            frameRate: 4,
        });
        this.anims.create({
            key:'momIdle',
            frames:this.anims.generateFrameNumbers('mom', {start:0 , end:6}),
            frameRate: 8,
        });
    }

    createColliders() {
        this.leftWall.setImmovable(true);
        this.physics.add.collider(this.alset, this.leftWall);
    }

    updateMercekPosition() {
        this.mercek.x = this.input.activePointer.x + this.alset.x -384;
        this.mercek.y = this.input.activePointer.y + this.alset.y -215;
    }

    updateAlsetMovement() {
        if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown){
            this.alset.anims.play('alsetRight',true);
            this.alset.x += 0.5;
            this.alset.lastAnim = 'alsetRight';
        }
        if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown){
            this.alset.anims.play('alsetLeft',true);
            this.alset.x -= 0.5;
            this.alset.lastAnim = 'alsetLeft';
        }
        if(!this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown || this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown && this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown){
            if(this.alset.lastAnim === 'alsetRight'){
                this.alset.anims.play('alsetIdleRight',true);
            }
            if(this.alset.lastAnim === 'alsetLeft'){
                this.alset.anims.play('alsetIdleLeft',true);
            } 
        }
        this.mom.anims.play('momIdle',true);
    }
}
