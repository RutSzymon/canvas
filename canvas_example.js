const parentCnt = document.querySelector("#canvasExample");
const canvas = parentCnt.querySelector("canvas");
const ctx = canvas.getContext("2d");

const generate = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const step = 50;
  const howMany = canvas.width / step;

  for (let i=1; i<howMany; i++) {
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(i * step, 0);
    ctx.lineTo(i * step, canvas.height);
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4,4]);
    ctx.strokeStyle = "#ddd";
    ctx.stroke();

    const y = rand(20, canvas.height-20);

    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 6;

    ctx.beginPath();
    ctx.arc(i * step, y, 15, 0, angleToRadian(360));

    const gx = i*step - 15;
    const gStartY = y - 15;
    const gEndY = y + 15;
    const gradient = ctx.createLinearGradient(gx, gStartY, gx, gEndY);
    gradient.addColorStop(0, "orange");
    gradient.addColorStop(1, "orangered");

    ctx.fillStyle = gradient;

    ctx.fill();
    ctx.stroke();

    ctx.restore();

    ctx.font = "bold 55px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "medium";
    ctx.fillStyle = "rgba(0,0,0,0.01)";
    ctx.fillText("Koraliki", canvas.width / 2, canvas.height / 2 );
  }
};

generate();

parentCnt.querySelector("button").addEventListener("click", function() {
  generate();
})