export class chapter0 extends Phaser.Scene {
    constructor() {
        super({ key: 'chapter0' });
    }
    preload() {
        this.load.spritesheet('alsetIdleRight', 'assets//characters/alset/idle32x64right.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('mom', 'assets/characters/mom/momidle32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('bulb', 'assets/objects/sk_kapal.png');
        this.load.image('bulbK', 'assets/objects/sk_kirik.png');
        this.load.audio('ampulAc', 'assets/sounds/ampulAc.wav');
        this.load.audio('ampulPat', 'assets/sounds/ampulPat.wav');
        // this.load.image("roomTileSet", "assets/maps/room/tileset.png");
        // this.load.tilemapTiledJSON('roomTilemap', "assets/maps/room/tilemap.json");
    }
    create() {
        this.bulb = this.add.image(350, 150, 'bulb');
        this.darkenOverlay = this.add.graphics();
        this.darkenOverlay.fillStyle(0x000000, 0.8); 
        this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
        this.darkenOverlay.setDepth(5); 
        this.alset = this.physics.add.sprite(250, 200, 'alsetIdleRight');
        this.mom = this.physics.add.sprite(500, 200, 'mom');
        this.textArr=[0,false];
        this.anims.create({
            key:'alsetIdle',
            frames:this.anims.generateFrameNumbers('alsetIdleRight', {start:0 , end:7}),
            frameRate: 5,
        });
        this.anims.create({
            key:'momIdle',
            frames:this.anims.generateFrameNumbers('mom', {start:0 , end:6}),
            frameRate: 5,
        });
        this.cameras.main.setZoom(2);
        //this.cameras.main.startFollow(this.alset);
        this.text = this.add.text(-600, -600, '-', { fill: '#ffffff', fontSize: '11px' });
        this.text.setDepth(10);
        this.brighteningCircle = this.add.graphics();
        this.brighteningCircle.setDepth(15);
        this.brighteningRadius = [25,26,27,28,29,30,31,32,33,34,35]; 
        this.brighteningColor = 0xffffaa;
        this.radiusMultiplier = 200;
        this.isBulb = false;
        this.brighteningAlpha = 0.1;
    }
update() {  
    if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
        console.log('space pressed');
        this.textArr[0] = this.textArr[0] + 1;
        this.textArr[1] = false;
    }
    if(this.textArr[1] == false){
        this.textArr[1] = true;
        switch(this.textArr[0]){
            case 1:
                this.text.setText('Alset: ZzZz').setPosition(this.alset.x - 50, this.alset.y - 50);
                break;
            case 2:
                this.text.setText('Alset: ZzZz . . .');
                break;
            case 3:
                this.text.setText('Mom: Alset Wake Up!').setPosition(this.mom.x - 100, this.mom.y - 50);
                break;
            case 4:
                this.text.setText('Alset: What is happening ?!').setPosition(this.alset.x - 50, this.alset.y - 50);
                this.sound.play('ampulAc');
                this.darkenOverlay.setDepth(-1); 
                this.isBulb = true;
                break;
            case 5:
                this.text.setText('Mom: Something is wrong with electrics').setPosition(this.mom.x - 200, this.mom.y - 50);
                break;
            case 6:
                this.text.setText('Alset: Close the lights !').setPosition(this.alset.x - 50, this.alset.y - 50);
                break;
            case 7:
                this.bulb.destroy();
                this.bulb = this.add.image(350, 150, 'bulbK');
                this.sound.play('ampulPat');
                this.text.setText('Alset: Too late . . .').setPosition(this.alset.x - 50, this.alset.y - 50);
                this.radiusMultiplier = 20;
                this.brighteningColor = 0xffaa33;
                this.brighteningAlpha = 0.02;
                this.darkenOverlay.setDepth(10);
                break;
            case 8:
                this.text.setText('Mom: get this flashlight').setPosition(this.mom.x - 200, this.mom.y - 50);
                break;
            case 9:
                this.scene.start('chapter1');
                break;
        }
    }
    this.alset.anims.play('alsetIdle',true);
    this.mom.anims.play('momIdle',true);
    if(this.isBulb == true){
        this.brighteningCircle.clear()
        this.brighteningCircle.fillStyle(this.brighteningColor, this.brighteningAlpha);
        for(const radius in this.brighteningRadius){

           this.brighteningRadius[radius] = Math.ceil(Math.random()*this.radiusMultiplier);
           this.brighteningCircle.fillCircle(350, 150, this.brighteningRadius[radius]);
        }
    }
}
}
