import { init, keyboard, textarea } from './init.js';

init();

const controlLeft = document.querySelector('.ControlLeft');
const altLeft = document.querySelector('.AltLeft');

document.addEventListener('keydown', (event) => {
  event.preventDefault();

  if (keyboard.isAvailable === true) {
    const pressedKey = document.querySelector(`.${event.code}`);

    if (pressedKey.classList.contains('CapsLock')) {
      keyboard.togglePressed(pressedKey);
    } else {
      keyboard.addPressed(pressedKey);
    }

    if (pressedKey.classList.contains('print')) {
      textarea.print(pressedKey.querySelector('span').innerHTML);
    } else {
      keyboard.doNotPrintAction(pressedKey, textarea);
    }

    const pressedArray = Array.from(document.querySelectorAll('.pressed'));

    if (pressedArray.includes(controlLeft) && pressedArray.includes(altLeft)) {
      keyboard.isAvailable = false;
      keyboard.changeLang();
    }
  }
});

document.addEventListener('keyup', () => {
  keyboard.isAvailable = true;
  if (!document.querySelector('.pressed').classList.contains('CapsLock')) {
    document.querySelector('.pressed').classList.remove('pressed');
  }
});

document.addEventListener('mousedown', (event) => {
  const pressedKey = event.target.closest('.key');

  if (pressedKey.classList.contains('print')) {
    textarea.print(pressedKey.querySelector('span').innerHTML);
  } else {
    keyboard.doNotPrintAction(pressedKey, textarea);
  }

  if (pressedKey) {
    if (pressedKey.classList.contains('CapsLock')) {
      keyboard.togglePressed(pressedKey);
    } else {
      keyboard.addPressed(pressedKey);
    }
  }
});

document.addEventListener('mouseup', () => {
  if (document.querySelector('.pressed') !== null) {
    if (!document.querySelector('.pressed').classList.contains('CapsLock')) {
      document.querySelector('.pressed').classList.remove('pressed');
    }
  }
});

window.onbeforeunload = () => {
  localStorage.setItem('language', JSON.stringify(keyboard.currentKeys));
};
