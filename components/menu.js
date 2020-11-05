const MenuItem = require('./menuItem');
const { INPUTS, MENU_TYPES } = require('./constants');
const { incrementOrWrap, decrementOrWrap } = require('../utils');

class Menu extends MenuItem {
  constructor({
    menuItems = [],
    playerColors = [],
    type = MENU_TYPES.COLUMN,
  } = {}) {
    super();

    this.playerColors = playerColors;
    this.type = type;
    if (type === MENU_TYPES.GRID) {
      const rows = menuItems.length;
      const cols = Math.max(...menuItems.map(x => x.length));
      this.menuItems = menuItems.reduce((items, row, r) => {
        return [...items, row.map((item, c) => ({
          ...item,
          row: r,
          col: c,
        }))]
      }, []);
    } else {
      this.menuItems = menuItems;
    }

    this.inputDelay = 0;
    this.hoveredMenuItems = [];
    this.active = false;
  }

  hover(player = 0) {
  }

  activate(player = 0) {
    this.menuItems[0].hover(player);
    this.hoveredMenuItems[player] = 0;
    this.active = true;
  }

  addMenuItem(item) {
    this.menuItems.push(item);
  }

  handleInput(input, player = 0) {
    const index = this.hoveredMenuItems[player];
    let nextindex;
    switch (input) {
      case INPUTS.UP:
        if (this.type === MENU_TYPES.ROW) return;
        if (this.type === MENU_TYPES.COLUMN) {
          nextindex = decrementOrWrap(index, this.menuItems.length);
        }
        break;
      case INPUTS.DOWN:
        if (this.type === MENU_TYPES.ROW) return;
        if (this.type === MENU_TYPES.COLUMN) {
          nextindex = incrementOrWrap(index, this.menuItems.length);
        }
        break;
      case INPUTS.LEFT:
        if (this.type === MENU_TYPES.COLUMN) return;
        if (this.type === MENU_TYPES.ROW) {
          nextindex = decrementOrWrap(index, this.menuItems.length);
        }
        break;
      case INPUTS.RIGHT:
        if (this.type === MENU_TYPES.COLUMN) return;
        if (this.type === MENU_TYPES.ROW) {
          nextindex = incrementOrWrap(index, this.menuItems.length);
        }
        break;
      case INPUTS.ACCEPT:
        if (this.active) {
          this.menuItems[index].handleInput(input, player);
        } else {
          this.activate(player);
        }
        break;
    }
    if (nextindex !== undefined) {
      const current = this.menuItems[index];
      const next = this.menuItems[nextindex];
      current.leave(player);
      next.hover(player);
      this.hoveredMenuItems[player] = nextindex;
    }
  }

  draw(...args) {
    this.menuItems.forEach(i => i.draw(...args));
  }
}

module.exports = Menu;