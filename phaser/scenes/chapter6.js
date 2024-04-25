export class chapter6 extends Phaser.Scene {
    constructor() {
        super({ key: 'chapter6' });
    }
    preload() {
        this.load.spritesheet('alsetIdleRight', 'assets/characters/alset/idle32x64right.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetIdleLeft', 'assets/characters/alset/idle32x64left.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetRight', 'assets/characters/alset/right32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetLeft', 'assets/characters/alset/left32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('invisWall', 'assets/invisWall.png');
        this.load.spritesheet('momrobo', 'assets/characters/mom/momrobot32x64-Sheet.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('momters', 'assets/characters/mom/momidle32x64ters.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('mercek', 'assets/mercek.png');
        this.load.image('corridor', 'assets/maps/house/ep1/1corridor.png');
        this.load.image('corridor3', 'assets/maps/house/ep3/3corridor.png');
        this.load.image('livingRoomDoor', 'assets/maps/house/doors/livingRoomDoor.png');
        this.load.image('kitchenDoor', 'assets/maps/house/doors/kitchenDoor.png');
        this.load.image('alsetP', 'assets/portraits/alset.png');
        this.load.image('momP', 'assets/portraits/mom.png');
        this.load.image('sisP', 'assets/portraits/sister.png');
        this.load.image('roboMomP', 'assets/portraits/mom_robot.png');
        this.load.image('powerBoxBroken', 'assets/objects/powerBoxBroken.png');
        this.load.image('powerBoxFixed', 'assets/objects/powerBoxFixed.png');
        this.load.spritesheet('electricEfect', 'assets/objects/electricEfect19x29.png', { frameWidth: 19, frameHeight: 29 });
        this.load.image('timeBarFg', 'assets/ui/timeBarFg.png');
        this.load.image('timeBarBg', 'assets/ui/timeBarBg.png');
        this.load.audio('anaTemaHizli', 'assets/sounds/anaTemaHizli.wav');
        this.load.audio('anaTemaYavas', 'assets/sounds/anaTemaYavas.wav');
        this.load.spritesheet('sis', 'assets/characters/sister/idleLeft32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('sisR', 'assets/characters/sister/idleRight32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.audio('ElektrikPanel', 'assets/sounds/ElektrikPanel.wav');

        // this.load.image("roomTileSet", "assets/maps/room/tileset.png");
        // this.load.tilemapTiledJSON('roomTilemap', "assets/maps/room/tilemap.json");
    }
    createCameraMercek(){
        this.cameras.main.setZoom(1);
        this.mercek = this.add.image(0, 0, 'mercek').setDepth(-1);
        this.cameras.main.startFollow(this.alset);
        this.mercek.setScale(2);
        this.brighteningCircle = [];
        this.brighteningCircle[0] = this.add.graphics();
        this.brighteningCircle[0].setDepth(-1);
        //this.brighteningCircle[1] = this.add.graphics();
        //this.brighteningCircle[1].setDepth(13);
    }
    create() {
        this.panel = this.sound.add('ElektrikPanel', { loop: true });

        this.anaTemaHizli = this.sound.add('anaTemaHizli', { loop: true });
        this.anaTemaYavas = this.sound.add('anaTemaHizli', { loop: true });

        this.anaTemaYavas.play();
        this.alsetP = this.add.image(-1000, 250, 'alsetP').setDepth(14);
        this.momP = this.add.image(-1000, 250, 'roboMomP').setDepth(14);
        this.sisP = this.add.image(-1000, 250, 'sisP').setDepth(14);
        this.powerBoxBroken = this.add.image(1000, 150, 'powerBoxBroken').setDepth(2).setScale(3);
        this.powerBoxFixed = this.add.image(-2000, 150, 'powerBoxFixed').setDepth(2).setScale(3);
        this.electricEfect = this.physics.add.sprite(1000, 200, 'electricEfect').setDepth(14).setScale(4);
        //this.livingRoomDoor = this.add.image(600, 165, 'livingRoomDoor').setDepth(2);
        //this.kitchenDoor = this.add.image(1400, 165, 'kitchenDoor').setDepth(2);

        this.corridor = this.add.image(980, 150, 'corridor3').setDepth(1);
        this.game.canvas.style.cursor = "none";
        this.alset = this.physics.add.sprite(100, 200, 'alsetIdleRight').setDepth(4);
        this.alset.setCollideWorldBounds(true);
        this.sis = this.physics.add.sprite(300, 200, 'sis').setDepth(4);
        this.mom = this.physics.add.sprite(1000, 200, 'momrobo').setDepth(4);
        
        this.anims.create({
            key:'electricEfect',
            frames:this.anims.generateFrameNumbers('electricEfect', {start:0 , end:9}),
            frameRate: 8,
        });
        this.anims.create({
            key:'electricEfect2',
            frames:this.anims.generateFrameNumbers('electricEfect', {start:0 , end:9}),
            frameRate: 16,
        });
        this.anims.create({
            key:'alsetIdleRight',
            frames:this.anims.generateFrameNumbers('alsetIdleRight', {start:0 , end:7}),
            frameRate: 8,
        });
        this.anims.create({
            key:'roboMomIdle',
            frames:this.anims.generateFrameNumbers('momrobo', {start:0 , end:17}),
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
        this.anims.create({
            key:'momters',
            frames:this.anims.generateFrameNumbers('momters', {start:0 , end:6}),
            frameRate: 8,
        });
        this.anims.create({
            key:'sisIdle',
            frames:this.anims.generateFrameNumbers('sis', {start:0 , end:6}),
            frameRate: 8,
        });
        this.anims.create({
            key:'sisters',
            frames:this.anims.generateFrameNumbers('sisR', {start:0 , end:6}),
            frameRate: 8,
        });

        this.alset.lastAnim = null;
        this.text = this.add.text(230, 300, '', { fill: '#ffffff', fontSize: '18px' }).setDepth(14);
        

        this.createCameraMercek();

        this.text.x= 230;
        this.text.y= 300;
        this.slower = false;
        this.physics.world.setBounds(0, 0, 1920, 300);

        this.coundown = false;
        this.powerBox = false;
        this.powerBoxNum = -3;
        this.dialogWithMom = false;
        this.momDialog = 0;
        this.kitchenD = false;
        this.kitchenDLog = 0;
        this.livingRoomD = false;
        this.livingRoomDLog = 0;
        this.didFix=false;
        this.timeBarBg = this.add.image(this.text.x-1000,this.text.y-200, 'timeBarBg').setDepth(15);
        this.timeBarFg = this.add.image(this.text.x-1000,this.text.y-200, 'timeBarFg').setDepth(16);
        this.currentHP = 200;
        this.momP.y = this.text.y-100;
        this.reMusic = false;
    }
    updateMovement(){
        if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown){
            this.alset.anims.play('alsetRight',true);
            this.alset.x += 1;
            this.alset.lastAnim = 'alsetRight';
        }
        if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown){
            this.alset.anims.play('alsetLeft',true);
            this.alset.x -= 1;
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
    }
    updateSisDialog(){
        switch(this.momDialog){
            case 0:
                this.text.setText('press SPACE to talk').setPosition(this.text.x,this.text.y);
                this.dialogWithMom = false;
                break;
            case 1:
                this.dialogWithMom = true;
                this.text.setText(`Sis: \n\n  Can't believe what I see`).setPosition(this.text.x-50,this.text.y);
                this.sisP.x = this.text.x+460;
                this.sisP.y = this.text.y-50;
                this.alsetP.y = this.text.y-100;
  
                break;
            case 2:
                this.dialogWithMom = true;
                this.text.setText('Sis: \n\n  You have to help her').setPosition(this.text.x-50,this.text.y);
                break;
            case 3:
                this.dialogWithMom = true;
                this.text.setText(`Sis: \n\n  Please don't ask any questions`).setPosition(this.text.x-50,this.text.y);

                break;
            case 4:
                this.dialogWithMom = true;
                this.text.setText(`Sis: \n\n  You'll understand\n\n  When you go to her`).setPosition(this.text.x-50,this.text.y);

                break;
            case 5:
                this.dialogWithMom = true;
                this.text.setText(`Alset: \n\n  I don't understand you\n\n  You sound crazy`).setPosition(this.text.x,this.text.y);
                this.sisP.x = -1000;
                this.alsetP.x = this.text.x-150;
                this.alsetP.setDepth(14);
                break;
            case 6:
                this.text.setText(`Alset: \n\n  But I will go check mom anyways.`).setPosition(this.text.x,this.text.y);

                this.sisP.x = -1000;


                break;
            case 7:
                this.text.setText('').setPosition(this.text.x,this.text.y);

                this.sisP.x = -1000;
                this.alsetP.x = -1000;
                this.dialogWithMom = false;
                this.momDialog = 0;
                break;
            default:
                this.text.setText('').setPosition(this.text.x,this.text.y);
                this.sisP.setDepth(-4);
                this.alsetP.setDepth(-4);
                this.dialogWithMom = false;
                this.momDialog = 0;
                this.sisP.x = -1000;
                this.alsetP.x = -1000;
                break;
        }
    }



    powerBoxFunc(){
        switch(this.powerBoxNum){
            case -3:
                
                this.text.setText('press SPACE to interact').setPosition(this.text.x,this.text.y);
                break;
            case -2:
                this.powerBox = true;
                this.momP.x = this.text.x+450;
                this.momP.setDepth(14);
                this.text.setText('Mom?:\n\n  Please').setPosition(this.text.x,this.text.y);
                break;
            case -1:
                this.text.setText('Mom?:\n\n  Fix').setPosition(this.text.x,this.text.y);
                break;
            case 0:
                this.text.setText('Mom?:\n\n  Me').setPosition(this.text.x,this.text.y);
                break;
            case 1:
                this.anaTemaYavas.stop();
                this.panel.play();
                
                this.coundown = true;
                this.timeBarBg.x = this.text.x +150;
                this.timeBarFg.x = this.text.x +150;
                this.text.style.setFontSize('64px');
                this.text.setText('H').setPosition(this.text.x,this.text.y);
                break;
            case 2:
                this.text.setText('A').setPosition(this.text.x,this.text.y);            
                break;
            case 3:
                this.text.setText('S').setPosition(this.text.x,this.text.y);            
                break;
            case 4:
                this.text.setText('T').setPosition(this.text.x,this.text.y);            
                break;
            case 5:
                this.text.setText('A').setPosition(this.text.x,this.text.y);            
                break;
            case 6:
                this.text.setText('L').setPosition(this.text.x,this.text.y);            
                break;
            case 7:
                this.text.setText('A').setPosition(this.text.x,this.text.y);            
                break;
            case 8:
                this.text.setText('V').setPosition(this.text.x,this.text.y);            
                break;
            case 9:
                this.text.setText('I').setPosition(this.text.x,this.text.y);            
                break;
            case 10:
                this.text.setText('S').setPosition(this.text.x,this.text.y);            
                break;
            case 11:
                this.text.setText('T').setPosition(this.text.x,this.text.y);            
                break;
            case 12:
                this.text.setText('A').setPosition(this.text.x,this.text.y);            
                break;
            case 13:
                this.text.setText('B').setPosition(this.text.x,this.text.y);            
                break;
            case 14:
                this.text.setText('A').setPosition(this.text.x,this.text.y);            
                break;
            case 15:
                this.text.setText('B').setPosition(this.text.x,this.text.y);            
                break;
            case 16:
                this.text.setText('Y').setPosition(this.text.x,this.text.y);            
                break;
            case 17:
                if(!this.reMusic){
                    this.anaTemaYavas.play();
                    this.panel.stop();
                    this.reMusic = true;
                }

                this.text.style.setFontSize('18px');
                this.coundown = false;
                this.momP.x = this.text.x+450;
                this.momP.y = this.text.y-100;
                this.alsetP.y = this.text.y-100;
                this.momP.setDepth(14);
                this.currentHP = 200;
                this.text.setText('Mom:\n\n  You restored my power').setPosition(this.text.x,this.text.y);
                break;
            case 18:
                this.anaTemaYavas.stop();
                this.scene.start('end');
                this.text.setText('Alset: \n\n  thanks mom..').setPosition(this.text.x,this.text.y);
                this.momP.setDepth(-4);
                this.momP.x = -1000;
                this.alsetP.x = this.text.x-150;
                this.alsetP.setDepth(14);
                this.text.setText('Mom: \n\n  thanks mom ..').setPosition(this.text.x,this.text.y);            
                this.currentHP = 200;
                break;
            case 19:
                this.text.setText('').setPosition(this.text.x,this.text.y);
                this.momP.setDepth(-4);
                this.alsetP.setDepth(-4);
                this.dialogWithMom = false;
                this.momDialog = 0;
                this.momP.x = -1000;
                this.alsetP.x = -1000;
                this.currentHP = 200;
                this.timeBarBg.x = this.text.x -2000;
                this.timeBarFg.x = this.text.x -2000;
                this.powerBox = false;
                this.powerBoxNum = 20;
                this.text.setText('').setPosition(this.text.x,this.text.y);
                this.electricEfect.x = -2000;
                this.powerBoxFixed.x = 1000;
                this.powerBoxBroken.x = -2000; 
                this.didFix = true;

            break;

            default:
                this.currentHP = 200;
                this.timeBarBg.x = this.text.x -2000;
                this.timeBarFg.x = this.text.x -2000;
                this.powerBox = false;
                this.powerBoxNum = 20;
                this.text.setText('').setPosition(this.text.x,this.text.y);
                this.electricEfect.x = -2000;
                this.powerBoxFixed.x = 1000;
                this.powerBoxBroken.x = -2000; 
                this.didFix = true;
                break;
        }
    }
    update() { 
        if(this.coundown){
            if(this.currentHP>0){
                this.currentHP -= 0.5;
                this.timeBarFg.scaleX = this.currentHP / 200;
            }
            else{
                this.anaTemaYavas.stop();
                this.panel.stop();
                this.scene.start('youDied');
            }
        }
        this.text.x = this.cameras.main.midPoint.x - 150;
        this.text.y = this.cameras.main.midPoint.y + 100;
        if( Phaser.Math.Distance.Between(this.alset.x, this.alset.y, this.sis.x, this.sis.y) < 30){
            this.updateSisDialog();
            if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
                this.momDialog = this.momDialog + 1;
            }
        }else if(Phaser.Math.Distance.Between(this.alset.x, this.alset.y, this.powerBoxBroken.x, this.powerBoxBroken.y) < 70){
            this.powerBoxFunc();
            if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)) && (this.powerBoxNum<1 || this.powerBoxNum> 16) ){
                this.powerBoxNum = this.powerBoxNum + 1;                
            }else if(this.powerBoxNum==1 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(  this.powerBoxNum==2 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A))) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(  this.powerBoxNum==3 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==4 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T))  ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==5 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==6 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==7 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==8 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==9 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==10 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==11 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==12 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==13 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==14 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==15 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            else if(this.powerBoxNum==16 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)) ) {
                this.powerBoxNum = this.powerBoxNum + 1;  
            }
            
            
        }
        // else if(Phaser.Math.Distance.Between(this.alset.x, this.alset.y, this.livingRoomDoor.x, this.livingRoomDoor.y) < 50){
        //     this.livingRoomDF(this.didFix);
        //     if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
        //         this.livingRoomDLog = this.livingRoomDLog + 1;
        //     }
        // }
        // else if(Phaser.Math.Distance.Between(this.alset.x, this.alset.y, this.kitchenDoor.x, this.kitchenDoor.y) < 50){
        //     this.kitchenDF();
        //     if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
        //         this.kitchenDLog = this.kitchenDLog + 1;
        //     }
        // }

        else{
            this.text.setText('').setPosition(this.text.x,this.text.y);
        }
        //this.cameras.main.midPoint.x this.cameras.main.midPoint.y
        this.mercek.x = this.input.activePointer.x + this.alset.x -384;
        this.mercek.y = this.input.activePointer.y + this.alset.y -215;
        this.brighteningCircle[0].clear();
        //this.brighteningCircle[1].clear();
        this.brighteningCircle[0].fillStyle(0x000000, Math.random()*0.5);
        //this.brighteningCircle[1].fillStyle(0x000000, Math.floor(Math.random()*10)/10);
        this.brighteningCircle[0].fillCircle(this.mercek.x, this.mercek.y, 100);
        //this.brighteningCircle[1].fillCircle(this.mercek.x, this.mercek.y, 90);
        if (this.sis && this.alset.x > this.sis.x) {
            this.sis.anims.play('sisters',true);
        } else {
            this.sis.anims.play('sisIdle',true);
        }
        this.mom.anims.play('roboMomIdle',true);
        this.electricEfect.anims.play('electricEfect2',true);
        if(!this.dialogWithMom && !this.powerBox && !this.livingRoomD && !this.kitchenD ){
            this.updateMovement();
        }
    }
}



