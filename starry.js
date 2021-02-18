const { body } = document;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
const dl = Math.floor(Math.min(w, h) / (Math.min(w, h) > 600 ? 47 : 37));

const dt = 1000 / 12;

function render(x, y) {
  let rd = Math.random();

  rd *= 250 * Math.exp(y / h) ** 2;

  if (rd < 1 / 2) ctx.fillStyle = "white";
  else ctx.fillStyle = "#00000040";
  ctx.fillRect(Math.floor(x + (w % dl) / 2), y, dl, dl);
}

function motion() {
  for (let x = 0; x < w - dl; x += dl) {
    for (let y = 0; y < h - dl; y += dl) render(x, y);
  }
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
}

// Init
body.style.backgroundColor = "black";
canvas.width = w;
canvas.height = h;
clearCanvas();

let renderInterval = setInterval(motion, dt);

let pause = false;
canvas.onclick = () => {
  if (pause) {
    renderInterval = setInterval(motion, dt);
  } else {
    clearInterval(renderInterval);
  }
  pause = !pause;
};

canvas.ondblclick = clearCanvas;
