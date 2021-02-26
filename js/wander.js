const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
const dl = Math.floor(Math.min(w, h) / (Math.min(w, h) > 600 ? 17 : 7));

const dt = 1000 / 12;

const dc = 8;
let r = 128;
let g = 128;
let b = 128;

let x = w / 2;
let y = h / 2;

function incr(num, d, max) {
  if (num + d >= max) return num - d;
  return num + d;
}

function decr(num, d, min = 0) {
  if (num - d <= min) return num + d;
  return num - d;
}

function render() {
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(Math.floor(x - dl / 2), Math.floor(y - dl / 2), dl, dl);
}

function motion() {
  render();

  let rd = Math.random();

  if (rd < 1 / 6) r = incr(r, dc, 255);
  else if (rd < 2 / 6) r = decr(r, dc);
  else if (rd < 3 / 6) g = incr(g, dc, 255);
  else if (rd < 4 / 6) g = decr(g, dc);
  else if (rd < 5 / 6) b = incr(b, dc, 255);
  else b = decr(b, dc);

  rd = Math.random();
  if (rd < 1 / 4) x = incr(x, dl, w - dl);
  else if (rd < 2 / 4) x = decr(x, dl, dl);
  else if (rd < 3 / 4) y = incr(y, dl, h - dl);
  else y = decr(y, dl, dl);
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
}

// Init
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
