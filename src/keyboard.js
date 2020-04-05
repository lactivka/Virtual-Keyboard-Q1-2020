import {
  keysRU, codes, notPrint, keysRUUp, keysEn, keysEnUp,
}
  from './constants.js';

export default class Keyboard {
  constructor() {
    this.currentKeys = '';
    this.keyboard = '';
    this.row = '';
    this.key = '';
    this.span = '';
    this.pressedKey = '';
    this.isAvailable = true;
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
    for (let j = 0; j < this.currentKeys[index].length; j += 1) {
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

  addPressed(key) {
    this.pressedKey = key;
    this.pressedKey.classList.add('pressed');
  }

  togglePressed(key) {
    this.pressedKey = key;
    this.pressedKey.classList.toggle('pressed');
  }

  changeLang() {
    const renderedRows = document.querySelectorAll('.row');

    this.currentKeys = this.currentKeys[0][0] === keysEn[0][0] ? keysRU : keysEn;
    /* renderedRows.forEach((el, i) => {
      Array.from(el.querySelectorAll('span')).forEach((elem, j) => {

        elem.innerHTML = this.currentKeys[i][j];
      });

    }); */
    for (let i = 0; i < renderedRows.length; i += 1) {
      const array = renderedRows[i].querySelectorAll('span');
      for (let j = 0; j < array.length; j += 1) {
        array[j].innerHTML = this.currentKeys[i][j];
      }
    }
  }
}
