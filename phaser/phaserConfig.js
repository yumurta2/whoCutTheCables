import { opening } from './scenes/opening.js';
import { menu } from './scenes/menu.js';
import { chapter0 } from './scenes/chapter0.js';

const config = {
    type: Phaser.AUTO,
    width: 768,
    height: 432,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Top down game, so no gravity
            debug: false
        }
    },
    scene: [opening,menu,chapter0],
    audio: {
        disableWebAudio: true, // In case of issues with Web Audio, set it to true
        noAudio: false, // Ensure audio is not disabled
        muted: false // Unmute audio
    },
    pixelArt: true,
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true
    }
};

new Phaser.Game(config);