const parentCnt = document.querySelector("#arcTo");
const canvas = parentCnt.querySelector("canvas");
const ctx = canvas.getContext("2d");
const points = [];
const h = canvas.height - 60;
points.push({x : 400, y : h});
points.push({x: 300, y : h-150});

const generate = function(range) {
  range = Number(range);

  const cp1x = points[0].x;
  const cp1y = points[0].y;
  const cp2x = points[1].x;
  const cp2y = points[1].y;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.beginPath();
  ctx.setLineDash([5,5]);
  ctx.strokeStyle = "#aaa";
  ctx.moveTo(200, h);
  ctx.lineTo(cp1x, cp1y);
  ctx.lineTo(cp2x, cp2y);
  ctx.stroke();
  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(30, h);
  ctx.lineTo(200, h);
  ctx.arcTo(cp1x, cp1y, cp2x, cp2y, range);
  ctx.stroke();

  ctx.save();
  ctx.fillStyle = "red";
  ctx.beginPath();

  ctx.textBaseline = "middle";
  ctx.textAlign = "start";
  ctx.font = "10px Arial";
  ctx.fillText("x1,y1", cp1x + 15, cp1y);
  ctx.arc(cp1x, cp1y, 10, 0, angleToRadian(360));
  ctx.fill();
  ctx.fillStyle = "blue";
  ctx.beginPath();

  ctx.textBaseline = "middle";
  ctx.textAlign = "start";
  ctx.font = "10px Arial";
  ctx.fillText("x2,y2", cp2x + 15, cp2y);
  ctx.arc(cp2x, cp2y, 10, 0, angleToRadian(360));
  ctx.fill();
  ctx.restore();
};

const range = parentCnt.querySelector("input[type=range]");

generate(range.value);

range.addEventListener("input", function() {
  generate(range.value);
});

canvas.addEventListener("mousedown", function(e) {
  const x = e.pageX - this.offsetLeft;
  const y = e.pageY - this.offsetTop;

  if (e.button === 0) {
      points[0] = {x, y}
  } else {
      points[1] = {x, y}
  }
  generate();
});
canvas.addEventListener("contextmenu", function() {
  return false;
})