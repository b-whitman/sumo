// SumoWrestler.js
export default class SumoWrestler {
    constructor(scene, x, y, radius, pattern, isPlayer1) {
      this.scene = scene;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.pattern = pattern;
      this.isPlayer1 = isPlayer1;
  
      this.createWrestler();
    }
  
    createWrestler() {
      const graphics = this.scene.add.graphics();
      graphics.fillStyle(this.pattern, 1.0);
      graphics.fillCircle(this.x, this.y, this.radius);
      this.wrestler = graphics;
    }
  
    // Add additional methods for wrestler actions and updates
  }
  