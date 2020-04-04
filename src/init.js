/* import {
  keysUpRU, keysRU, keysUpEn, keysEn, codes,
} from './constants.js'; */

import Textarea from './textarea.js';
import Keyboard from './keyboard.js';

export const wrapper = document.createElement('div');
export const textarea = new Textarea();
export const keyboard = new Keyboard();

export const capsPressed = false;

// generate and render page elements

export function init() {
  wrapper.className = 'wrapper';
  document.body.append(wrapper);

  textarea.generateArea();
  textarea.renderArea(wrapper);

  keyboard.generateKeyboard();
  keyboard.renderKeyboard(wrapper);

  const os = document.createElement('p');
  os.className = 'information';
  wrapper.append(os);
  os.innerHTML = 'Клавиатура создана в операционной системе Windows';

  const changeLangElem = document.createElement('p');
  changeLangElem.className = 'information';
  wrapper.append(changeLangElem);
  changeLangElem.innerHTML = 'Для переключения языка комбинация клавиш: левые Ctrl + Shift';
}
