import {
  keysRU, codes, notPrint, keysUpRU, keysEn, keysUpEn,
}
  from './constants.js';

export default class Keyboard {
  constructor() {
    this.currentKeys = keysUpEn;
    this.keyboard = '';
    this.row = '';
    this.key = '';
    this.span = '';
  }

  generateKeyboard() {
    this.keyboard = document.createElement('div');
    this.keyboard.className = 'keyboard';
    this.generateRows();
  }

  renderKeyboard(element) {
    element.append(this.keyboard);
  }

  generateRows() {
    for (let i = 0; i < 5; i += 1) { // generate 5 rows in keyboard
      this.row = document.createElement('div');
      this.row.classList.add('row');
      this.renderRows(this.keyboard);
      this.generateKeys(i);
    }
  }

  renderRows(element) {
    element.append(this.row);
  }

  generateKeys(index) {
    for (let j = 0; j < keysRU[index].length; j += 1) {
      this.key = document.createElement('div');
      this.key.classList.add('key');
      this.key.classList.add(codes[index][j]);
      this.renderKeys(this.row);

      this.generateText(index, j);
    }
  }

  renderKeys(element) {
    element.append(this.key);
  }

  generateText(ind1, ind2) {
    this.span = document.createElement('span');
    this.renderText(this.key, ind1, ind2);
  }

  renderText(element, ind1, ind2) {
    element.append(this.span);
    this.span.innerHTML = this.currentKeys[ind1][ind2];
    if (notPrint.includes(this.currentKeys[ind1][ind2])) {
      element.classList.add('notPrint');
    } else {
      element.classList.add('print');
    }
  }
}
