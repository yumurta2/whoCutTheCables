export class end extends Phaser.Scene {
    constructor() {
        super({ key: 'end' });
    }
    preload() {
        this.load.spritesheet('alsetIdleRight', 'assets//characters/alset/idle32x64right.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('momrobo', 'assets/characters/mom/momrobot32x64-Sheet.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('sis', 'assets/characters/sister/idleLeft32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('bulb', 'assets/objects/sk_kapal.png');
        this.load.image('bulbK', 'assets/objects/sk_kirik.png');
        this.load.image('alsetP', 'assets/portraits/alset.png');
        this.load.image('momP', 'assets/portraits/mom_robot.png');
        this.load.image('momRoboP', 'assets/portraits/mom_robot.png');
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
        this.alsetP = this.add.image(-2000, 250, 'alsetP').setDepth(7);
        this.momP = this.add.image(-2000, 250, 'momP').setDepth(7);
        this.momRoboP = this.add.image(-2000, 250, 'momRoboP').setDepth(7);
        this.sisP = this.add.image(-2000, 250, 'sisP').setDepth(7);
 
        this.bulb = this.add.image(400, 150, 'bulbK').setDepth(6);
        this.darkenOverlay = this.add.graphics();
        this.darkenOverlay.fillStyle(0x000000, 0.1); 
        this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
        this.darkenOverlay.setDepth(15); 
        this.map = this.add.graphics();
        this.map.fillStyle(0x000000, 1); 
        this.map.fillRect(0, 0, this.game.config.width, this.game.config.height).setDepth(1);


        this.alset = this.physics.add.sprite(350, 200, 'alsetIdleRight').setDepth(3);
        this.mom = this.physics.add.sprite(500, 200, 'momrobo').setDepth(3);
        this.sis = this.physics.add.sprite(300, 200, 'sis').setDepth(3);
        this.textArr=[0,false];
        this.anims.create({
            key:'alsetIdle',
            frames:this.anims.generateFrameNumbers('alsetIdleRight', {start:0 , end:7}),
            frameRate: 5,
        });
        this.anims.create({
            key:'momRoboIdle',
            frames:this.anims.generateFrameNumbers('momrobo', {start:0 , end:17}),
            frameRate: 5,
        });
        this.anims.create({
            key:'sisIdle',
            frames:this.anims.generateFrameNumbers('sis', {start:0 , end:7}),
            frameRate: 5,
        });
        this.cameras.main.setZoom(1.5);

        this.text = this.add.text(230, 300, '', { fill: '#ffffff', fontSize: '18px' });
        this.text.setDepth(51);
        this.brighteningCircle = this.add.graphics();
        this.brighteningCircle.setDepth(12);
        this.brighteningRadius = [25,26,27,28,29,30,31,32,33,34,35]; 

        this.isBulb = true;

        this.text.x= 230;
        this.text.y= 300;
        this.radiusMultiplier = 50;
        this.brighteningColor = 0xffaa33;
        this.brighteningAlpha = 0.03;
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
                this.text.setText('press SPACE to interact').setPosition(this.text.x,this.text.y-40);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 1:
                this.sisP.setPosition(550, 200);
                this.text.setText(`Sis:\n\n  You still think I'm crazy !`).setPosition(this.text.x-90,this.text.y);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 2:
                this.text.setText(`Alset:\n\n  What are you?`).setPosition(this.text.x+190,this.text.y);
                this.sisP.setPosition(-2000, 200);
                this.alsetP.setPosition(200, 250);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 3:
                this.text.setText(`Alset:\n\n  Where is our real mom`).setPosition(this.text.x,this.text.y);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 4:
                this.text.setText(`Mom:\n\n  Your mom no longer exists`).setPosition(this.text.x-200,this.text.y);
                this.alsetP.setPosition(-2000, 250);
                this.momRoboP.setPosition(550, 200);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 5:
                this.text.setText(`Sis:\n\n  You killed her !`).setPosition(this.text.x,this.text.y);
                this.momRoboP.setPosition(-2000, 200);
                this.sisP.setPosition(550, 200);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 6:
                this.text.setText(`Mom:\n\n  I didn't`).setPosition(this.text.x,this.text.y);
                this.momRoboP.setPosition(550, 200);
                this.sisP.setPosition(-2000, 200);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 7:
                this.text.setText(`Alset:\n\n  Then explain everything`).setPosition(this.text.x,this.text.y);
                this.alsetP.setPosition(550, 250);
                this.momRoboP.setPosition(-2000, 200);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 8:
                this.text.setText(`Mom:\n\n  You are nothing than\n\n  A lab rat for the corparation`).setPosition(this.text.x,this.text.y);
                this.alsetP.setPosition(-2000, 250);
                this.momRoboP.setPosition(550, 200);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 9:
                this.text.setText(`Mom:\n\n  You weren't supposes\n\n  to know any of these`).setPosition(this.text.x,this.text.y);
                this.alsetP.setPosition(-2000, 250);
                this.momRoboP.setPosition(550, 200);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 10:
                this.text.setText(`Mom:\n\n  Expriment 31 failed`).setPosition(this.text.x,this.text.y);
                this.alsetP.setPosition(-2000, 250);
                this.momRoboP.setPosition(550, 200);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 11:
                this.text.setText(`Mom:\n\n  We are done here`).setPosition(this.text.x,this.text.y);
                this.alsetP.setPosition(-2000, 250);
                this.momRoboP.setPosition(550, 200);
                this.darkenOverlay.fillStyle(0x000000, 0.1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
            case 12:
                this.text.style.setFontSize('64px');
                this.text.setText(`The End`).setPosition(this.cameras.main.midPoint.x-140, this.cameras.main.midPoint.y);
                this.darkenOverlay.fillStyle(0x000000, 1); 
                this.darkenOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
                break;
        }
    }
    this.alset.anims.play('alsetIdle',true);
    this.mom.anims.play('momRoboIdle',true);
    this.sis.anims.play('sisIdle',true);
    if(this.isBulb ){
        this.brighteningCircle.clear();
        this.brighteningCircle.fillStyle(this.brighteningColor, this.brighteningAlpha);
        for(const radius in this.brighteningRadius){

           this.brighteningRadius[radius] = Math.ceil(Math.random()*this.radiusMultiplier);
           this.brighteningCircle.fillCircle(400, 150, this.brighteningRadius[radius]);
        }
    }
}
}
