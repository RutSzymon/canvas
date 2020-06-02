class Paint {
  constructor() {
    this.img = new Image();
    this.img.addEventListener("load", () => { //funkcja strzałkowa by nie zgubić this
      this.canvasCnt = document.querySelector(".paint-canvas-cnt");
      this.createCanvas();
      this.setControls();
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

  setControls() {
      //element pobierania wielkości pędzla
      this.sizeElem = document.querySelector(".paint-size");

      //element pokazujący wielkość pędzla
      this.sizeElemVal = document.querySelector(".paint-size-val");
      this.sizeElemVal.innerText = this.sizeElem.value;

      //element do pobierania koloru
      this.colorElem = document.querySelector(".paint-color");
    }
}
