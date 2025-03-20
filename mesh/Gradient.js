export class Gradient {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.colors = [];
  }

  initGradient(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.setColors();
    this.animate();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.drawGradient();
    });
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setColors() {
    const style = getComputedStyle(this.canvas);
    this.colors = [
      style.getPropertyValue('--gradient-color-1').trim(),
      style.getPropertyValue('--gradient-color-2').trim(),
      style.getPropertyValue('--gradient-color-3').trim(),
      style.getPropertyValue('--gradient-color-4').trim(),
    ];
  }

  drawGradient() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    for(let i=0; i < this.colors.length; i++){
        gradient.addColorStop(i/(this.colors.length -1), this.colors[i]);
    }

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate() {
    this.drawGradient();
    requestAnimationFrame(this.animate.bind(this));
  }
}
