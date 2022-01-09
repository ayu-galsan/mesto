//класс Section - отвечает за отрисовку элементов на странице
export default class Section {
  constructor({ renderer }, sectionSelector) {
    //this._renderedItems = data.items; 
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  // перебираем все элементы renderer
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  appendItem(item) {
    this._container.append(item);
  }

  // метод addItem принимает DOM-элемент и добавляет его в контейнер.
  addItem(item) {
    this._container.prepend(item);
  }
}