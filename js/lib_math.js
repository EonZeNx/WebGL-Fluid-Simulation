function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function d2r(d) {
    return degreesToRadians(d);
}

function HsvToRgb(h, s, v) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }

    return {
        r,
        g,
        b
    };
}

function initLastTick() {
  return {lastVolume: 0};
}

function calcLayerPos(basePosition = 0, rotation = 0, index = 0) {
  return basePosition - (rotation / 3.14) * (0.15 * (index + 1));
}

async function loadPresetFromFile(filepath) {
  const relativePath = `.\\${filepath}`;

  return await fetch(relativePath)
    .then(res => res.json());
}