export class chapter0 extends Phaser.Scene {
    constructor() {
        super({ key: 'chapter0' });
    }
    preload() {
        this.load.spritesheet('alsetIdleRight', 'assets//characters/alset/idle32x64right.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('mom', 'assets/characters/mom/momidle32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('bulb', 'assets/objects/sk_kapal.png');
        this.load.image('bulbK', 'assets/objects/sk_kirik.png');
        this.load.image('alsetP', 'assets/portraits/alset.png');
        this.load.image('momP', 'assets/portraits/mom.png');
        this.load.audio('ampulAc', 'assets/sounds/ampulAc.wav');
        this.load.audio('ampulPat', 'assets/sounds/ampulPat.wav');
        // this.load.image("roomTileSet", "assets/maps/room/tileset.png");
        // this.load.tilemapTiledJSON('roomTilemap', "assets/maps/room/tilemap.json");
    }
    create() {
        this.alsetP = this.add.image(100, 250, 'alsetP').setDepth(-3);
        this.momP = this.add.image(650, 250, 'momP').setDepth(-3);
 
        this.bulb = this.add.image(350, 150, 'bulb').setDepth(6);
        this.darkenOverlay = this.add.graphics();

        this.map = this.add.graphics();
        this.map.fillStyle(0x000000, 1); 
        this.map.fillRect(0, 0, this.game.config.width, this.game.config.height).setDepth(1);

        this.darkenOverlay.fillStyle(0x000000, 0.8); 
        this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
        this.darkenOverlay.setDepth(5); 
        this.alset = this.physics.add.sprite(250, 200, 'alsetIdleRight').setDepth(3);
        this.mom = this.physics.add.sprite(500, 200, 'mom').setDepth(3);
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
        this.cameras.main.setZoom(1);
        //this.cameras.main.startFollow(this.alset);
        this.text = this.add.text(230, 300, '', { fill: '#ffffff', fontSize: '18px' });
        this.text.setDepth(14);
        this.brighteningCircle = this.add.graphics();
        this.brighteningCircle.setDepth(12);
        this.brighteningRadius = [25,26,27,28,29,30,31,32,33,34,35]; 
        this.brighteningColor = 0xffffaa;
        this.radiusMultiplier = 300;
        this.isBulb = false;
        this.brighteningAlpha = 0.1;
        this.text.x= 230;
        this.text.y= 300;
    }
update() {  
    if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
        this.textArr[0] = this.textArr[0] + 1;
        this.textArr[1] = false;
    }
    if(this.textArr[1] == false){
        this.textArr[1] = true;
        switch(this.textArr[0]){
            case 0:
                this.text.setText('press SPACE to interact').setPosition(this.text.x,this.text.y);
                break;
            case 1:
                this.text.setText('Alset: ZzZz').setPosition(this.text.x,this.text.y);
                break;
            case 2:
                this.text.setText('Alset: ZzZz . . .');
                break;
            case 3:
                this.text.setText('Mom: Alset Wake Up!').setPosition(this.text.x,this.text.y);
                this.alsetP.setDepth(-4);
                this.momP.setDepth(4);
                break;
            case 4:
                this.text.setText('Alset: What is happening ?!').setPosition(this.text.x,this.text.y);
                this.sound.play('ampulAc');
                this.alsetP.setDepth(4);
                this.momP.setDepth(-4);
                this.darkenOverlay.setDepth(-1); 
                this.isBulb = true;
                break;
            case 5:
                this.text.setText('Mom: Something is wrong \n\nwith electrics').setPosition(this.text.x,this.text.y);
                this.alsetP.setDepth(-4);
                this.momP.setDepth(4);
                break;
            case 6:
                this.text.setText('Alset: Close the lights !').setPosition(this.text.x,this.text.y);
                this.alsetP.setDepth(4);
                this.momP.setDepth(-4);
                break;
            case 7:
                this.bulb.destroy();
                this.bulb = this.add.image(350, 150, 'bulbK').setDepth(6);
                this.sound.play('ampulPat');
                this.text.setText('Alset: Too late . . .').setPosition(this.text.x,this.text.y);
                this.radiusMultiplier = 50;
                this.brighteningColor = 0xffaa33;
                this.brighteningAlpha = 0.02;
                this.darkenOverlay.setDepth(10);
                break;
            case 8:
                this.text.setText('Mom: get this flashlight').setPosition(this.text.x,this.text.y);
                this.alsetP.setDepth(-4);
                this.momP.setDepth(4);
                break;
            case 9:
                this.scene.start('chapter1');
                break;
        }
    }
    this.alset.anims.play('alsetIdle',true);
    this.mom.anims.play('momIdle',true);
    if(this.isBulb == true){
        this.brighteningCircle.clear();
        this.brighteningCircle.fillStyle(this.brighteningColor, this.brighteningAlpha);
        for(const radius in this.brighteningRadius){

           this.brighteningRadius[radius] = Math.ceil(Math.random()*this.radiusMultiplier);
           this.brighteningCircle.fillCircle(350, 150, this.brighteningRadius[radius]);
        }
    }
}
}
