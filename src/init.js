
import Textarea from './textarea.js';
import Keyboard from './keyboard.js';
import { keysEn } from './constants.js';

export const wrapper = document.createElement('div');
export const textarea = new Textarea();
export const keyboard = new Keyboard();
export const isCapsPressed = false;

// generate and render page elements

export function init() {
  wrapper.className = 'wrapper';
  document.body.append(wrapper);

  textarea.generateArea();
  textarea.renderArea(wrapper);

  keyboard.currentKeys = JSON.parse(localStorage.getItem('language')) ? JSON.parse(localStorage.getItem('language')) : keysEn;
  keyboard.generateKeyboard();
  keyboard.renderKeyboard(wrapper);
  keyboard.printableKeys = document.querySelectorAll('.print');

  const os = document.createElement('p');
  os.className = 'information';
  wrapper.append(os);
  os.innerHTML = 'Клавиатура создана в операционной системе Windows';

  const changeLangElem = document.createElement('p');
  changeLangElem.className = 'information';
  wrapper.append(changeLangElem);
  changeLangElem.innerHTML = 'Для переключения языка комбинация клавиш: левые Ctrl + Shift';
}
