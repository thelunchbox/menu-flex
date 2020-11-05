class MenuItem {
  constructor({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    value = 0,
  } = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.value = value;
    this.hovered = [];

    this.center = {
      x: x + width / 2,
      y: y + height / 2,
    };
  }

  hover(player = 0) {
    this.hovered[player] = true;
  }

  leave(player = 0) {
    this.hovered[player] = false;
  }

  handleInput(input, player = 0) {
    throw new Error('Draw method not implemented in base MenuItem');
  }

  onValueChange(value) {
    console.warn('Unhandled onValueChange in', this);
  }

  setValue(value) {
    this.value = value;
    if (this.onValueChange) this.onValueChange(value);
  }

  draw() {
    throw new Error('Draw method not implemented in base MenuItem');
  }
}

module.exports = MenuItem;