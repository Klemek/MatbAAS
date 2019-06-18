const parts = [0, 132, 236, 320, 395, 440, 490, 540, 600, 650, 700, 750, 800, 320, 360]; //last 2 is half n = r

const randItem = list => list[Math.floor(Math.random() * list.length)];

const letters = {
  'a': [{p: 2, f: [0, 0]}],
  'b': [{p: 8, f: [0, 0]}, {p: 4, f: [1, 0]}],
  'c': [],
  'd': [{p: 4, f: [0, 0]}, {p: 8, f: [1, 0]}],
  'e': [{p: 1, f: [0, 0]}, {p: 7, f: [0, 0]}],
  'f': [{p: 5, f: [0, 1]}],
  'g': [],
  'h': [{p: 6, f: [0, 0]}],
  'i': [{p: 10, f: [0, 0]}], //replaced by y
  'j': [],
  'k': [],
  'l': [],
  'm': [{p: 0, f: [0, 0]}, {p: 0, f: [1, 0]}],
  'n': [{p: 3, f: [0, 0]}],
  'o': [{p: 9, f: [0, 0]}],
  'p': [{p: 8, f: [0, 1]}, {p: 4, f: [1, 1]}],
  'q': [{p: 4, f: [0, 1]}, {p: 8, f: [1, 1]}],
  'r': [{p: 13, f: [0, 0]}], // half n
  's': [{p: 11, f: [0, 0]}],
  't': [{p: 5, f: [0, 0]}],
  'u': [{p: 3, f: [0, 1]}],
  'v': [],
  'w': [{p: 0, f: [0, 1]}, {p: 0, f: [1, 1]}],
  'x': [],
  'y': [{p: 10, f: [0, 0]}],
  'z': [],
  ' ': []
};


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('text');
const img = new Image();

function draw() {
  const cw = canvas.width = document.body.offsetWidth;
  const ch = canvas.height = document.body.offsetHeight * 0.83;
  const iw = img.width;
  const ih = img.height;
  const ratio = iw / ih;
  const cx = cw / 2;
  const step = ch / 4;
  const hstep = ratio * step;
  const margin = ch / 80;
  const spaces = 50 * hstep / iw;
  const fontsize = ch / 25;
  ctx.font = fontsize + 'px Arial';
  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, cw, ch);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000';

  ctx.drawImage(img, cx - hstep / 2, 0, hstep, step);
  ctx.fillText('Me and the boys', cx, step + fontsize);
  for (let i = 0; i < parts.length - 1; i++) {
    const sw = parts[i + 1] - parts[i];
    const dx = cx - hstep / 2 - margin * (parts.length / 2 - 1 - i) + parts[i] * hstep / iw;
    const dw = hstep * sw / iw;
    ctx.drawImage(img, parts[i], 0, sw, ih, dx, step * 1.5, dw, step);
    ctx.fillText('Meandtheboys'[i], dx + dw / 2, step * 2.5 + fontsize);
  }

  let text = input.value.toLowerCase().replace(/[^a-z ]/, '').trim();
  const out = [];
  let total = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const p = randItem(letters[c]);
    out.push(p ? p : {});
    total += p ? (parts[p.p + 1] - parts[p.p]) * hstep / iw : spaces;
  }
  total += (text.length - 1) * margin;

  ctx.strokeStyle = '#f00';

  let sum = 0;
  for (let i = 0; i < out.length; i++) {
    const p = out[i];
    const dx = cx - total / 2 + sum + margin;
    if (p.p !== undefined) {
      let sw = parts[p.p + 1] - parts[p.p];
      const dw = hstep * sw / iw;
      ctx.save();
      ctx.translate(dx + dw / 2, step * 3.5);
      ctx.scale(p.f[0] ? -1 : 1, p.f[1] ? -1 : 1);
      ctx.drawImage(img, parts[p.p], 0, sw, ih, -dw / 2, -step / 2, dw, step);
      sum += margin + dw;
      ctx.restore();
    } else if (text[i] !== ' ') {
      ctx.strokeRect(dx, step * 3, spaces, step);
      ctx.fillText(text[i].toUpperCase(), dx + spaces / 2, step * 3.5 + fontsize / 2);
      sum += margin + spaces;
    } else {
      sum += margin + spaces;
    }
  }

}

img.src = './matb.png';
img.onload = draw;
window.onresize = draw;
input.oninput = draw;
