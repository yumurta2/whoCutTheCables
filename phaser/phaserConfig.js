import { opening } from './scenes/opening.js';
import { menu } from './scenes/menu.js';
import { chapter0 } from './scenes/chapter0.js';
import { chapter1 } from './scenes/chapter1.js';
import { chapter2 } from './scenes/chapter2.js';
import { chapter3 } from './scenes/chapter3.js';
import { chapter4 } from './scenes/chapter4.js';
import { chapter5 } from './scenes/chapter5.js';
import { chapter6 } from './scenes/chapter6.js';
import { youDied } from './scenes/youDied.js';
const config = {
    type: Phaser.AUTO,
    width: 768,
    height: 432,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [opening,menu,chapter0,chapter1,chapter2,chapter3,chapter4,chapter5,chapter6,youDied],
    audio: {
        disableWebAudio: true,
        noAudio: false,
        muted: false
    },
    pixelArt: true,
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    }
};

new Phaser.Game(config);