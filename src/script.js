import {
  init, keyboard, textarea,
} from './init.js';

init();

const controlLeft = document.querySelector('.ControlLeft');
const altLeft = document.querySelector('.AltLeft');
const capsLock = document.querySelector('.CapsLock');
const shiftLeft = document.querySelector('.ShiftLeft');
const shiftRight = document.querySelector('.ShiftRight');
//const printableKeys = document.querySelectorAll('.print');

document.addEventListener('keydown', (event) => {
  event.preventDefault();

  if (keyboard.isAvailable === true) {
    const pressedKey = document.querySelector(`.${event.code}`);

    if (pressedKey !== null && event.code === 'CapsLock') {
      keyboard.togglePressed(pressedKey);
      keyboard.toUpper = !keyboard.toUpper;
      keyboard.doNotPrintAction(pressedKey, textarea);
      keyboard.isCapsPressed = !keyboard.isCapsPressed;
    } else if (pressedKey !== null) {
      keyboard.addPressed(pressedKey);
    }

    if (pressedKey !== null && pressedKey.classList.contains('print') && event.code !== 'CapsLock') {
      textarea.print(pressedKey.querySelector('span').innerHTML);
    } else if (pressedKey !== null && event.code !== 'CapsLock') {
      keyboard.doNotPrintAction(pressedKey, textarea);
    }

    const pressedArray = Array.from(document.querySelectorAll('.pressed'));

    if (pressedArray.includes(controlLeft) && pressedArray.includes(altLeft)) {
      keyboard.isAvailable = false;
      keyboard.changeLang();
    }
  }
});

document.addEventListener('keyup', (event) => {
  const unpressedKey = event.key;
  keyboard.isAvailable = true;
  let pressedKey = document.querySelector('.pressed');

  if (pressedKey != null) {
    pressedKey = document.querySelectorAll('.pressed');

    if (unpressedKey === 'Shift') {
      pressedKey.forEach((el) => {
        el.classList.remove('pressed');
      });
      keyboard.renderNewRows(keyboard.currentKeys);
      if (keyboard.toUpper) {
        for (let i = 0; i < keyboard.printableKeys.length; i += 1) {
          keyboard.printableKeys[i].querySelector('span').innerHTML = keyboard.printableKeys[i].querySelector('span').innerHTML.toUpperCase();
        }
      }
    } else {
      pressedKey.forEach((el) => {
        el.classList.remove('pressed');
      });
      if (Array.from(pressedKey).includes(shiftLeft) && unpressedKey !== 'Shift') {
        document.querySelector('.ShiftLeft').classList.add('pressed');
      }
      if (Array.from(pressedKey).includes(shiftRight) && unpressedKey !== 'Shift') {
        document.querySelector('.ShiftRight').classList.add('pressed');
      }
    }

    if (keyboard.isCapsPressed === true) {
      capsLock.classList.add('pressed');
    }
  }
});

document.addEventListener('mousedown', (event) => {
  const pressedKey = event.target.closest('.key');

  if (pressedKey !== null && pressedKey.classList.contains('print') && !pressedKey.classList.contains('CapsLock')) {
    textarea.print(pressedKey.querySelector('span').innerHTML);
  } else if (pressedKey !== null && !pressedKey.classList.contains('CapsLock')) {
    keyboard.doNotPrintAction(pressedKey, textarea);
  }

  if (pressedKey !== null) {
    if (pressedKey.classList.contains('CapsLock')) {
      keyboard.togglePressed(pressedKey);
      keyboard.toUpper = !keyboard.toUpper;
      keyboard.doNotPrintAction(pressedKey, textarea);
      keyboard.isCapsPressed = !keyboard.isCapsPressed;
    } else {
      keyboard.addPressed(pressedKey);
    }
  }
});

document.addEventListener('mouseup', () => {
  const pressedKey = Array.from(document.querySelectorAll('.pressed'));

  if (pressedKey != null) {
    pressedKey.forEach((el) => {
      el.classList.remove('pressed');
    });

    if (keyboard.isCapsPressed === true) {
      capsLock.classList.add('pressed');
    }

    if (pressedKey.includes(shiftLeft) || pressedKey.includes(shiftRight)) {
      keyboard.renderNewRows(keyboard.currentKeys);
      if (keyboard.toUpper) {
        for (let i = 0; i < keyboard.printableKeys.length; i += 1) {
          keyboard.printableKeys[i].querySelector('span').innerHTML = keyboard.printableKeys[i].querySelector('span').innerHTML.toUpperCase();
        }
      }
    }
  }
});

window.onbeforeunload = () => {
  localStorage.setItem('language', JSON.stringify(keyboard.currentKeys));
};
