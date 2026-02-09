class Range {
  constructor(value = 0.5, min = 0, max = 1, force = false) {
    this.min = min;
    this.max = max;
    this.value = value;
    this.force = force;
  }

  static fromValue(value) {
    return new Range(value, 0, 0, true);
  }

  static fromZero() {
    return new Range(0, 0, 0, true);
  }

  hasRange() {
    if (this.force) {
      return false;
    }

    return this.max - this.min > 0.001;
  }

  calc() {
    if (!this.hasRange()) {
      return this.value;
    }

    return Math.random() * (this.max - this.min) + this.min;
  }
}


class Rotation extends Range {
}

class Velocity extends Range {
}


class Location {
  constructor(x = new Range(), y = new Range()) {
    this.x = x;
    this.y = y;
  }

  calcX() {
    return this.x.calc();
  }

  calcY() {
    return this.y.calc();
  }

  calc() {
    return {
      x: this.calcX(),
      y: this.calcY()
    };
  }
}


class Colour {
  constructor(hue = new Range(), saturation = new Range(), value = new Range()) {
    this.hue = hue;
    this.saturation = saturation;
    this.value = value;
  }

  calc() {
    return {
      h: this.hue.calc(),
      s: this.saturation.calc(),
      v: this.value.calc()
    };
  }

  calcRgb() {
    const hsv = this.calc();
    return HsvToRgb(hsv.h, hsv.s, hsv.v);
  }
}


class SimpleBand {
  constructor(colour = new Colour(), velocity = new Velocity()) {
    this.colour = colour;
    this.velocity = velocity;
  }
}

class Band extends SimpleBand {
  constructor(
    colour = new Colour(), velocity = new Velocity(),
    location = new Location(), rotation = new Rotation(),
    layers = []
  ) {
    super(colour, velocity);
    this.location = location;
    this.rotation = rotation;
    this.layers = layers;
  }
}