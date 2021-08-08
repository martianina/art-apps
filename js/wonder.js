const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const minWH = Math.min(window.innerWidth, window.innerHeight);
const n = 5;
const dc = 8;
const dt = 1000 / 24;
const dl = Math.floor(minWH / (n + 2));
let x = 2;
let y = 2;
let r = 256 / dc / 2;
let g = 256 / dc / 2;
let b = 256 / dc / 2;

const incr = (num, d, max) => (num + d <= max ? num + d : num);
const decr = (num, d, min = 0) => (min <= num - d ? num - d : num);
const changeColor = () => {
  const rd = Math.random();

  if (rd < 1 / 6) r = incr(r, 1, 256 / dc);
  else if (rd < 2 / 6) r = decr(r, 1);
  else if (rd < 3 / 6) g = incr(g, 1, 256 / dc);
  else if (rd < 4 / 6) g = decr(g, 1);
  else if (rd < 5 / 6) b = incr(b, 1, 256 / dc);
  else b = decr(b, 1);
};
const changeLocation = () => {
  const rd = Math.random();

  if (rd < 1 / 4) x = incr(x, 1, n - 1);
  else if (rd < 2 / 4) x = decr(x, 1, 0);
  else if (rd < 3 / 4) y = incr(y, 1, n - 1);
  else y = decr(y, 1, 0);
};
const motion = () => {
  ctx.fillStyle = `rgb(${r * dc},${g * dc},${b * dc})`;
  ctx.fillRect(x * dl, y * dl, dl, dl);
  changeColor();
  changeLocation();
};

const printCanvas = () => {
  const link = document.createElement("a");

  if (minWH > 600) link.download = `wonder${Date.now()}.png`;
  canvas.toBlob((blob) => {
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  });
};

const main = () => {
  canvas.width = dl * n;
  canvas.height = dl * n;
  document.body.appendChild(canvas);

  setInterval(motion, dt);
  canvas.ondblclick = printCanvas;
};

main();
