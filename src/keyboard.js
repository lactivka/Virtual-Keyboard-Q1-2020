import {
  keysRU, codes, notPrint, keysRUUp, keysEn, keysEnUp,
}
  from './constants.js';

export default class Keyboard {
  constructor() {
    this.currentKeys = '';
    this.currentKeysUp = '';
    this.keyboard = '';
    this.row = '';
    this.key = '';
    this.span = '';
    this.pressedKey = '';
    this.isAvailable = true;
    this.isCapsPressed = false;
    this.toUpper = false;
    this.printableKeys = '';
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

  // add class pressed to key to make it pressed
  addPressed(key) {
    this.pressedKey = key;
    this.pressedKey.classList.add('pressed');
  }

  // toggle class pressed
  togglePressed(key) {
    this.pressedKey = key;
    this.pressedKey.classList.toggle('pressed');
  }

  // change current language and render new value to keys on keyboard
  changeLang() {
    this.currentKeys = this.currentKeys[0][0] === keysEn[0][0] ? keysRU : keysEn;
    this.renderNewRows(this.currentKeys);
    if (this.toUpper) {
      for (let i = 0; i < this.printableKeys.length; i += 1) {
        this.printableKeys[i].querySelector('span').innerHTML = this.printableKeys[i].querySelector('span').innerHTML.toUpperCase();
      }
    }
  }

  // render new value to keys on keyboard from newRows parameter
  renderNewRows(newRows) {
    this.row = document.querySelectorAll('.row');
    for (let i = 0; i < this.row.length; i += 1) {
      const array = this.row[i].querySelectorAll('span');
      for (let j = 0; j < array.length; j += 1) {
        array[j].innerHTML = newRows[i][j];
      }
    }
  }

  // handle pressed keys that do not print symbol to textarea
  doNotPrintAction(key, textAreaObj) {
    this.pressedKey = key;

    // move cursor to new row when Enter is pressed
    if (this.pressedKey.classList.contains('Enter')) {
      textAreaObj.newRow();
    }

    // add 4 spaces to textarea when Tab is pressed
    if (this.pressedKey.classList.contains('Tab')) {
      textAreaObj.print('    ');
    }

    // delete symbol before cursor in textarea when Backspace is pressed
    if (this.pressedKey.classList.contains('Backspace')) {
      textAreaObj.delSymbol('prev');
    }

    // delete symbol after cursor in textarea when Delete is pressed
    if (this.pressedKey.classList.contains('Delete')) {
      textAreaObj.delSymbol('next');
    }

    // make symbols on keyboard keys uppercase when Shift is pressed
    if (this.pressedKey.classList.contains('ShiftLeft') || this.pressedKey.classList.contains('ShiftRight')) {
      this.currentKeysUp = this.currentKeys[0][0] === keysEn[0][0] ? keysEnUp : keysRUUp;
      this.renderNewRows(this.currentKeysUp);
      // make symbols on keyboard keys lowercase if CapsLock is pressed too
      if (this.toUpper) {
        for (let i = 0; i < this.printableKeys.length; i += 1) {
          this.printableKeys[i].querySelector('span').innerHTML = this.printableKeys[i].querySelector('span').innerHTML.toLowerCase();
        }
      }
    }

    // navigate on text in textarea with navigation arrows
    if (this.pressedKey.classList.contains('ArrowUp')) {
      textAreaObj.moveCursor('up');
    }
    if (this.pressedKey.classList.contains('ArrowDown')) {
      textAreaObj.moveCursor('down');
    }
    if (this.pressedKey.classList.contains('ArrowLeft')) {
      textAreaObj.moveCursor('left');
    }
    if (this.pressedKey.classList.contains('ArrowRight')) {
      textAreaObj.moveCursor('right');
    }

    // change symbols on keyboard keys to uppercase/lowercase every time when CapsLock is pressed
    if (this.pressedKey.classList.contains('CapsLock')) {
      if (this.toUpper) {
        for (let i = 0; i < this.printableKeys.length; i += 1) {
          this.printableKeys[i].querySelector('span').innerHTML = this.printableKeys[i].querySelector('span').innerHTML.toUpperCase();
        }
      } else {
        for (let i = 0; i < this.printableKeys.length; i += 1) {
          this.printableKeys[i].querySelector('span').innerHTML = this.printableKeys[i].querySelector('span').innerHTML.toLowerCase();
        }
      }
    }
  }
}
