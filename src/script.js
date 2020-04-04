import { init, keyboard, textarea } from './init.js';

init();

const controlLeft = document.querySelector('.ControlLeft');
const shiftLeft = document.querySelector('.ShiftLeft');

document.addEventListener('keydown', (event) => {
  event.preventDefault();

  if (keyboard.isAvailable === true) {
    const pressedKey = document.querySelector(`.${event.code}`);

    if (pressedKey.classList.contains('print')) {
      textarea.print(pressedKey);
    }

    if (pressedKey.classList.contains('CapsLock')) {
      pressedKey.classList.toggle('pressed');
    } else {
      pressedKey.classList.add('pressed');
    }

    const pressedArray = Array.from(document.querySelectorAll('.pressed'));

    if (pressedArray.includes(controlLeft) && pressedArray.includes(shiftLeft)) {
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
  if (event.target.closest('.key')) {
    if (event.target.closest('.key').classList.contains('CapsLock')) {
      event.target.closest('.key').classList.toggle('pressed');
    } else {
      event.target.closest('.key').classList.add('pressed');
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
