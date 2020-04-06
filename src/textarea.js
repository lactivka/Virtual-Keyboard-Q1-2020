export default class Textarea {
  constructor() {
    this.textarea = '';
  }

  generateArea() {
    this.textarea = document.createElement('textarea');
    this.textarea.className = 'textarea';
    this.textarea.rows = '15';
    this.textarea.cols = '78';
  }

  renderArea(element) {
    element.append(this.textarea);
    this.textarea.focus();
  }

  print(value) {
    this.textarea.focus();
    const position = this.textarea.selectionStart;
    const start = this.textarea.value.substring(0, position);
    const end = this.textarea.value.substring(position);
    this.textarea.value = start + value + end;
    this.textarea.setSelectionRange(position + value.length, position + value.length);
  }

  newRow() {
    this.textarea.focus();
    const position = this.textarea.selectionStart;
    this.textarea.value = `${this.textarea.value.substring(0, position)}\n${this.textarea.value.substring(position)}`;
    this.textarea.setSelectionRange(position + 1, position + 1);
  }

  delSymbol(symbol) {
    this.textarea.focus();
    const position = this.textarea.selectionStart;
    let start = '';
    let end = '';

    if (symbol === 'prev') {
      start = this.textarea.value.substring(0, position - 1);
      end = this.textarea.value.substring(position);
      this.textarea.value = start + end;
      this.textarea.setSelectionRange(position - 1, position - 1);
    }
    if (symbol === 'next') {
      start = this.textarea.value.substring(0, position);
      end = this.textarea.value.substring(position + 1);
      this.textarea.value = start + end;
      this.textarea.setSelectionRange(position, position);
      this.textarea.focus();
    }
  }

  moveCursor(direction) {
    this.textarea.focus();
    const position = this.textarea.selectionStart;
    const { length } = this.textarea.value;
    const { cols } = this.textarea;
    const lines = Math.ceil(this.textarea.value.length / cols);
    const cursorInLine = Math.ceil(position / cols);
    const isEnterAhead = (this.textarea.value.substring(position, position + cols)).includes('\n');
    const isEnterBefore = (this.textarea.value.substring(position - cols, position)).includes('\n');
    const shiftRight = isEnterAhead ? cols * cursorInLine - this.textarea.value.indexOf('\n', position) - cursorInLine : 0;
    const enterInLine = Math.ceil(this.textarea.value.indexOf('\n', position - cols) / cols);
    const shiftLeft = isEnterBefore ? cols * enterInLine - this.textarea.value.indexOf('\n', position - cols) - cursorInLine : 0;
    let newPosition = 0;

    if (length > 0) {
      switch (direction) {
        case 'up':
          newPosition = position - cols + shiftLeft + 1;
          if (newPosition >= 0) {
            this.textarea.setSelectionRange(newPosition, newPosition);
          }
          break;
        case 'down':
          newPosition = position + cols - shiftRight - 1;
          if (lines > 1 && (position + cols) < length) {
            this.textarea.setSelectionRange(newPosition, newPosition);
          } else if (lines > 1 && (cursorInLine !== lines)) {
            this.textarea.setSelectionRange(length - shiftRight, length - shiftRight);
          }
          break;
        case 'left':
          this.textarea.setSelectionRange(position - 1, position - 1);
          break;
        case 'right':
          this.textarea.setSelectionRange(position + 1, position + 1);
          break;
        default: break;
      }
    }
  }
}
