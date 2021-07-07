import {
  init, keyboard, textarea,
} from './init.js';

init();

const controlLeft = document.querySelector('.ControlLeft');
const altLeft = document.querySelector('.AltLeft');
const capsLock = document.querySelector('.CapsLock');
const shiftLeft = document.querySelector('.ShiftLeft');
const shiftRight = document.querySelector('.ShiftRight');

// const printableKeys = document.querySelectorAll('.print');

document.addEventListener('keydown', (event) => {
  event.preventDefault();

  if (keyboard.isAvailable === true) {
    const pressedKey = document.querySelector(`.${event.code}`);

    if (pressedKey !== null && event.code === 'CapsLock') {
      // when CapsLock is pressed toggle class pressed to CapsLock,
      // toggle property toUpper and handle pressed key
      keyboard.togglePressed(pressedKey);
      keyboard.toUpper = !keyboard.toUpper;
      keyboard.doNotPrintAction(pressedKey, textarea);
      keyboard.isCapsPressed = !keyboard.isCapsPressed;
    } else if (pressedKey !== null) {
      // add class pressed to pressed keyboard key
      keyboard.addPressed(pressedKey);
    }

    // handle pressed keyboard keys that do not print symbol to textarea
    if (pressedKey !== null && pressedKey.classList.contains('print') && event.code !== 'CapsLock') {
      textarea.print(pressedKey.querySelector('span').innerHTML);
    } else if (pressedKey !== null && event.code !== 'CapsLock') {
      keyboard.doNotPrintAction(pressedKey, textarea);
    }

    const pressedArray = Array.from(document.querySelectorAll('.pressed'));

    // change language when ControlLeft and AltLeft are pressed together
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

    // make symbols on keyboard keys lowercase if Shift is unpressed
    if (unpressedKey === 'Shift') {
      pressedKey.forEach((el) => {
        el.classList.remove('pressed');
      });
      keyboard.renderNewRows(keyboard.currentKeys);
      // make symbols on keyboard keys uppercase if Shift is unpressed and CapsLock is pressed
      if (keyboard.toUpper) {
        for (let i = 0; i < keyboard.printableKeys.length; i += 1) {
          keyboard.printableKeys[i].querySelector('span').innerHTML = keyboard.printableKeys[i].querySelector('span').innerHTML.toUpperCase();
        }
      }
    } else {
      // remove class pressed from all pressed keyboard keys except for Shift
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

    // not remove class pressed from CapsLock if CapsLock is not unpressed
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

// save current language to localStorage
window.onbeforeunload = () => {
  localStorage.setItem('language', JSON.stringify(keyboard.currentKeys));
};
