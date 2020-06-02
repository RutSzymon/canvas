const parentCnt = document.querySelector("#cnt7");

const generate = function(range) {
  range = Number(range);
  const canvas = parentCnt.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 70, 0, angleToRadian(range));
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.font = "italic 14px Arial";
  ctx.textAlign = "start";
  ctx.textBaseline = "top";
  ctx.fillText(`ctx.arc(canvas.width/2, canvas.height/2, 70, 0, angleToRadian(${range}))`, 20, 20);
};

const range = parentCnt.querySelector("input[type=range]");

generate(range.value);

range.addEventListener("input", function() {
  generate(range.value);
});
