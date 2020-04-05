export default class Textarea {
  constructor() {
    this.textarea = '';
  }

  generateArea() {
    this.textarea = document.createElement('textarea');
    this.textarea.className = 'textarea';
    this.textarea.rows = '15';
    this.textarea.cols = '71';
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
}
