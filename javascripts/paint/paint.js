class Paint {
  constructor() {
    this.img = new Image();
    this.img.addEventListener("load", () => { //funkcja strzałkowa by nie zgubić this
      this.canvasCnt = document.querySelector(".paint-canvas-cnt");
      this.createCanvas();
      this.setControls();
      this.bindControls();

      //czy mozemy rysowac
      this.canDraw = false;
      this.mode = "draw";
      this.setupInitialCtx();
    });
    this.img.src = "images/paint/canvas-bg.png";
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvasCnt.offsetWidth;
    this.canvas.height = this.canvasCnt.offsetHeight;
    this.canvasCnt.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
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
    this.btnsMode = [...document.querySelectorAll(".paint-buttons-cnt .button-mode")];

    //dla przycisku z trybem draw dodajemy klasę active
    this.btnsMode.filter(function(el) {
      return el.dataset.mode === "draw"
    })[0].classList.add("active");
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

  bindControls() {
    //dla każdego elementu przypinamy metody bindem
    //bo chcemy w nich mieć dostęp do naszego obiektu paint
    this.sizeElem.addEventListener("change", this.changeSize.bind(this));
    this.sizeElem.addEventListener("input", this.changeSize.bind(this));

    this.colorElem.addEventListener("change", this.changeColor.bind(this))

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
        };
      });
    }
  }
}

new Paint();
