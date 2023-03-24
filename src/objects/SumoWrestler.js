// SumoWrestler.js
export default class SumoWrestler {
  constructor(scene, x, y, radius, pattern, isPlayer1) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.pattern = pattern;
    this.isPlayer1 = isPlayer1;
    this.facingAngle = isPlayer1 ? 0 : Math.PI;

    this.createWrestler();
  }

  createWrestler() {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(this.pattern, 1.0);
    graphics.fillCircle(0, 0, this.radius);
    graphics.setPosition(this.x, this.y);
    this.wrestler = graphics;
    this.drawFacingLine();
  }

  setInitialFacingAngle(opponent) {
    this.facingAngle = Phaser.Math.Angle.Between(this.x, this.y, opponent.x, opponent.y);
  }

  drawFacingLine() {

    if (this.facingLine) {
      this.facingLine.clear();
    }
    
    const lineLength = this.radius + 20;
    const lineEndX = this.x + lineLength * Math.cos(this.facingAngle);
    const lineEndY = this.y + lineLength * Math.sin(this.facingAngle);
    
    const lineGraphics = this.scene.add.graphics();
    lineGraphics.lineStyle(2, 0x00FF00, 1.0);
    lineGraphics.beginPath();
    lineGraphics.moveTo(this.x, this.y);
    lineGraphics.lineTo(lineEndX, lineEndY);
    lineGraphics.closePath();
    lineGraphics.strokePath();
    this.facingLine = lineGraphics
  }

  update(opponent, newX, newY) {
    console.log("Object x: ", this.x, "Object y: ", this.y);
    console.log("New x: ", newX, "New y: ", newY);
    this.x = newX;
    this.y = newY;
    console.log("New object x and y: ", this.x, this.y);
    console.log("Before position update: ", this.wrestler.x, this.wrestler.y);
    this.wrestler.setPosition(newX, newY);
    console.log("After position update: ", this.wrestler.x, this.wrestler.y);
    this.updateFacing(opponent);
    this.drawFacingLine();
  }

  updateFacing(opponent) {
    this.facingAngle = Phaser.Math.Angle.Between(this.x, this.y, opponent.x, opponent.y);
    
    const player = this.isPlayer1 ? "Player One" : "Player Two"
    console.log(player, 'Updating facing line:', this.x, this.y, this.facingAngle);

    const lineLength = this.radius + 20;
    const startX = this.x;
    const startY = this.y;
    const endX = startX + lineLength * Math.cos(this.facingAngle);
    const endY = startY + lineLength * Math.sin(this.facingAngle);
  
    this.facingLine.clear();
    this.facingLine.lineStyle(2, 0x00FF00);
    this.facingLine.moveTo(startX, startY);
    this.facingLine.lineTo(endX, endY);
    this.facingLine.strokePath();
  }
  // Add additional methods for wrestler actions and updates
}
