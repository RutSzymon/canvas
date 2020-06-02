const parentCnt = document.querySelector("#cnt6");

const generate = function(alignH, alignV) {
  const canvas = parentCnt.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  ctx.lineWidth = 0.5;
  ctx.closePath();
  ctx.stroke();

  ctx.font = "italic bold 50px Arial";

  ctx.textAlign = alignH;
  ctx.textBaseline = alignV;
  ctx.fillText("Psy i koty są fajne", canvas.width / 2, canvas.height / 2);
}

generate();

const selectH = parentCnt.querySelector("#selectHorizontal");
const selectV = parentCnt.querySelector("#selectVertical");

selectH.addEventListener("change", function() {
  generate(selectH.value, selectV.value);
});
selectV.addEventListener("change", function() {
  generate(selectH.value, selectV.value);
});