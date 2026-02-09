let _audioSplatType = 0;
let _volumeExceedThreshold = 0.8;
let _volumeAmbientThreshold = 0.1;
let _ambientSplatInterval = 3000;

let volumeAmbientThresholdTimeout = 0;
let isTickingAmbientVolume = false;

// Berserker rage
let simpleBands = {
  bassSplats: [
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.85),
      new Location(Range.fromValue(0.4), Range.fromValue(0.5)),
      Rotation.fromValue(180),
      [
        new SimpleBand(new Colour(Range.fromZero(), Range.fromValue(0.35), Range.fromValue(1)), new Velocity(0.85))
      ]
    ),
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.85),
      new Location(Range.fromValue(0.6), Range.fromValue(0.5)),
      Rotation.fromValue(0),
      [
        new SimpleBand(new Colour(Range.fromZero(), Range.fromValue(0.35), Range.fromValue(1)), new Velocity(0.85))
      ]
    )
  ],
  midRangeSplats: [
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.5),
      new Location(new Range(0.5, 0, 0), new Range(0.35, 0, 0)),
      Rotation.fromValue(-90)
    ),
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.5),
      new Location(new Range(0.5, 0, 0), new Range(0.65, 0, 0)),
      Rotation.fromValue(90)
    ),
  ],
  highSplats: [
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), new Range(0.75, 0.7, 0.8)),
      Velocity.fromValue(0.25),
      new Location(new Range(0.1, 0.1, 0.4), new Range(0.3, 0.1, 0.4)),
      new Rotation(0, 0, 360)
    ),
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), new Range(0.75, 0.7, 0.8)),
      Velocity.fromValue(0.25),
      new Location(new Range(0.3, 0.1, 0.4), new Range(0.8, 0.6, 0.9)),
      new Rotation(0, 0, 360)
    ),
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), new Range(0.75, 0.7, 0.8)),
      Velocity.fromValue(0.25),
      new Location(new Range(0.8, 0.6, 0.9), new Range(0.3, 0.1, 0.4)),
      new Rotation(0, 0, 360)
    ),
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), new Range(0.75, 0.7, 0.8)),
      Velocity.fromValue(0.25),
      new Location(new Range(0.8, 0.6, 0.9), new Range(0.8, 0.6, 0.9)),
      new Rotation(0, 0, 360)
    )
  ],
};

