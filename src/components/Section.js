//класс Section - отвечает за отрисовку элементов на странице
export default class Section {
  constructor(data, sectionSelector) {
    this._renderedItems = data.items; 
    this._renderer = data.renderer;
    this._container = document.querySelector(sectionSelector);
  }

  // перебираем все элементы renderer
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  } 

  // метод addItem принимает DOM-элемент и добавляет его в контейнер.
  addItem(item) {
    this._container.prepend(item);
  }
}