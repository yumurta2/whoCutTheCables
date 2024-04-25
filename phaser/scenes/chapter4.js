export class chapter4 extends Phaser.Scene {
    constructor() {
        super({ key: 'chapter4' });
    }
    preload() {
        this.load.spritesheet('alsetIdleRight', 'assets/characters/alset/idle32x64right.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetIdleLeft', 'assets/characters/alset/idle32x64left.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetRight', 'assets/characters/alset/right32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetLeft', 'assets/characters/alset/left32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('invisWall', 'assets/invisWall.png');
        this.load.spritesheet('mom', 'assets/characters/mom/momidle32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('mercek', 'assets/mercek.png');
        this.load.image('kitchen', 'assets/maps/house/ep1/1kitchen.png');
        this.load.image('alsetP', 'assets/portraits/alset.png');
        this.load.image('momP', 'assets/portraits/mom.png');
        this.load.image('powerBoxBroken', 'assets/objects/powerBoxBroken.png');
        this.load.image('powerBoxFixed', 'assets/objects/powerBoxFixed.png');
        this.load.spritesheet('electricEfect', 'assets/objects/electricEfect19x29.png', { frameWidth: 19, frameHeight: 29 });
        this.load.image('timeBarFg', 'assets/ui/timeBarFg.png');
        this.load.image('timeBarBg', 'assets/ui/timeBarBg.png');
        this.load.image('sisP', 'assets/portraits/sister.png');
        this.load.spritesheet('sis', 'assets/characters/sister/idleLeft32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.audio('anaTemaHizli', 'assets/sounds/anaTemaHizli.wav');
        this.load.audio('anaTemaYavas', 'assets/sounds/anaTemaYavas.wav');
        // this.load.image("roomTileSet", "assets/maps/room/tileset.png");
        // this.load.tilemapTiledJSON('roomTilemap', "assets/maps/room/tilemap.json");
    }
    createCameraMercek(){
        this.cameras.main.setZoom(1);
        this.mercek = this.add.image(0, 0, 'mercek').setDepth(13);
        this.cameras.main.startFollow(this.alset);
        this.mercek.setScale(2);
        this.brighteningCircle = [];
        this.brighteningCircle[0] = this.add.graphics();
        this.brighteningCircle[0].setDepth(12);
                //this.brighteningCircle[1] = this.add.graphics();
        //this.brighteningCircle[1].setDepth(13);
    }
    create() {
        this.anaTemaHizli = this.sound.add('anaTemaHizli', { loop: true });
        this.anaTemaYavas = this.sound.add('anaTemaYavas', { loop: true });

        this.anaTemaHizli.play();
        this.alsetP = this.add.image(-1000, 250, 'alsetP').setDepth(17);
        this.sisP = this.add.image(-1000, 250, 'sisP').setDepth(16);

        this.powerBoxBroken = this.add.image(500, 150, 'powerBoxBroken').setDepth(2).setScale(3);
        this.powerBoxFixed = this.add.image(-2000, 150, 'powerBoxFixed').setDepth(2).setScale(3);
        this.electricEfect = this.physics.add.sprite(500, 150, 'electricEfect').setDepth(14).setScale(3);
        this.anims.create({
            key:'electricEfect',
            frames:this.anims.generateFrameNumbers('electricEfect', {start:0 , end:9}),
            frameRate: 8,
        });

        this.text = this.add.text(230, 300, '', { fill: '#ffffff', fontSize: '18px' }).setDepth(14);

        this.kitchen = this.add.image(400, 150, 'kitchen').setDepth(1);
        this.game.canvas.style.cursor = "none";
        this.alset = this.physics.add.sprite(100, 200, 'alsetIdleRight').setDepth(3);
        this.sis = this.physics.add.sprite(-2000, 200, 'sis').setDepth(4);

        this.alset.setCollideWorldBounds(true);



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


        this.alset.lastAnim = null;
        this.text = this.add.text(230, 300, '', { fill: '#ffffff', fontSize: '18px' }).setDepth(14);
        this.powerBox = false;
        this.createCameraMercek();
        this.powerBoxNum = 0;
        this.text.x= 230;
        this.text.y= 300;
        this.slower = false;
        this.physics.world.setBounds(150, 0, 500, 300);
        this.timeBarBg = this.add.image(this.text.x-1000,this.text.y-200, 'timeBarBg').setDepth(15);
        this.timeBarFg = this.add.image(this.text.x-1000,this.text.y-200, 'timeBarFg').setDepth(16);
        this.currentHP = 100;
        this.musicChange = false;
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
    powerBoxInteract(){
        switch(this.powerBoxNum){
            case 0:
                this.text.setText('press SPACE to interact').setPosition(this.text.x,this.text.y);
                break;
            case 1:
                this.text.setText('Sis:\n\n  What are you doing?').setPosition(this.text.x,this.text.y);
                if(this.musicChange == false){
                    this.anaTemaHizli.stop();
                    this.anaTemaYavas.play();
                    this.musicChange = true;
                }
                this.powerBox = true;
                this.sisP.x = this.text.x+400;
                this.sis.x = 600;
                break;
            case 2:
                this.text.setText('Alset:\n\n  you scared me\n\n  Where did you come from').setPosition(this.text.x,this.text.y);
                this.sisP.x = -1000;
                this.alsetP.x = this.text.x-150;
                break;
            case 3:
                this.text.setText(`Sis:\n\n  Didn't you notice me\n\n  I've been following you\n\n  from the beginning`).setPosition(this.text.x,this.text.y);
                this.sisP.x = this.text.x+400;
                this.alsetP.x = -1000;
                break;
            case 4:
                this.text.setText(`Alset:\n\n  Then why did you ask what I did \n\n  I'm trying to fix power boxes`).setPosition(this.text.x,this.text.y);
                this.sisP.x = -1000;
                this.alsetP.x = this.text.x-150;
                break;
            case 5:
                this.text.setText('Sis:\n\n  Dont\n\n  They cannot live\n\n  in the light').setPosition(this.text.x,this.text.y);
                this.sisP.x = this.text.x+400;
                this.alsetP.x = -1000;
                break;
            case 6:
                this.text.setText(`Alset:\n\n  Mom asked me to do it`).setPosition(this.text.x,this.text.y);
                this.sisP.x = -1000;
                this.alsetP.x = this.text.x-150;
                break;
            case 7:
                this.text.setText(`Sis:\n\n  It is not mom!`).setPosition(this.text.x,this.text.y);
                this.sisP.x = this.text.x+400;
                this.alsetP.x = -1000;
                break;
            case 8:
                this.anaTemaYavas.stop();

                this.scene.start('chapter5');
                break
            default:
                break;
        }
    }
    update() { 

        if(this.coundown){
            if(this.currentHP>0){
                this.currentHP -= 0.5;
                this.timeBarFg.scaleX = this.currentHP / 100;
            }
            else{
                this.anaTemaHizli.stop();

                this.scene.start('youDied');
            }
        }
        this.text.x = this.cameras.main.midPoint.x - 150;
        this.text.y = this.cameras.main.midPoint.y + 100 ;

        if(Phaser.Math.Distance.Between(this.alset.x, this.alset.y, this.powerBoxBroken.x, this.powerBoxBroken.y) < 70){
            this.powerBoxInteract();
            if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE )) ){
                this.powerBoxNum = this.powerBoxNum + 1;
            }


        }else{
            this.text.setText('').setPosition(this.text.x,this.text.y);

        }
        // if( Phaser.Math.Distance.Between(this.alset.x, this.alset.y, this.mom.x, this.mom.y) < 30){
        //     this.updateMomDialog();
        //     if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
        //         this.dialogWithMom = true;
        //         this.momDialog = this.momDialog + 1;
        //     }
        // }else{
        //     this.text.setText('').setPosition(this.text.x,this.text.y);
        // }
        //this.cameras.main.midPoint.x this.cameras.main.midPoint.y
        this.mercek.x = this.input.activePointer.x + this.alset.x -384;
        this.mercek.y = this.input.activePointer.y + this.alset.y -215;
        this.brighteningCircle[0].clear();
        //this.brighteningCircle[1].clear();
        this.slower = this.slower + 1 % 10;
        if(this.slower % 11 == 0){
            this.brighteningCircle[0].fillStyle(0x000000, Math.random());
        }

        //this.brighteningCircle[1].fillStyle(0x000000, Math.floor(Math.random()*10)/10);
        this.brighteningCircle[0].fillCircle(this.mercek.x, this.mercek.y, 100);
        //this.brighteningCircle[1].fillCircle(this.mercek.x, this.mercek.y, 90);
        this.electricEfect.anims.play('electricEfect',true);
        if(!this.powerBox){
            this.updateMovement();
        }
    }
}



