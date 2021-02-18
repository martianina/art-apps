const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
const n = w > 600 ? 17 : 7;
const dw = Math.floor(window.innerWidth / (2 * n + 1));
const margin = (w - dw * (2 * n + 1)) / 2;

const pos = [];
for (let i = 0; i < n; i += 1) pos[i] = (2 * i + 1) * dw;
for (let i = n; i < 2 * n - 1; i += 1) pos[i] = pos[2 * n - i - 2];

const dc = 16;
let r = 128;
let g = 128;
let b = 128;

function incr(num) {
  if (num + dc >= 255) return num - dc;
  return num + dc;
}

function decr(num) {
  if (num - dc <= 0) return num + dc;
  return num - dc;
}

let x = 0;
function render() {
  ctx.save();
  ctx.translate(margin, margin + dw);

  ctx.fillStyle = "white";
  ctx.fillRect(pos[x] - 1, -1, dw + 2, h - (margin + dw) * 2 + 2);

  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(pos[x], 0, dw, h - (margin + dw) * 2);

  ctx.restore();

  if (x === 2 * n - 3) x = 0;
  else x += 1;
}

function motion() {
  render();

  const six = Math.random();

  if (six < 1 / 6) r = incr(r);
  else if (six < 2 / 6) r = decr(r);
  else if (six < 3 / 6) g = incr(g);
  else if (six < 4 / 6) g = decr(g);
  else if (six < 5 / 6) b = incr(b);
  else b = decr(b);
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
}

// Init
canvas.width = w;
canvas.height = h;

clearCanvas();

let renderInterval = setInterval(motion, 1000 / 12);

let pause = false;
canvas.onclick = () => {
  if (pause) {
    renderInterval = setInterval(motion, 1000 / 12);
  } else {
    clearInterval(renderInterval);
  }
  pause = !pause;
};

canvas.ondblclick = () => {
  clearCanvas();
};
