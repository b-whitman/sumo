import Phaser from 'phaser';
import SumoWrestler from '../objects/SumoWrestler'

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super('Battle');
    }

    create() {
        this.backgroundGraphics = this.add.graphics();
        this.interfaceColor = 0xFFFFFF;
        this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x87CEEB).setOrigin(0, 0);
        this.createBalanceBars();
        this.createActionButtons();
        this.createWrestlers();
        this.createKeyboardInput();
        this.createPlayerIndicator();
        this.currentPlayerTurn = this.player1;
        this.changeInterfaceColor(this.interfaceColor);
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
        
        const pushButton = this.add.rectangle(
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            0xff0000
        ).setOrigin(0, 0);
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
        const moveButtonText = this.add.text(
            buttonX + buttonWidth / 2,
            buttonY - buttonHeight - buttonPadding + buttonHeight / 2,
            'Move',
            { fontSize: '24px', fill: '#000' }
        ).setOrigin(0.5, 0.5);
        this.actionButtons.add(moveButtonText);
        this.actionButtons.setDepth(1);
        
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
        
        this.createMoveButton('Forward', optionsX, optionsY, 0xffa500);
        this.createMoveButton('Retreat', optionsX, optionsY + buttonHeight + buttonPadding, 0x00ffff);
        this.createMoveButton('Sidestep Left', optionsX, optionsY + (buttonHeight + buttonPadding) * 2, 0x00ff00);
        this.createMoveButton('Sidestep Right', optionsX + buttonWidth * 1.5 + buttonPadding, optionsY + (buttonHeight + buttonPadding) * 2, 0xff69b4);
        this.moveOptions.setDepth(1);
        this.moveOptions.setVisible(false);
    }

    createMoveButton(moveName, x, y, color) {
        const buttonWidth = 120;
        const buttonHeight = 50;

        const moveButton = this.add.rectangle(x, y, buttonWidth, buttonHeight, color).setOrigin(0, 0);
        moveButton.setInteractive();
        moveButton.on('pointerdown', () => {
            this.playerSelectMove(moveName);
        });
        const moveButtonText = this.add.text(
            x + buttonWidth / 2,
            y + buttonHeight / 2,
            moveName,
            { fontSize: '18px', fill: '#000' }
        ).setOrigin(0.5, 0.5);
        this.moveOptions.add(moveButton);
        this.moveOptions.add(moveButtonText);
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
            this.moveOptions.setVisible(false);
        } else {
            this.player2Move = move;
            this.executeMoves();
            this.moveOptions.setVisible(false);
        }
    }
      
    changeInterfaceColor(color) {
        this.interfaceColor = color;
        this.backgroundGraphics.clear();
        this.backgroundGraphics.fillStyle(color, 0.5);
        this.backgroundGraphics.fillRect(0, 0, this.sys.game.config.width, 50);
        const currentPlayerText = this.player1Move ? 'Player 2' : 'Player 1';
        this.playerIndicator.setText(currentPlayerText);
    }
    
    executeMoves() {
        console.log('Player 1 Move:', this.player1Move);
        console.log('Player 2 Move:', this.player2Move);
    
        // Calculate angle to opponent's initial position for both players
        let dx = this.player2.wrestler.x - this.player1.wrestler.x;
        let dy = this.player2.wrestler.y - this.player1.wrestler.y;

        const angleToOpponent1 = Math.atan2(dy, dx);
        const angleToOpponent2 = angleToOpponent1 + Math.PI;

        // Implement move execution logic here
        this.applyPlayerMove(this.player1, this.player1Move, angleToOpponent1);
        this.applyPlayerMove(this.player2, this.player2Move, angleToOpponent2);
        // Reset moves and change interface color back to Player 1
        this.player1Move = null;
        this.player2Move = null;
        this.changeInterfaceColor(this.player1.color);
        this.moveOptions.setVisible(false);
    }

    applyPlayerMove(player, move, angleToOpponent) {
        const speed = 50;
        const duration = 500;
        const opponent = player.isPlayer1 ? this.player2 : this.player1;

        console.log('angleToOpponent:', angleToOpponent)
        const moveConfig = {
            targets: player.wrestler,
            duration: duration,
            ease: 'Linear'
        };

        switch (move) {
            case 'Forward':
                moveConfig.x = player.wrestler.x + speed * Math.cos(angleToOpponent);
                moveConfig.y = player.wrestler.y + speed * Math.sin(angleToOpponent);
                break;
            case 'Retreat':
                moveConfig.x = player.wrestler.x - speed * Math.cos(angleToOpponent);
                moveConfig.y = player.wrestler.y - speed * Math.sin(angleToOpponent);
                break;
            case 'Sidestep Left':
                moveConfig.x = player.wrestler.x - speed * Math.sin(angleToOpponent);
                moveConfig.y = player.wrestler.y + speed * Math.cos(angleToOpponent);
                break;
            case 'Sidestep Right':
                moveConfig.x = player.wrestler.x + speed * Math.sin(angleToOpponent);
                moveConfig.y = player.wrestler.y - speed * Math.cos(angleToOpponent);
                break;
        }
        this.tweens.add(moveConfig);
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