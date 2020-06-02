class Paint {
  constructor() {
    this.img = new Image();
    this.img.addEventListener("load", () => { //funkcja strzałkowa by nie zgubić this
      this.canvasCnt = document.querySelector(".paint-canvas-cnt");
      this.createCanvas();
    });
    this.img.src = "canvas-bg.png";
  }

  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = this.canvasCnt.offsetWidth;
    canvas.height = this.canvasCnt.offsetHeight;

    this.canvas = this.createCanvas();
    this.canvasCnt.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }
}
