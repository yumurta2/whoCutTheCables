import { opening } from './scenes/opening.js';
import { menu } from './scenes/menu.js';
import { chapter0 } from './scenes/chapter0.js';
import { chapter1 } from './scenes/chapter1.js';

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
    scene: [chapter0,opening,menu,chapter1],
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
        target: 144,
        forceSetTimeOut: true
    }
};

new Phaser.Game(config);