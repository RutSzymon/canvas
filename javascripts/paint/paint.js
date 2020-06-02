class Paint {
  constructor() {
    this.img = new Image();
    this.img.addEventListener("load", () => { //funkcja strzałkowa by nie zgubić this
      this.canvasCnt = document.querySelector(".paint-canvas-cnt");
      this.createCanvas();
    });
    this.img.src = "canvas-bg.png";
  }
}
