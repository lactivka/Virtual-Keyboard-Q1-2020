export default class Textarea {
  constructor() {
    this.textarea = '';
  }

  generateArea() {
    this.textarea = document.createElement('textarea');
    this.textarea.className = 'textarea';
    this.textarea.rows = '15';
    this.textarea.cols = '77';
  }

  renderArea(element) {
    element.append(this.textarea);
    this.textarea.focus();
  }
}
