let colorsMapping = {
  blue: '#0000ff',
  purple: '#800080',
  green: '#008000',
  red: '#ff0000'
};
let percentages = [...Array(101).keys()].filter(i => i % 5 === 0).reverse();
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  const input = document.getElementById('input');
  console.log(input.value);
  let color = colorsMapping[input.value.toLowerCase()];
  if (color) {
    render(color);
  } else {
    console.log('color not present in mapping');
    const colorGrid = document.getElementById('colorGrid');
    colorGrid.innerHTML = '';
  }
});

const render = color => {
  const colorGrid = document.getElementById('colorGrid');
  colorGrid.innerHTML = '';
  const [h, s, l] = convertToHsl(color);
  console.log([h, s, l]);
  for (let value of percentages) {
    let element = document.createElement('div');
    let percent = document.createElement('div');
    percent.className = 'side';
    percent.innerHTML = value + '%';
    element.appendChild(percent);
    element.className = 'color';
    let coloredDiv = document.createElement('div');
    coloredDiv.className = 'individualColor';
    coloredDiv.style.backgroundColor = `hsl(${h},${s}%,${value}%)`;
    element.appendChild(coloredDiv);
    let hexCode = document.createElement('div');
    hexCode.className = 'side sidelast';
    hexCode.innerHTML = hslToHex(h, s, value);
    element.appendChild(hexCode);
    colorGrid.appendChild(element);
  }
};

const convertToHsl = color => {
  const { r, g, b } = hexToRgb(color);
  return rgbToHsl(r, g, b);
};
const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    return {
      r,
      g,
      b
    };
  }
  return null;
};

const hslToHex = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const rgbToHsl = (r, g, b) => {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
};
