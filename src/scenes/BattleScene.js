import Phaser from 'phaser';
import SumoWrestler from '../objects/SumoWrestler'

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super('Battle');
    }

    create() {
        this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x87CEEB).setOrigin(0, 0);
        this.createBalanceBars();
        this.createActionButtons();
        this.createWrestlers();
        this.createKeyboardInput();
        this.createPlayerIndicator();
    }

    createKeyboardInput() {
        this.keys = {
            W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        };
    }
        

    createBalanceBars() {
        // Player 1 balance bar
    this.player1BalanceBar = this.add.rectangle(20, 20, 100, 10, 0x00ff00).setOrigin(0, 0);
    
    // Player 2 balance bar
    this.player2BalanceBar = this.add.rectangle(this.sys.game.config.width - 120, 20, 100, 10, 0x00ff00).setOrigin(0, 0);
    }

    createActionButtons() {
        this.actionButtons = this.add.group();

        const buttonWidth = 100;
        const buttonHeight = 50;
        const buttonPadding = 10;
        const buttonX = (this.sys.game.config.width - buttonWidth) / 2;
        const buttonY = this.sys.game.config.height - buttonHeight - buttonPadding;
        const moveButtonText = this.add.text(
            buttonX + buttonWidth / 2,
            buttonY - buttonHeight - buttonPadding + buttonHeight / 2,
            'Move',
            { fontSize: '24px', fill: '#000' }
        ).setOrigin(0.5, 0.5);
        this.actionButtons.add(moveButtonText);
        const pushButton = this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xff0000).setOrigin(0, 0);
        pushButton.setInteractive();
        pushButton.on('pointerdown', () => {
        this.performAction('push');
        });
        this.actionButtons.add(pushButton);
        const moveButton = this.add.rectangle(
            buttonX,
            buttonY - buttonHeight - buttonPadding,
            buttonWidth,
            buttonHeight,
            0xffd700
          ).setOrigin(0, 0);
          moveButton.setInteractive();
          moveButton.on('pointerdown', () => {
            this.showMoveOptions();
          });
          this.actionButtons.add(moveButton);
        
          // Create move options (hidden by default)
          this.createMoveOptions();
    }

    createMoveOptions() {
        this.moveOptions = this.add.group();
        const buttonWidth = 120;
        const buttonHeight = 50;
        const buttonPadding = 10;
        const optionsX = (this.sys.game.config.width - buttonWidth) / 2;
        const optionsY = this.sys.game.config.height - buttonHeight * 3 - buttonPadding * 2;
        // Sidestep button
        const sidestepButton = this.add.rectangle(
            optionsX,
            optionsY,
            buttonWidth,
            buttonHeight,
            0x00ff00
        ).setOrigin(0, 0);
        sidestepButton.setInteractive();
        sidestepButton.on('pointerdown', () => {
            this.playerSelectMove('sidestep');
        });
        const sidestepButtonText = this.add.text(
            optionsX + buttonWidth / 2,
            optionsY + buttonHeight / 2,
            'Sidestep',
            { fontSize: '18px', fill: '#000' }
        ).setOrigin(0.5, 0.5);
        this.moveOptions.add(sidestepButtonText);
        this.moveOptions.add(sidestepButton);

        // Forward button
        const forwardButton = this.add.rectangle(
            optionsX,
            optionsY + buttonHeight + buttonPadding,
            buttonWidth,
            buttonHeight,
            0xffa500
        ).setOrigin(0, 0);
        forwardButton.setInteractive();
        forwardButton.on('pointerdown', () => {
            this.playerSelectMove('forward');
        });
        const forwardButtonText = this.add.text(
            optionsX + buttonWidth / 2,
            optionsY + buttonHeight + buttonPadding + buttonHeight / 2,
            'Forward',
            { fontSize: '18px', fill: '#000' }
        ).setOrigin(0.5, 0.5);
        this.moveOptions.add(forwardButtonText);
        this.moveOptions.add(forwardButton);

        // Retreat button
        const retreatButton = this.add.rectangle(
            optionsX,
            optionsY + (buttonHeight + buttonPadding) * 2,
            buttonWidth,
            buttonHeight,
            0x00ffff
        ).setOrigin(0, 0);
        retreatButton.setInteractive();
        retreatButton.on('pointerdown', () => {
            this.playerSelectMove('retreat');
        });
        const retreatButtonText = this.add.text(
            optionsX + buttonWidth / 2,
            optionsY + (buttonHeight + buttonPadding) * 2 + buttonHeight / 2,
            'Retreat',
            { fontSize: '18px', fill: '#000' }
        ).setOrigin(0.5, 0.5);
        this.moveOptions.add(retreatButtonText);
        
        this.moveOptions.add(retreatButton);

        this.moveOptions.setVisible(false);
    }

    createPlayerIndicator() {
        const indicatorX = this.sys.game.config.width / 2;
        const indicatorY = 50;
        this.playerIndicator = this.add.text(
            indicatorX,
            indicatorY,
            'Player 1',
            { fontSize: '32px', fill: '#000' }
        ).setOrigin(0.5, 0.5);
    }
      
    showMoveOptions() {
        this.moveOptions.setVisible(true);
    }

    performAction(action) {
        // Implement the action logic based on the selected action
        console.log('Action:', action);
    }

    playerSelectMove(move) {
        if (!this.player1Move) {
            this.player1Move = move;
            this.changeInterfaceColor(this.player2.color);
        } else {
            this.player2Move = move;
            this.executeMoves();
        }
    }
      
    changeInterfaceColor(color) {
        // Change the color of the interface elements, such as action buttons and move options
        // ...
        if (color === this.player1.color) {
            this.playerIndicator.setText('Player 1');
        } else {
            this.playerIndicator.setText('Player 2');
        }
    }
    
    executeMoves() {
        console.log('Player 1 Move:', this.player1Move);
        console.log('Player 2 Move:', this.player2Move);
    
        // Implement move execution logic here
        this.applyPlayerMove(this.player1, this.player1Move);
        this.applyPlayerMove(this.player2, this.player2Move);
        // Reset moves and change interface color back to Player 1
        this.player1Move = null;
        this.player2Move = null;
        this.changeInterfaceColor(this.player1.color);
    }

    applyPlayerMove(player, move) {
        const speed = 50;

        switch (move) {
            case 'sidestep':
                player.wrestler.x += player.isplayer1 ? -speed : speed;
                break;
            case 'forward':
                player.wrestler.y -= speed;
                break;
            case 'retreat':
                player.wrestler.y += speed;
                break;
        }
    }

    createWrestlers() {
        const wrestlerRadius = 50;
        const player1Pattern = 0xff0000;
        const player2Pattern = 0x0000ff;
    
        this.player1 = new SumoWrestler(
          this,
          this.sys.game.config.width / 4,
          this.sys.game.config.height / 2,
          wrestlerRadius,
          player1Pattern,
          true
        );
    
        this.player2 = new SumoWrestler(
          this,
          (this.sys.game.config.width * 3) / 4,
          this.sys.game.config.height / 2,
          wrestlerRadius,
          player2Pattern,
          false
        );
    }

    update() {
        this.handleKeyboardInput();
    }

    // BattleScene.js

    update() {
        this.handleKeyboardInput();
    }
    
    handleKeyboardInput() {
        const speed = 5;
    
        // Player 1 movement (WSAD)
        if (this.keys.W.isDown) {
        this.player1.wrestler.y -= speed;
        }
        if (this.keys.A.isDown) {
        this.player1.wrestler.x -= speed;
        }
        if (this.keys.S.isDown) {
        this.player1.wrestler.y += speed;
        }
        if (this.keys.D.isDown) {
        this.player1.wrestler.x += speed;
        }
    
        // Player 2 movement (arrow keys)
        if (this.keys.up.isDown) {
        this.player2.wrestler.y -= speed;
        }
        if (this.keys.left.isDown) {
        this.player2.wrestler.x -= speed;
        }
        if (this.keys.down.isDown) {
        this.player2.wrestler.y += speed;
        }
        if (this.keys.right.isDown) {
        this.player2.wrestler.x += speed;
        }
    }
  
}