let fullBands = {
  subSplats: [
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.66),
      new Location(new Range(0.1, 0, 0), new Range(0.1, 0, 0)),
      Rotation.fromValue(0)
    ),
    new Band(
      new Colour(new Range(0, 0, 0.05), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.66),
      new Location(new Range(0.9, 0, 0), new Range(0.1, 0, 0)),
      Rotation.fromValue(180)
    )
  ],
  bassSplats: [
    new Band(
      new Colour(new Range(0.1, 0.1, 0.2), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.4),
      new Location(new Range(0, 0, 0), new Range(0.15, 0, 0)),
      Rotation.fromValue(90)
    ),
    new Band(
      new Colour(new Range(0.1, 0.1, 0.2), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.4),
      new Location(new Range(1, 0, 0), new Range(0.15, 0, 0)),
      Rotation.fromValue(90)
    )
  ],
  lowMidRangeSplats: [
    new Band(
      new Colour(new Range(0.65, 0.6, 0.7), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.5),
      new Location(new Range(0.5, 0, 0), new Range(0.45, 0, 0)),
      Rotation.fromValue(-90)
    )
  ],
  midRangeSplats: [
    new Band(
      new Colour(new Range(0.55, 0.5, 0.6), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.5),
      new Location(new Range(0.5, 0, 0), new Range(0.55, 0, 0)),
      Rotation.fromValue(90)
    )
  ],
  upperMidRangeSplats: [
    new Band(
      new Colour(new Range(0.65, 0.6, 0.7), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.66),
      new Location(new Range(0.1, 0, 0), new Range(0.9, 0, 0)),
      Rotation.fromValue(0)
    ),
    new Band(
      new Colour(new Range(0.65, 0.6, 0.7), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.66),
      new Location(new Range(0.9, 0, 0), new Range(0.9, 0, 0)),
      Rotation.fromValue(180)
    ),
  ],
  presenceSplats: [
    new Band(
      new Colour(new Range(0.75, 0.7, 0.8), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.4),
      new Location(new Range(0, 0, 0), new Range(0.85, 0, 0)),
      Rotation.fromValue(-90)
    ),
    new Band(
      new Colour(new Range(0.75, 0.7, 0.8), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.4),
      new Location(new Range(1, 0, 0), new Range(0.85, 0, 0)),
      Rotation.fromValue(-90)
    )
  ],
  brillianceSplats: [
    new Band(
      new Colour(new Range(0.8, 0.7, 0.9), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(1),
      new Location(new Range(0, 0.3, 0.7), new Range(0)),
      new Rotation(180, 0, 360)
    ),
    new Band(
      new Colour(new Range(0.8, 0.7, 0.9), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(1),
      new Location(new Range(0, 0.3, 0.7), new Range(0)),
      new Rotation(180, 0, 360)
    )
  ],
};



let volumeBands = {
  exceed: [],
  ambient: [
    new Band(
      new Colour(new Range(), Range.fromValue(1), Range.fromValue(1)), Velocity.fromValue(0.33),
      new Location(new Range(0.1, 0.1, 0.9), new Range(0.1, 0.1, 0.9)),
      new Rotation(180, 0, 360),
      [
        new SimpleBand(
          new Colour(new Range(), Range.fromValue(1), Range.fromValue(1)),
          Velocity.fromValue(0.33)
        ),
        new SimpleBand(
          new Colour(new Range(), Range.fromValue(1), Range.fromValue(1)),
          Velocity.fromValue(0.33)
        )
      ]
    ),
    new Band(
      new Colour(new Range(), Range.fromValue(1), Range.fromValue(1)),
      Velocity.fromValue(0.33),
      new Location(new Range(0.1, 0.1, 0.9), new Range(0.1, 0.1, 0.9)),
      new Rotation(180, 0, 360),
      [
        new SimpleBand(
          new Colour(new Range(), Range.fromValue(1), Range.fromValue(1)),
          Velocity.fromValue(0.33)
        ),
        new SimpleBand(
          new Colour(new Range(), Range.fromValue(1), Range.fromValue(1)),
          Velocity.fromValue(0.33)
        )
      ]
    )
  ]
};

let simpleDeltas = {
  bass: initLastTick(),
  midRange: initLastTick(),
  high: initLastTick(),
};

let fullDeltas = {
  subBass: initLastTick(),
  bass: initLastTick(),
  lowMidRange: initLastTick(),
  midRange: initLastTick(),
  upperMidRange: initLastTick(),
  presence: initLastTick(),
  brilliance: initLastTick(),
};

function splatBand(array = [], volume = 0.5) {
  if (array.length === 0) {
    return;
  }

  const safeVolume = ((1 + volume) * 100) * 4;
  for (let i = 0; i < array.length; i++) {
    const val = array[i];

    const location = val.location.calc();
    const colour = val.colour.calcRgb();
    const velocity = val.velocity.calc() * safeVolume;
    const rotation = val.rotation.calc();

    const xRotation = Math.cos(d2r(rotation));
    const yRotation = Math.sin(d2r(rotation));

    splat(location.x, location.y, xRotation * velocity, yRotation * velocity, colour);


    // Splat each layer
    for (let j = 0; j < val.layers.length; j++) {
      const layer = val.layers[j];

      const layerColour = layer.colour.calcRgb();
      const layerVelocity = layer.velocity.calc() * safeVolume;

      const layerX = calcLayerPos(location.x, xRotation, i);
      const layerY = calcLayerPos(location.y, yRotation, i);

      splat(layerX, layerY, xRotation * layerVelocity, yRotation * layerVelocity, layerColour);
    }
  }
}

function bandVolume(audio = [0]) {
  const sum = audio.reduce((a, b) => (a + b));
  const average = sum / audio.length;
  const max = Math.max.apply(false, audio);

  return (average + max) / 2;
}


function calcTickAudio(array = [], volume = 0, lastTick = initLastTick(), threshold = 0.05, minVolumeChange = 0.03) {
  if (array.length !== 0 && volume !== 0) {

    if (volume - lastTick.lastVolume > minVolumeChange) {
      splatBand(array, volume);
    }

    return {lastVolume: volume};
  }

  return initLastTick();
}

function limitMaxToOne(audio = [0]) {
  const maxValue = Math.max.apply(false, audio);

  if (maxValue > 1) {
    const multiplier = 1 / maxValue;
    return audio.map(x => x * multiplier);
  }

  return audio;
}

function minFromPercent(length = 1, percent = 0.03) {
  return Math.max(Math.floor(length * percent), 1);
}

function tickSimpleAudio(audio = [0]) {
  /* Bass = 0% - 20% (20%)
   * Mid = 20% - 55% (35%)
   * Highs = 55% - 100% (45%) */

  const bassCutOff = Math.floor(audio.length * 0.2);
  const midCutOff = bassCutOff + Math.floor(audio.length * 0.35);

  // Get audio frequencies
  const overlap = Math.floor(audio.length * 0.05);
  let bassAudio = audio.slice(0, bassCutOff + overlap);
  let midAudio = audio.slice(bassCutOff - overlap, midCutOff + overlap);
  let highAudio = audio.slice(midCutOff - overlap, audio.length);

  // Limit max to 1
  bassAudio = limitMaxToOne(bassAudio);
  midAudio = limitMaxToOne(midAudio);
  highAudio = limitMaxToOne(highAudio);

  // Calculate band volume
  const bassVolume = bandVolume(bassAudio);
  const midRangeVolume = bandVolume(midAudio);
  const highVolume = bandVolume(highAudio);

  // Min volume change
  const bassMinVolumeChange = 7.5 / 1000;
  const midMinVolumeChange = 6.75 / 1000;
  const highMinVolumeChange = 5 / 1000;

  // Tick
  simpleDeltas.bass = calcTickAudio(simpleBands.bassSplats, bassVolume, simpleDeltas.bass, 0.1, bassMinVolumeChange);
  simpleDeltas.midRange = calcTickAudio(simpleBands.midRangeSplats, midRangeVolume, simpleDeltas.midRange, 0.075, midMinVolumeChange);
  simpleDeltas.high = calcTickAudio(simpleBands.highSplats, highVolume, simpleDeltas.high, 0.05, highMinVolumeChange);
}

function tickFullAudio(audio = [0]) {
  /* Sub-Bass = 0% - 3% (3%)
   * Bass = 3% - 11% (8%)
   * LowMid = 11% - 23% (12%)
   * Mid = 23% - 39% (16%)
   * UpperMid = 39% - 58% (19%)
   * Presence = 58% - 82% (24%)
   * Brilliance = 82% - 100% (18%)
   */

  const subBassCutOff = minFromPercent(audio.length, 0.03);
  const bassCutOff = subBassCutOff + minFromPercent(audio.length, 0.08);
  const lowMidCutOff = bassCutOff + minFromPercent(audio.length, 0.12);
  const midCutOff = lowMidCutOff + minFromPercent(audio.length, 0.16);
  const upperMidCutOff = midCutOff + minFromPercent(audio.length, 0.19);
  const presenceMidCutOff = upperMidCutOff + minFromPercent(audio.length, 0.24);
  const brillianceMidCutOff = presenceMidCutOff + minFromPercent(audio.length, 0.18);

  // Get audio frequencies
  const overlap = minFromPercent(audio.length, 0.03);
  let subBassAudio = audio.slice(0, subBassCutOff + overlap);
  let bassAudio = audio.slice(bassCutOff - overlap, lowMidCutOff + overlap);
  let lowMidAudio = audio.slice(lowMidCutOff - overlap, midCutOff + overlap);
  let midAudio = audio.slice(midCutOff - overlap, upperMidCutOff + overlap);
  let upperMidAudio = audio.slice(upperMidCutOff - overlap, presenceMidCutOff + overlap);
  let presenceAudio = audio.slice(presenceMidCutOff - overlap, brillianceMidCutOff + overlap);
  let brillianceAudio = audio.slice(brillianceMidCutOff - overlap, audio.length);

  // Limit max to 1
  subBassAudio = limitMaxToOne(subBassAudio);
  bassAudio = limitMaxToOne(bassAudio);
  lowMidAudio = limitMaxToOne(lowMidAudio);
  midAudio = limitMaxToOne(midAudio);
  upperMidAudio = limitMaxToOne(upperMidAudio);
  presenceAudio = limitMaxToOne(presenceAudio);
  brillianceAudio = limitMaxToOne(brillianceAudio);

  // Calculate band volume
  const subBassVolume = bandVolume(subBassAudio);
  const bassVolume = bandVolume(bassAudio);
  const lowMidVolume = bandVolume(lowMidAudio);
  const midVolume = bandVolume(midAudio);
  const upperMidVolume = bandVolume(upperMidAudio);
  const presenceVolume = bandVolume(presenceAudio);
  const brillianceVolume = bandVolume(brillianceAudio);

  // Min volume change
  const bassMinVolumeChange = 7.5 / 1000;
  const midMinVolumeChange = 6.75 / 1000;
  const highMinVolumeChange = 5 / 1000;

  // Tick
  fullDeltas.subBass = calcTickAudio(fullBands.subSplats, subBassVolume, fullDeltas.subBass, 0.1, bassMinVolumeChange);
  fullDeltas.bass = calcTickAudio(fullBands.bassSplats, bassVolume, fullDeltas.bass, 0.1, bassMinVolumeChange);
  fullDeltas.lowMidRange = calcTickAudio(fullBands.lowMidRangeSplats, lowMidVolume, fullDeltas.lowMidRange, 0.075, midMinVolumeChange);
  fullDeltas.midRange = calcTickAudio(fullBands.midRangeSplats, midVolume, fullDeltas.midRange, 0.075, midMinVolumeChange);
  fullDeltas.upperMidRange = calcTickAudio(fullBands.upperMidRangeSplats, upperMidVolume, fullDeltas.upperMidRange, 0.075, midMinVolumeChange);
  fullDeltas.presence = calcTickAudio(fullBands.presenceSplats, presenceVolume, fullDeltas.presence, 0.05, highMinVolumeChange);
  fullDeltas.brilliance = calcTickAudio(fullBands.brillianceSplats, brillianceVolume, fullDeltas.brilliance, 0.05, highMinVolumeChange);
}

function tickExceedingVolumeAudio() {
  splatBand(volumeBands.exceed, 5);
}


function tickAmbientVolumeAudio() {
  splatBand(volumeBands.ambient, 5);
}

function ambientAudioSplats(newIsTickingAmbient = false) {
  isTickingAmbientVolume = newIsTickingAmbient;

  if (!isTickingAmbientVolume) {
    clearTimeout(volumeAmbientThresholdTimeout);
    volumeAmbientThresholdTimeout = 0;
    return;
  }

  tickAmbientVolumeAudio();
  volumeAmbientThresholdTimeout = setTimeout(() => ambientAudioSplats(true), _ambientSplatInterval);
}
