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
        this.load.image('kitchen', 'assets/maps/house/kitchen.png');
        this.load.image('alsetP', 'assets/portraits/alset.png');
        this.load.image('momP', 'assets/portraits/mom.png');
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
        this.alsetP = this.add.image(-1000, 250, 'alsetP').setDepth(-3);
        this.momP = this.add.image(-1000, 250, 'momP').setDepth(-3);
        this.leftWall = this.physics.add.image(0, 160, 'invisWall');
        
        this.leftWall.setCollideWorldBounds(true);
        this.kitchen = this.add.image(980, 150, 'kitchen').setDepth(1);
        this.game.canvas.style.cursor = "none";
        this.alset = this.physics.add.sprite(100, 200, 'alsetIdleRight').setDepth(3);
        this.alset.setCollideWorldBounds(true);
        this.mom = this.physics.add.sprite(300, 200, 'mom').setDepth(2);
        this.leftWall.setImmovable(true);
        this.physics.add.collider(this.alset, this.leftWall);
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

        this.alset.lastAnim = null;
        this.text = this.add.text(230, 300, '', { fill: '#ffffff', fontSize: '18px' }).setDepth(14);
        this.dialogWithMom = false;
        this.createCameraMercek();
        this.momDialog = 0;
        this.text.x= 230;
        this.text.y= 300;
        this.slower = false;
        this.physics.world.setBounds(0, 0, 2000, 300);
    }
    updateMovement(){
        if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown){
            this.alset.anims.play('alsetRight',true);
            this.alset.x += 3;
            this.alset.lastAnim = 'alsetRight';
        }
        if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown && !this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown){
            this.alset.anims.play('alsetLeft',true);
            this.alset.x -= 3;
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
    updateMomDialog(){
        switch(this.momDialog){
            case 0:
                this.text.setText('press SPACE to interact').setPosition(this.text.x,this.text.y);
                this.dialogWithMom = false;
                break;
            case 1:
                this.dialogWithMom = true;
                this.text.setText('Mom: \n\n  You are still here ?!').setPosition(this.text.x,this.text.y);
                this.momP.x = this.text.x+450;
                this.momP.y = this.text.y-100;
                this.alsetP.y = this.text.y-100;
                this.momP.setDepth(14);
                break;
            case 2:
                this.dialogWithMom = true;
                this.text.setText('Mom: \n\n  And trying to talk to me ?!').setPosition(this.text.x,this.text.y);
                this.momP.setDepth(14);
        
                break;
            case 3:
                this.dialogWithMom = true;
                this.text.setText('Mom: \n\n  Hurry fix the electrics !').setPosition(this.text.x,this.text.y);
                this.momP.setDepth(14);
                break;
            case 4:
                this.dialogWithMom = true;
                this.text.setText('Alset: \n\n  Sorry mom..').setPosition(this.text.x,this.text.y);
                this.momP.setDepth(-4);
                this.momP.x = -1000;
                this.alsetP.x = this.text.x-150;
                this.alsetP.setDepth(14);

                break;
            case 5:
                this.text.setText('').setPosition(this.text.x,this.text.y);
                this.momP.setDepth(-4);
                this.alsetP.setDepth(-4);
                this.momP.x = -1000;
                this.alsetP.x = -1000;
                this.dialogWithMom = false;
                this.momDialog = 0;
                break;
            default:
                this.text.setText('').setPosition(this.text.x,this.text.y);
                this.momP.setDepth(-4);
                this.alsetP.setDepth(-4);
                this.dialogWithMom = false;
                this.momDialog = 0;
                this.momP.x = -1000;
                this.alsetP.x = -1000;
                break;
        }
        

    }
    update() { 
        this.text.x = this.cameras.main.midPoint.x - 150;
        this.text.y = this.cameras.main.midPoint.y + 100 ;


        if( Phaser.Math.Distance.Between(this.alset.x, this.alset.y, this.mom.x, this.mom.y) < 30){
            this.updateMomDialog();
            if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
                this.dialogWithMom = true;
                this.momDialog = this.momDialog + 1;
            }
        }else{
            this.text.setText('').setPosition(this.text.x,this.text.y);
        }
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
        this.mom.anims.play('momIdle',true);
        if(!this.dialogWithMom){
            this.updateMovement();
        }
    }
}



