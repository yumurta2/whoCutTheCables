export class chapter2 extends Phaser.Scene {
    constructor() {
        super({ key: 'chapter2' });
    }
    preload() {
        this.load.spritesheet('alsetIdleRight', 'assets/characters/alset/idle32x64right.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetIdleLeft', 'assets/characters/alset/idle32x64left.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetRight', 'assets/characters/alset/right32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('alsetLeft', 'assets/characters/alset/left32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('invisWall', 'assets/invisWall.png');
        this.load.spritesheet('mom', 'assets/characters/mom/momidle32x64.png', { frameWidth: 32, frameHeight: 64 });
        this.load.image('mercek', 'assets/mercek.png');
        this.load.image('livingRoom', 'assets/maps/house/ep1/1livingRoom.png');
        this.load.image('alsetP', 'assets/portraits/alset.png');
        this.load.image('momP', 'assets/portraits/mom.png');
        this.load.image('powerBoxBroken', 'assets/objects/powerBoxBroken.png');
        this.load.image('powerBoxFixed', 'assets/objects/powerBoxFixed.png');
        this.load.spritesheet('electricEfect', 'assets/objects/electricEfect19x29.png', { frameWidth: 19, frameHeight: 29 });
        this.load.image('timeBarFg', 'assets/ui/timeBarFg.png');
        this.load.image('timeBarBg', 'assets/ui/timeBarBg.png');
        this.load.audio('anaTemaHizli', 'assets/sounds/anaTemaHizli.wav');
        this.load.audio('ElektrikPanel', 'assets/sounds/ElektrikPanel.wav');

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
        this.panel = this.sound.add('ElektrikPanel', { loop: true });

        this.coundown = false;
        this.anaTemaHizli = this.sound.add('anaTemaHizli', { loop: true });

        this.anaTemaHizli.play();
        this.alsetP = this.add.image(-1000, 250, 'alsetP').setDepth(-3);
        this.momP = this.add.image(-1000, 250, 'momP').setDepth(-3);

        this.powerBoxBroken = this.add.image(300, 150, 'powerBoxBroken').setDepth(2).setScale(3);
        this.powerBoxFixed = this.add.image(-2000, 150, 'powerBoxFixed').setDepth(2).setScale(3);
        this.electricEfect = this.physics.add.sprite(300, 150, 'electricEfect').setDepth(14).setScale(3);
        this.anims.create({
            key:'electricEfect',
            frames:this.anims.generateFrameNumbers('electricEfect', {start:0 , end:9}),
            frameRate: 8,
        });

        this.text = this.add.text(230, 300, '', { fill: '#ffffff', fontSize: '18px' }).setDepth(14);

        this.livingRoom = this.add.image(400, 150, 'livingRoom').setDepth(1);
        this.game.canvas.style.cursor = "none";
        this.alset = this.physics.add.sprite(100, 200, 'alsetIdleRight').setDepth(3);
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
        this.physics.world.setBounds(0, 0, 800, 300);
        this.timeBarBg = this.add.image(this.text.x-1000,this.text.y-200, 'timeBarBg').setDepth(15);
        this.timeBarFg = this.add.image(this.text.x-1000,this.text.y-200, 'timeBarFg').setDepth(16);
        this.currentHP = 300;
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
    powerBoxInteract(){
        switch(this.powerBoxNum){
            case 0:
                this.text.setText('press SPACE to interact').setPosition(this.text.x,this.text.y);
                break;
            case 1:
                this.anaTemaHizli.stop();
                this.panel.play();
                this.powerBox = true;
                this.coundown = true;
                this.timeBarBg.x = this.text.x +150;
                this.timeBarFg.x = this.text.x +150;
                this.text.style.setFontSize('64px');
                this.text.setText('F').setPosition(this.text.x+100,this.text.y);
                break;
            case 2:
                this.text.setText('R').setPosition(this.text.x+100,this.text.y);
                break;
            case 3:
                this.text.setText('I').setPosition(this.text.x+100,this.text.y);
                break;
            case 4:
                this.text.setText('E').setPosition(this.text.x+100,this.text.y);
                break;
            case 5:
                this.text.setText('N').setPosition(this.text.x+100,this.text.y);
                break;
            case 6:
                this.text.setText('D').setPosition(this.text.x+100,this.text.y);
                break;
            case 7:
                this.text.setText('O').setPosition(this.text.x+100,this.text.y);
                break;
            case 8:
                this.text.setText('F').setPosition(this.text.x+100,this.text.y);
                break;
            case 9:
                this.text.setText('S').setPosition(this.text.x+100,this.text.y);
                break;
            case 10:
                this.text.setText('A').setPosition(this.text.x+100,this.text.y);
                break;
            case 11:
                this.text.setText('R').setPosition(this.text.x+100,this.text.y);
                break;
            case 12:
                this.text.setText('A').setPosition(this.text.x+100,this.text.y);
                break;
            case 13:
                this.text.setText('H').setPosition(this.text.x+100,this.text.y);
                break;
            case 14:
                this.text.style.setFontSize('18px');
                    this.anaTemaHizli.stop();
                    this.panel.stop();
                    this.scene.start('chapter3');
                break;

            default:
                break;
        }
    }
    update() { 

        if(this.coundown){
            if(this.currentHP>0){
                this.currentHP -= 0.5;
                this.timeBarFg.scaleX = this.currentHP / 300;
            }
            else{
                this.anaTemaHizli.stop();
                this.panel.stop();
                this.scene.start('youDied');
            }
        }
        this.text.x = this.cameras.main.midPoint.x - 150;
        this.text.y = this.cameras.main.midPoint.y + 100 ;

        if(Phaser.Math.Distance.Between(this.alset.x, this.alset.y, this.powerBoxBroken.x, this.powerBoxBroken.y) < 70){
            this.powerBoxInteract();
            if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE )) && this.powerBoxNum== 0){
                this.powerBoxNum = this.powerBoxNum + 1;
            }else if( this.powerBoxNum == 1 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F )) ){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(this.powerBoxNum == 2 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R )) ){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I )) && this.powerBoxNum == 3){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E )) && this.powerBoxNum == 4){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N )) && this.powerBoxNum == 5){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D )) && this.powerBoxNum == 6){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O )) && this.powerBoxNum == 7){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F )) && this.powerBoxNum == 8){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S )) && this.powerBoxNum == 9){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(this.powerBoxNum == 10 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A )) ){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(this.powerBoxNum == 11 && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R )) ){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A )) && this.powerBoxNum == 12){
                this.powerBoxNum = this.powerBoxNum + 1;
            }
            else if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H )) && this.powerBoxNum == 13){
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



