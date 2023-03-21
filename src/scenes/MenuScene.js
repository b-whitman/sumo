import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        const startButton = this.add.text(100, 100, 'Start Game', { fontSize: '32px', fill: '#fff' });
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('Battle');
        });
    }
}