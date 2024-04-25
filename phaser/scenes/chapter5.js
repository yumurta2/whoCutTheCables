export class chapter5 extends Phaser.Scene {
    constructor() {
        super({ key: 'chapter5' });
    }
    preload() {
        this.load.spritesheet('alsetIdleRight', 'assets//characters/alset/idle32x64right.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('mom', 'assets/characters/mom/momidle32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('sis', 'assets/characters/sister/idleLeft32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('bulb', 'assets/objects/sk_kapal.png');
        this.load.image('bulbK', 'assets/objects/sk_kirik.png');
        this.load.image('alsetP', 'assets/portraits/alset.png');
        this.load.image('momP', 'assets/portraits/mom.png');
        this.load.image('sisP', 'assets/portraits/sister.png');
        this.load.audio('ampulAc', 'assets/sounds/ampulAc.wav');
        this.load.audio('ampulPat', 'assets/sounds/ampulPat.wav');
        this.load.audio('anaTemaYavas', 'assets/sounds/anaTemaYavas.wav');
        // this.load.image("roomTileSet", "assets/maps/room/tileset.png");
        // this.load.tilemapTiledJSON('roomTilemap', "assets/maps/room/tilemap.json");
    }
    create() {
        this.game.canvas.style.cursor = "none";
        this.anaTemaYavas = this.sound.add('anaTemaYavas', { loop: true });
        this.anaTemaYavas.play();
        this.alsetP = this.add.image(100, 250, 'alsetP').setDepth(-3);
        this.sisP = this.add.image(650, 250, 'momP').setDepth(-3);
        this.sisP = this.add.image(650, 250, 'sisP').setDepth(-3);
 
        this.bulb = this.add.image(350, 150, 'bulbK').setDepth(6);
        this.darkenOverlay = this.add.graphics();

        this.map = this.add.graphics();
        this.map.fillStyle(0x000000, 1); 
        this.map.fillRect(0, 0, this.game.config.width, this.game.config.height).setDepth(1);

        this.darkenOverlay.fillStyle(0x000000, 0); 
        this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
        this.darkenOverlay.setDepth(5); 
        this.alset = this.physics.add.sprite(250, 200, 'alsetIdleRight').setDepth(3);
        this.sis = this.physics.add.sprite(500, 200, 'sis').setDepth(3);
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
        this.anims.create({
            key:'sisIdle',
            frames:this.anims.generateFrameNumbers('sis', {start:0 , end:6}),
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
                this.text.setText('Alset:\n\n  ZzZz').setPosition(this.text.x,this.text.y);
                break;
            case 2:
                this.text.setText('Alset:\n\n  ZzZz . . .');
                break;
            case 3:
                this.text.setText('Sis:\n\n  Wake Up!').setPosition(this.text.x-20,this.text.y);
                this.alsetP.setDepth(-4);
                this.sisP.setDepth(4);
                break;
            case 4:
                this.text.setText('Alset:\n\n  How did I fall asleep again ?!').setPosition(this.text.x+20,this.text.y);

                this.alsetP.setDepth(4);
                this.sisP.setDepth(-4);

                break;
            case 5:
                this.text.setText('Sis:\n\n  Something..\n\n  keeps turning on the lights').setPosition(this.text.x-20,this.text.y);
                this.alsetP.setDepth(-4);
                this.sisP.setDepth(4);
                break;
            case 6:
                this.text.setText('Sis:\n\n  We need to stop it !').setPosition(this.text.x,this.text.y);
                this.alsetP.setDepth(-4);
                this.sisP.setDepth(4);
                break;
            case 7:
                this.text.setText(`Alset:\n\n  {It? Is she talking about me?}`).setPosition(this.text.x+20,this.text.y);
                this.alsetP.setDepth(4);
                this.sisP.setDepth(-4);
                break;
            case 8:
                this.text.setText('Sis:\n\n  What did you say?').setPosition(this.text.x-20,this.text.y);
                this.alsetP.setDepth(-4);
                this.sisP.setDepth(4);
                break;
            case 9:
                this.text.setText(`Alset:\n\n  Nothing..`).setPosition(this.text.x+20,this.text.y);
                this.alsetP.setDepth(4);
                this.sisP.setDepth(-4);
                break;
            case 10:
                this.anaTemaYavas.stop();
                this.scene.start('chapter6');
                break;
        }
    }
    this.alset.anims.play('alsetIdle',true);
    this.sis.anims.play('sisIdle',true);
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
