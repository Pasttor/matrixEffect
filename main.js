import './style.css';

//green  rgba(1,255,25);

const root = {
  wavecolor: {
    r: 1,
    g: 255,
    b: 25,
  },
  rainbowSpeed: 0.5,
  rainbow: false,
  matrixspeed: 100,
};

const c = document.getElementById('c');
const ctx = c.getContext('2d');

let hueFw = false;
let hue = -0.01;

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// the characters
const konkani =
  '゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・';
// converting the string into an array of single characters
const characters = konkani.split('');
const font_size = 14;
const columns = c.width / font_size; // number of columns for the rain
// an array of drops - one per column
const drops = Array.from({ length: columns }, () => 1);

// drawing the characters
function draw() {
  // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
  // translucent BG to show trail

  ctx.fillStyle = 'rgba(0,0,0, 0.05)';
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.font = `${font_size}px arial`;

  // looping over drops
  for (let i = 0; i < drops.length; i++) {
    // background color
    ctx.fillStyle = 'rgba(10,10,10, 1)';

    // Set the glow effect
    ctx.shadowColor = 'green'; // el color del resplandor
    ctx.shadowBlur = 10; // intensidad del resplandor

    const text = characters[Math.floor(Math.random() * characters.length)];
    const x = i * font_size;
    const y = drops[i] * font_size;

    if (root.rainbow) {
      hue += hueFw ? 0.01 : -0.01;
      const rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
      const rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
      const rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
      ctx.strokeStyle = `rgba(${rr},${rg},${rb})`;
    } else {
      ctx.strokeStyle = `rgba(${root.wavecolor.r},${root.wavecolor.g},${root.wavecolor.b})`;
    }

    ctx.lineWidth = 2; // Ajusta el grosor del trazo según tus preferencias
    ctx.strokeText(text, x, y);

    // Incrementing Y coordinate
    drops[i]++;
    // sending the drop back to the top randomly after it has crossed the screen
    // adding randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;

    // Reset the shadow after drawing each character
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }
}

setInterval(draw, root.matrixspeed);

function livelyPropertyListener(name, val) {
  switch (name) {
    case 'matrixColor':
      root.wavecolor = hexToRgb(val);
      break;
    case 'rainBow':
      root.rainbow = val;
      break;
    case 'rainbowSpeed':
      root.rainbowSpeed = val / 100;
      break;
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
