/* import {
  keysUpRU, keysRU, keysUpEn, keysEn, codes,
} from './constants.js'; */

import Textarea from './textarea.js';
import Keyboard from './keyboard.js';

export const wrapper = document.createElement('div');
export const textarea = new Textarea();
export const keyboard = new Keyboard();

// generate and render page elements

export function init() {
  wrapper.className = 'wrapper';
  document.body.append(wrapper);

  textarea.generateArea();
  textarea.renderArea(wrapper);

  keyboard.generateKeyboard();
  keyboard.renderKeyboard(wrapper);
}
