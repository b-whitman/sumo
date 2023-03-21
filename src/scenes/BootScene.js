import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Load your game assets here (e.g., images, spritesheets, audio)
        // this.load.image('key', 'path/to/asset');
    }

    create() {
        this.scene.start('Menu');
    }
}