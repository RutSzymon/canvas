class Paint {
  constructor() {
    this.canvasBg = new Image();
    this.canvasBg.addEventListener("load", () => {
      this.avaibleMode = ["draw", "line", "rectangle"];
      //funkcja strzałkowa by nie zgubić this
      this.canvasCnt = document.querySelector(".paint-canvas-cnt");
      this.createCanvas();

      //czy mozemy rysowac
      this.canDraw = false;
      this.mode = "draw";

      this.setControls();
      this.bindControls();

      this.setupInitialCtx();
    });
    this.canvasBg.src = "images/paint/canvas-bg.png";
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvasCnt.offsetWidth;
    this.canvas.height = this.canvasCnt.offsetHeight;
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

    //przyciski akcji - zamieniamy je na tablicę by łatwiej działać
    this.btnsMode = [
      ...document.querySelectorAll(".paint-buttons-cnt .button-mode"),
    ];

    //dla przycisku z trybem draw dodajemy klasę active
    this.btnsMode
      .filter(function (el) {
        return el.dataset.mode === "draw";
      })[0]
      .classList.add("active");
  }

  setupInitialCtx() {
    //tło canvasu
    this.ctx.drawImage(this.canvasBg, 0, 0);

    //początkowe ustawienia pędzla
    this.ctx.lineWidth = this.sizeElem.value;
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = this.colorElem.value;
  }

  mouseEnable(e) {
    this.canDraw = true;
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
  }

  mouseDisable(e) {
    this.canDraw = false;
  }

  mouseMove(e) {
    if (this.canDraw) {
      const mousePos = this.getMousePosition(e);

      if (this.mode === "draw") {
        this.ctx.lineTo(mousePos.x, mousePos.y);
        this.ctx.stroke();
      }
    }
  }

  getMousePosition(e) {
    const mouseX = e.pageX - this.getElementPos(this.canvas).left;
    const mouseY = e.pageY - this.getElementPos(this.canvas).top;

    return {
      x: mouseX,
      y: mouseY,
    };
  }

  getElementPos(obj) {
    let top = 0;
    let left = 0;
    while (obj && obj.tagName != "BODY") {
      top += obj.offsetTop - obj.scrollTop;
      left += obj.offsetLeft - obj.scrollLeft;
      obj = obj.offsetParent;
    }
    return {
      top: top,
      left: left,
    };
  }

  bindControls() {
    //dla każdego elementu przypinamy metody bindem
    //bo chcemy w nich mieć dostęp do naszego obiektu paint
    this.sizeElem.addEventListener("change", this.changeSize.bind(this));
    this.sizeElem.addEventListener("input", this.changeSize.bind(this));

    this.colorElem.addEventListener("change", this.changeColor.bind(this));

    this.canvasCnt.addEventListener("mousemove", this.mouseMove.bind(this));
    this.canvasCnt.addEventListener("mouseup", this.mouseDisable.bind(this));
    this.canvasCnt.addEventListener("mousedown", this.mouseEnable.bind(this));

    //po kliknięciu w przycisk zmiany trybu rysowania
    //wszystkim jego braciom wyłączamy klasę .active, a włączamy tylko temu klikniętemu
    //dodatkowo ustawiamy tryb rysowania na pobrany z dataset.mode klikniętego przycisku
    for (const el of this.btnsMode) {
      el.addEventListener("click", (e) => {
        e.currentTarget.classList.add("active");
        this.mode = e.currentTarget.dataset.mode;

        for (const el of this.btnsMode) {
          if (el !== e.currentTarget) {
            el.classList.remove("active");
          }
        }
      });
    }
  }

  changeSize(e) {
    //wartość wyświetlana przy input:range
    this.sizeElemVal.innerText = e.target.value;
    //zmieniamy wielkość rysowania
    this.ctx.lineWidth = e.target.value;
  }

  changeColor(e) {
    //zmieniamy kolor rysowania
    const color = this.colorElem.value;
    this.ctx.strokeStyle = color;
  }

  enableMode(mode) {
    //sprawdzamy czy włączany tryb jest poprawny
    if (this.avaibleMode.indexOf(mode) !== -1) {
      this.mode = mode;
    }
  }
}

new Paint();
